<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/authStore'
import Footer from '@/components/Footer.vue'
import logoUrl from '@/assets/logo.svg'

const authStore = useAuthStore()
const router = useRouter()

const { mobile } = useDisplay()
const drawer = ref(!mobile.value)

function handleLogout() {
  authStore.logout()
  router.push('/')
}

const navItems = [
  { title: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
  { title: 'Grupos', to: '/grupos', icon: 'mdi-google-circles-communities' },
  { title: 'Projetos', to: '/projetos', icon: 'mdi-briefcase-variant' },
  { title: 'Atividades', to: '/atividades', icon: 'mdi-format-list-checks' },
  { title: 'Usuários', to: '/usuarios', icon: 'mdi-account-group', adminOnly: true },
]
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :temporary="mobile"
      :permanent="!mobile"
      class="app-drawer"
    >
      <v-list-item title="PET Fronteira" subtitle="Sistema de Gerenciamento" class="drawer-brand">
        <template v-slot:prepend>
          <div class="drawer-logo">
            <v-img
              :src="logoUrl"
              alt="PET Fronteira Logo"
              contain
            ></v-img>
          </div>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="comfortable" nav class="drawer-nav">
        <div v-for="item in navItems" :key="item.to">
          <v-list-item
            v-if="!item.adminOnly || authStore.isAdmin"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.to"
          ></v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="app-bar" elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <template v-if="authStore.isAuthenticated">
        <span class="user-greeting">Olá, {{ authStore.user.nome }}</span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-account-circle" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleLogout" prepend-icon="mdi-logout">
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-else>
        <v-btn to="/login" variant="text" class="header-button">Entrar</v-btn>
        <v-btn to="/cadastro" variant="flat" color="primary" class="header-button">Cadastrar-se</v-btn>
      </template>
    </v-app-bar>

    <v-main class="main-content">
      <v-container fluid class="pa-6">
        <RouterView />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
.app-drawer {
  border-right: 1px solid rgba(255, 255, 255, 0.07) !important;
  background: #111424 !important;
}

.drawer-brand {
  min-height: 92px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.drawer-logo {
  width: 42px;
  height: 42px;
  margin-right: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.drawer-nav {
  padding: 16px 12px;
}

.drawer-nav .v-list-item {
  min-height: 48px;
  margin-bottom: 4px;
  border-radius: 12px;
  color: #aab0c8;
}

.drawer-nav .v-list-item--active {
  color: #fff;
  background: linear-gradient(135deg, rgba(112, 92, 255, 0.28), rgba(65, 195, 190, 0.12));
  box-shadow: inset 0 0 0 1px rgba(150, 132, 255, 0.18);
}

.app-bar {
  background: rgba(16, 18, 34, 0.82) !important;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.header-button {
  border-radius: 12px;
  text-transform: none;
  font-weight: 700;
}

.user-greeting {
  margin-right: 12px;
  color: #aab0c8;
}

.main-content {
  background:
    radial-gradient(circle at 82% 10%, rgba(98, 82, 190, 0.12), transparent 26rem),
    #111424;
}

html {
  scroll-behavior: smooth;
}

body,
.v-application {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

@media (max-width: 600px) {
  .main-content .v-container {
    padding: 12px !important;
  }

  .header-button {
    min-width: 0;
    padding-inline: 10px;
  }

  .user-greeting {
    display: none;
  }
}
</style>
