import { resolve } from 'path';

const {
  NODE_ENV,
  PORT: port = 3001,
  HOST: host = '0.0.0.0',
  DOMAIN: domain = 'http://localhost'
} = process.env

const isDev = !(NODE_ENV === 'production');
const baseURL = `${domain}:${port}`;

const configFile = resolve(process.cwd(), 'client', 'tsconfig.json');

export default {
  mode: 'universal',
  modern: isDev ? false : 'client',

  srcDir: 'client/',
  buildDir: 'dist/client',

  env: {
    NODE_ENV,
    port,
    host,
    domain
  },

  dev: isDev,

  globalName: 'root',

  loading: false,
  loadingIndicator: false,


  /*
   ** Headers of the page
   */
  head: {
    title: 'title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'description' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL,
  },

  buildModules: [
    '@nuxt/typescript-build'
  ],

  typescript: {
    typeCheck: {
      tsconfig: configFile
    },

    loaders: {
      ts: {
        configFile
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    cache: true,
    extractCSS: true,
    publicPath: '/bundles/',

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // config.resolve.alias.vue = 'vue/dist/vue.common'

      if (isDev) {
        const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

        config.resolve.plugins = [
          ...(config.resolve.plugins || []),
          new TsconfigPathsPlugin({ configFile }),
        ];
      }
    },
  },

  render: {
    http2: { push: true }
  }

};
