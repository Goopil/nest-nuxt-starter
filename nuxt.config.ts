import { resolve } from 'path';

const {
  NODE_ENV,
  PORT: port = 3001,
  HOST: host = '0.0.0.0',
  DOMAIN: domain = 'http://localhost',
} = process.env;

const isDev = !(NODE_ENV === 'production');
const configFile = resolve(process.cwd(), 'client', 'tsconfig.json');

export default {
  telemetry: false,
  modern: isDev ? false : 'client',

  srcDir: 'client/',
  buildDir: 'dist/client',

  env: {
    NODE_ENV,
    port,
    host,
    domain,
  },

  dev: isDev,
  globalName: 'app',

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
    '@nuxtjs/axios'
  ],

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: '/'
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: `http://127.0.0.1:${port}`
    }
  },

  buildModules: [
    '@nuxt/typescript-build',
  ],

  typescript: {
    typeCheck: {
      typescript: {
        configFile,
      },
    },

    loaders: {
      ts: {
        configFile,
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    cache: true,
    publicPath: '/app/',

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

  server:{
    timing: false
  },

  render: {
    http2: { push: true }
  },
};
