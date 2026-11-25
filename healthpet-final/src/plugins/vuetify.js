// src/plugins/vuetify.js
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Definição do nosso tema escuro customizado
const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#111424',
    surface: '#181b33',
    primary: '#a8a1ff',
    secondary: '#62d7b5',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomDarkTheme', // Define nosso tema como padrão
    themes: {
      myCustomDarkTheme,
    },
  },
})
