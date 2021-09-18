# build stage

FROM node:lts-alpine as build

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app

RUN apk add --no-cache python make g++

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . /app/

RUN yarn run build

COPY ./.yarnclean.prod /app/.yarnclean

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

# production container
FROM node:lts-alpine

RUN yarn global add pm2

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=80 \
    DOMAIN=http://localhost

EXPOSE ${PORT}

RUN mkdir -p /app
WORKDIR /app

COPY --chown=node:node ./yarn.lock /app/yarn.lock
COPY --chown=node:node ./package.json /app/package.json
COPY --chown=node:node ./ecosystem.config.js /app/ecosystem.config.js

COPY --chown=node:node --from=build /app/dist/ /app/dist/
COPY --chown=node:node --from=build /app/client/static/ /app/client/static/
COPY --chown=node:node --from=build /app/node_modules/ /app/node_modules/

USER node

CMD ["pm2-runtime", "ecosystem.config.js"]
