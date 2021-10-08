import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_BASE,
  FB_APP_ID,
  SITE_LOGO,
} from './configs/metaConfig'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: SITE_TITLE,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: SITE_TITLE,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: SITE_DESCRIPTION,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: SITE_OG_IMAGE,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: SITE_URL,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/css/base.css', '~/scss/global.scss'],

  styleResources: {
    scss: ['~/scss/_*.scss'],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/web-component.js', ssr: false },
    { src: '~/plugins/VueSmoothScroll', ssr: false },
    { src: '~/plugins/VueLazyRenderer', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: () => {
      return 'UA-83609754-1'
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/svg'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    base: SITE_BASE,
    extendRoutes(routes) {
      routes.forEach((route) => {
        const alias =
          route.path.length > 1 ? `${route.path}/index.html` : '/index.html'
        route.alias = alias
      })
    },
  },
}
