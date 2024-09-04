// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {},
  },
  app: {
    head: {
      title: 'Templates Nuxt3',
      script: [
        {
          src: 'https://kit.fontawesome.com/0f88a3bac5.js',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  compatibilityDate: '2024-04-03', 
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: "th",
    strategy: "no_prefix",
    locales: [
      {
        code: 'th',
        iso: 'th-TH',
        name: 'Thai',
        file: 'th.ts',
        path_image: '/img/th.png'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.ts',
        path_image: '/img/en.png'
      }
    ],
    detectBrowserLanguage: {
      fallbackLocale: 'th',
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", 
    },
  }
})