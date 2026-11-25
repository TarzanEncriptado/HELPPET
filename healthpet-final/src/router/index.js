import { createRouter, createWebHistory } from 'vue-router'
// 1. Importe a sua store de autenticação
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', // Nome em minúsculo
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/CadastroView.vue'),
    },
    // 2. Rota de Login ÚNICA
    {
      path: '/login',
      name: 'login', // Nome em minúsculo
      component: () => import('@/views/LoginView.vue'),
    },
    // 3. Rota de Usuários ÚNICA e PROTEGIDA
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/views/ListaUsuariosView.vue'),
      meta: {
        requiresAuth: true, // Esta rota precisa de login
        requiresAdmin: true, // Esta rota precisa que o usuário seja ADMIN
      },
    },
    {
      path: '/usuarios/editar/:id',
      name: 'editar-usuario',
      component: () => import('@/views/EditarUsuarioView.vue'),
      meta: {
        requiresAuth: true, // Também deve ser protegida
        requiresAdmin: true,
      },
    },
    {
      path: '/grupos',
      name: 'grupos-listar',
      component: () => import('@/views/Grupos/ListaGrupoView.vue'),
    },
    {
      path: '/projetos',
      name: 'projetos-listar',
      component: () => import('@/views/Projetos/ListaProjetoView.vue'),
    },
    {
      path: '/grupos/novo',
      name: 'grupos-novo',
      component: () => import('@/views/Grupos/FormGrupoView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/projetos/novo',
      name: 'projetos-novo',
      component: () => import('@/views/Projetos/FormProjetoView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/grupos/editar/:id',
      name: 'grupos-editar',
      component: () => import('@/views/Grupos/FormGrupoView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/projetos/editar/:id',
      name: 'projetos-editar',
      component: () => import('@/views/Projetos/FormProjetoView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/atividades',
      name: 'atividades-listar',
      component: () => import('@/views/Atividades/ListaAtividadeView.vue'),
    },
    {
      path: '/atividades/novo',
      name: 'atividades-novo',
      component: () => import('@/views/Atividades/FormAtividadeView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }, // Apenas Admin pode criar
    },
    {
      path: '/atividades/editar/:id',
      name: 'atividade-editar',
      component: () => import('@/views/Atividades/FormAtividadeView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
})

// GUARDA DE NAVEGAÇÃO GLOBAL
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
