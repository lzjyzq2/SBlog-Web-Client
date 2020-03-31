
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/i18n.js',
    '~/plugins/sblogclient.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage',
    '@nuxtjs/markdownit'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  /*
  ** Nuxt.js axios config
  */
  axios:{

  },
  router: {
    
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use:[
      'markdown-it-div',
      'markdown-it-attrs',
      'markdown-it-emoji',
      'markdown-it-container',
      'markdown-it-task-lists',
      'markdown-it-highlightjs',
      'markdown-it-katex',
      'markdown-it-sub',
      'markdown-it-sup'
    ]
  }
}
