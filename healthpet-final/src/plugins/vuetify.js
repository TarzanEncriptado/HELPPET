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
    background: '#242742ff', // Fundo principal bem escuro
    surface: '#20233E', // Cor dos cards e superfícies
    primary: '#d3daffff', // Azul principal para botões e links
    secondary: '#3498caff',
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
