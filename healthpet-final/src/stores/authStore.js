import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiRequest } from '@/services/api'
import { useUserStore } from './userStore'

const TOKEN_KEY = 'healthpet_access_token'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const initialized = ref(false)
  const sessionError = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function restoreSession() {
    if (initialized.value) return user.value

    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      initialized.value = true
      return null
    }

    try {
      user.value = await apiRequest('/auth/me')
    } catch (error) {
      sessionStorage.removeItem(TOKEN_KEY)
      user.value = null
      useUserStore().limparUsuarios()
      if (error.status !== 401) {
        sessionError.value = 'Não foi possível validar sua sessão com o servidor.'
      }
    } finally {
      initialized.value = true
    }

    return user.value
  }

  async function login(credentials) {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    })
    sessionStorage.setItem(TOKEN_KEY, result.accessToken)
    user.value = result.user
    sessionError.value = null
    initialized.value = true
  }

  async function register(userData) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: userData,
    })
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY)
    user.value = null
    useUserStore().limparUsuarios()
    initialized.value = true
  }

  return {
    user,
    initialized,
    sessionError,
    isAuthenticated,
    isAdmin,
    restoreSession,
    login,
    register,
    logout,
  }
})
