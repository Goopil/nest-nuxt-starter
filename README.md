![Node.js Testing](https://github.com/Goopil/nest-nuxt-starter/workflows/Node.js%20CI/badge.svg)
![Docker Image Build](https://github.com/Goopil/nest-nuxt-starter/workflows/Docker%20Image%20CI/badge.svg)

<p align="center">
  <a href="https://nuxtjs.org/ target="blank"><img align="center" style="width:320px" alt="Nuxt Logo" src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg"/></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nestjs Nuxt (2.x) starter

This project is an updated version of this repository [nuxtjs-nestjs-starter](https://github.com/ColonelBundy/nuxtjs-nestjs-starter)
With some minor changes. The cli of nestjs was used and is configured correctly. Each nest cli command should generate the proper file at the right place.
A big thanks to [ColonelBundy](https://github.com/ColonelBundy) for showing a good way to tie these 2 great framework together.

This is a full typescript project and use yarn as the packager. (not tested with npm but should work regardless)

The 
## Project structure

```
project
│   package.json // global packages for both server and client.
│
└───server // Nestjs
│
└───client // Nuxtjs
│
└───common // Common folders accessible for both context. Usefull to store some common classes and interfaces.
```

you can use webpack alias (defined in each tsconfig.json and shared with [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin))

* `@server`
* `@client`
* `@common`

## getting started

### command

* `yarn install`
* `yarn start:dev`
* `yarn build`
* `yarn start`

### Http adapter

You can choose from your adapter from the 2 supported by nestjs. This starter implements both express and fastify.
When you are desided, you should clear the other.

* Remove the ` @nestjs/plafetorm-xxx` and the respective `@types` packages from your package.json
* Remove the related filter in `server/nuxt`

### sharing data between nuxt and nest via req / res attributes

you can augment the data passed to nuxt ctx via the filter located in (`server/nuxt`). when you are done, do not forget to complet the `client/connect-shim.d.ts` to have proper auto completion.
By default, this project implement the fastify adapter. The `FastifyRequest` and `FastifyReply` are accessible.

* definition: `client/connect-shim.d.ts`
* injection: `server/nuxt/nuxtFastify.filter.ts`

update to suit your needs.

### Settings

the server settings like PORT, HOST and HOSTNAME are injected via process.env and are located in the `nuxt.config.ts`

### Production

Two option here, you will find a multistage dockerfile ready to be used and a pm2 config or you could also go for the classic (node dist/server/main.js)
in the later case, do not forget to set `process.env.NODE_ENV` as `production`. Otherwise, the Nuxt server would rebuild !

### Cavats

This project use nuxt2.x package as such, webpack5 is not supported....

Beware when updating the dependencies at these two depencencies. You can't upgrade them more than the listed version.
* `"webpack": "4.46.0"`
* `"ts-loader": "8.3.0"`

Yes nest use webpack5 and nuxt webpack4... if you have any idea to improve this. Feel free to contact me.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
