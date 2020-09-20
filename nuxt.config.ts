import { resolve } from 'path';
import * as shrinkRay from 'shrink-ray-current'

const {
  NODE_ENV,
  PORT: port = 3001,
  HOST: host = '0.0.0.0',
  DOMAIN: domain = 'http://localhost',
} = process.env;

const isDev = !(NODE_ENV === 'production');
const baseURL = `${domain}:${port}`;
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
    'nuxt-precompress'
  ],

  axios: {
    baseURL,
  },

  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 1024,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 1024,
      minRatio: 0.8,
    },
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
    compressor: shrinkRay(),
    http2: { push: true }
  },
};
