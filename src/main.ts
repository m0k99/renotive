import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import enMessages from './locales/en.json'
import frMessages from './locales/fr.json'

const savedLanguage = localStorage.getItem('language') || 'en';

const i18n = createI18n({
  locale: savedLanguage,
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    fr: frMessages
  }
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
