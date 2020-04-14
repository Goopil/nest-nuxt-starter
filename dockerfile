# build stage

FROM node:lts-alpine as  build

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app

RUN yarn install

COPY . /app/

RUN yarn run build

# production container
FROM node:lts-alpine

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=80 \
    DOMAIN=http://localhost

RUN mkdir -p /app
WORKDIR /app

RUN yarn global add \
  pm2

COPY --from=build /app/dist/ /app/dist/
RUN ls -la /app/dist/

COPY ./yarn.lock /app/
COPY ./package.json /app/
COPY ./ecosystem.config.js /app/

RUN yarn install \
    --pure-lockfile \
    --production

RUN yarn cache clean

EXPOSE ${PORT}

CMD ["pm2-runtime", "ecosystem.config.js"]