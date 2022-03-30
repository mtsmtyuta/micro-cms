import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'universal',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'micro-cms',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css

  css: [
    '@/assets/styles/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-microcms-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap',
  ],

  styleResources: {
    // your settings here
    scss: [
      'assets/styles/variables.scss',
    ]
  },

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.GET_API_KEY,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://unito.life',
    routes () {
      const pages = axios
          .get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/magazine?limit=1000`, {
            headers: { 'X-MICROCMS-API-KEY': process.env.GET_API_KEY }
          })
          .then((res) =>
              res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: content
              }))
          )
      return pages
    },
  },
  generate: {
    async routes() {
      const pages = await axios
          .get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/magazine?limit=1000`, {
            headers: { 'X-MICROCMS-API-KEY': process.env.GET_API_KEY }
          })
          .then((res) =>
              res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: content
              }))
          )
      return pages
    }
  }
}
