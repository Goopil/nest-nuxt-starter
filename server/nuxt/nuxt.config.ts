import {NuxtConfig} from '@nuxt/types';
import { resolve } from 'path';

const {
  NODE_ENV = 'production',
  PORT: port = 3003,
  HOST: host = '0.0.0.0'
} = process.env;

const isDev = !(NODE_ENV === 'production');
const configFile = resolve(process.cwd(), 'client', 'tsconfig.json');

export const config: NuxtConfig = {
  telemetry: false,
  modern: isDev ? false : 'server',
  target: 'server',

  srcDir: 'client/',
  buildDir: 'dist/client',

  env: {
    NODE_ENV,
    port: port as string,
    host: host as string
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
    htmlAttrs: { lang: 'en' },
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
    extend(cfg, ctx) {
      // config.resolve.alias.vue = 'vue/dist/vue.common'

      if (isDev) {
        const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
        cfg.resolve = (cfg.resolve || {})

        cfg.resolve.plugins = [
          ...(cfg.resolve.plugins || []),
          new TsconfigPathsPlugin({ configFile }),
        ];
      }
    },
  },

  server:{
    timing: false
  },

  render: {
    compressor: false,
    resourceHints: true,
    ssr: true,
    http2: { push: true }
  },
}

export default config;
