// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // modules
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image'
  ],

  // // runtime config
  // $production: {
  //   routeRules: {
  //     '**': { isr: true }
  //   }
  // },

  // runtimeConfig: {
  //   // The private keys which are only available server-side
  //   apiSecret: '123',
  //   // Keys within public are also exposed client-side
  //   public: {
  //     apiBase: '/api'
  //   }
  // }

  // css config
  css: ['~/assets/scss/main.scss'],
  // vite config
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_colors.scss" as *;
            @use "~/assets/scss/_variables.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/fonts.scss" as *;
          `
        }
      }
    }
  },

  // app config
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'Simone Zuccala - Video Editor and Motion Designer from Milan', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: 'Simone Zuccala - Video Editor and Motion Designer from Milan' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ff0000' },
        { name: 'robots', content: 'index, follow' },
        { name: 'google-site-verification', content: 'your-verification-code' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
    }

  },

  // content config
  content: {
    renderer: {
      anchorLinks: {
        h2: true,
        h3: true,
        h4: true,
        h5: true,
      }
    },
    build: {
      // documentDriven: true,
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        }
      },
    },
    watch: {
      port: 3000,
      showURL: true
    },
    preview: {
      api: 'https://api.nuxt.studio',
    }
  }
})