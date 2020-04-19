<p align="center">
  <a href="https://nuxtjs.org/ target="blank"><img align="center" style="width:320px" alt="Nuxt Logo" src="https://nuxtjs.org/meta_400.png"/></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nestjs Nuxt starter

This project is an updated version of this repository [https://github.com/ColonelBundy/nuxtjs-nestjs-starter](https://github.com/ColonelBundy/nuxtjs-nestjs-starter)
With some minor changes. The cli of nestjs was used and is configured correctly. Each nest cli command should generate the proper file at the right place.
A big thanks to [ColonelBundy](https://github.com/ColonelBundy) for showing a good way to tie these 2 great framework together.

This is a full typescript project and use yarn as the packager. (not tested with npm but should work regardless)

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

This project provide to plateform integration.

* Express
* Fastify

you should chose a plateform and remove the other. Same for the filter located in `server/nuxt`

> The integration with fastify works well, but you should take in to account that setting up shared data between nest and nuxt via the `req` / `res` is by no mean easy.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
