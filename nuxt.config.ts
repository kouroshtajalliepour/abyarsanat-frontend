export default defineNuxtConfig({
  // devtools: { enabled: true },
  experimental: {
    scanPageMeta: true
  },

  modules: [
    // 'nuxt-purgecss',
    '@pinia/nuxt',
    // '@nuxtjs/tailwindcss', 
    // '@nuxt/ui', 
    // '@nuxtseo/module', 
    '@nuxt/image', 
    // process.env.ENVIRONMENT === 'production' ? 'nuxt-security' : undefined,
    // 'nuxt-security',
    'vue3-carousel-nuxt', 
    '@nuxtjs/i18n'
  ],

  css: ['~/assets/scss/global.scss'],

  components: false,
  image: {
    domains: ['https://abyarsanat.s3.ir-thr-at1.arvanstorage.com']
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-16',
      title: 'آبیار صنعت',      
      meta: [              
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width' },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
      ],
      link: [
        // { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: 'anonymous' },
        // { rel: 'preconnect', href: 'https://www.google-analytics.com', crossorigin: 'anonymous' },
        {
          rel: "preload",
          href: "/fonts/pinar/pinar.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ]
      // script:[
      //   { src: "https://abyarsanat.ir", async: true, defer: true },
      // ]
    }
  },

  runtimeConfig: {
    public: {
      gtagId: process.env.GTM_ID,
      free_shipment_price: 100000000000000000000000000000000000,
      free_shipment_wight_limiter: 15000,
      env: process.env.ENVIRONMENT,
      openProductModel: true,
      useShipmentMethod: true,
      domain: process.env.DOMAIN_ADDRESS,
      file_urls: {
        bucketUrl: process.env.BUCKET_URL,
        bucketDomainUrl: process.env.BUCKET_DOMAIN_URL,
      },
      baseURL: process.env.BACKEND_BASE_URL ? process.env.BACKEND_BASE_URL : 'http://localhost:8080/api/v1',
    }
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'fa',
    compilation: { jit: true, strictMessage: true, escapeHtml: false },
    locales: [
      { code: "fa", iso: "fa", dir: 'rtl', displayName: "فارسی", title:"آبیار صنعت" }
    ],
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      cookieDomain: null,
      fallbackLocale: "fa",
      redirectOn: "root"
    },
    vueI18n: './nuxt-i18n.ts'
  },

  routeRules: {
    '/user': { redirect: '/user/info' },
  },

  // colorMode: {
  //   preference: 'light'
  // },
  vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: '@use "@/assets/scss/helpers/_variables.scss" as *;',
              },
          },
      },
  },

  compatibilityDate: '2024-07-24',
})