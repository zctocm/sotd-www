const env = {
  apiUrl: process.env.API_URL || 'https://api.stateofthedapps.com/',
  cdnPublicPath: process.env.CDN_PUBLIC_PATH || '/_nuxt/',
  googleAnalytics: process.env.GOOGLE_ANALYTICS || 'UA-000000-1',
  mapboxKey: process.env.MAPBOX_KEY,
  mixpanel: process.env.MIXPANEL,
  mode: process.env.MODE || 'universal',
  linkexchangeRecipientAddress: process.env.LINKEXCHANGE_RECIPIENT_ADDRESS || '0x65bCF0A60B3974931a4459c32ef4043262bc370c',
  linkexchangeTillDate: process.env.LINKEXCHANGE_TILL_DATE || '5/31/2018',
  linkexchangeWhitelistAddress: process.env.LINKEXCHANGE_WHITELIST_ADDRESS || '0x65bCF0A60B3974931a4459c32ef4043262bc370c'
}

module.exports = {
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    publicPath: env.cdnPublicPath,
    vendor: [
      'axios',
      'mixpanel-browser',
      'smoothscroll-polyfill',
      'vue-clickaway',
      'webfontloader'
    ]
  },
  generate: {
    routes: [
      '/'
    ]
  },
  /*
  ** mode: 'spa' is the other option: https://nuxtjs.org/api/configuration-mode
  */
  mode: env.mode,
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/router',
    ['@nuxtjs/google-analytics', { id: env.googleAnalytics }]
  ],
  serverMiddleware: [
    'redirect-ssl'
  ],
  css: [
    { src: '~/assets/css/main.scss', lang: 'scss' }
  ],
  env: {
    apiUrl: env.apiUrl,
    mapboxKey: env.mapboxKey,
    linkexchangeRecipientAddress: env.linkexchangeRecipientAddress,
    linkexchangeTillDate: env.linkexchangeTillDate,
    linkexchangeWhitelistAddress: env.linkexchangeWhitelistAddress,
    mixpanel: env.mixpanel
  },
  head: {
    title: 'State of the ÐApps — Projects Built on Ethereum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'The curated list of decentralized applications' },
      { hid: 'image', property: 'og:image', content: '/og-default.png' },
      { name: 'theme-color', content: '#222' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'icon',
        href: '/favicon-32x32.png',
        sizes: '32x32'
      },
      {
        rel: 'icon',
        href: '/favicon-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ]
  },
  loading: { color: '#333' },
  plugins: [
    { src: '~/plugins/polyfills', ssr: false },
    { src: '~/plugins/vue-config' },
    { src: '~/plugins/vue-filters' },
    { src: '~/plugins/vue-localstorage' },
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/webfontloader', ssr: false },
    { src: '~/plugins/clipboard', ssr: false }
  ]
}
