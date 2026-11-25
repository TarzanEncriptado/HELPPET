<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Footer from '@/components/Footer.vue'
import logoUrl from '@/assets/logo.svg'

const authStore = useAuthStore()
const router = useRouter()

const drawer = ref(true)

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
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item title="PET Fronteira" subtitle="Sistema de Gerenciamento" class="pa-10">
        <template v-slot:prepend>
          <div style="width: 60px; height: 40px; margin-right: 16px">
            <v-img
              :src="logoUrl"
              alt="PET Fronteira Logo"
              contain
              style="width: 100%; height: 100%"
            ></v-img>
          </div>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
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

    <v-app-bar app color="surface" elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <template v-if="authStore.isAuthenticated">
        <span class="mr-3 text-grey">Olá, {{ authStore.user.nome }}</span>
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
        <v-btn to="/login" variant="outlined" class="mr-2">Entrar</v-btn>
        <v-btn to="/cadastro" variant="flat" color="primary">Cadastrar-se</v-btn>
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
/* Estilo global para o fundo do conteúdo principal */
.main-content {
  background-color: #161829; /* Cor de fundo principal do tema escuro */
}
</style>
