import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.sessionStorage.locale,
    fallbackLocale: 'zh',
    messages: {
      zh: require('~/locales/zh.json'),
      en: require('~/locales/en.json'),
    }
  })
  // ** 已弃用
  // app.i18n.path = (link) => {
  //   if (app.i18n.locale === app.i18n.fallbackLocale) {
  //     return `/${link}`
  //   }
  //   return `/${app.i18n.locale}/${link}`
  // }

  app.i18n.changelocale = (locale)=>{
    if(locale in app.i18n.messages){
     app.i18n.locale = locale;
     store.commit('sessionStorage/SET_LANG',locale);
    }
  }
}