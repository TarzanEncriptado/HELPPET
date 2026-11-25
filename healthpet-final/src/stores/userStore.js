import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiRequest } from '@/services/api'

export const useUserStore = defineStore('users', () => {
  const usuarios = ref([])
  const loading = ref(false)
  const erro = ref(null)

  const getUserById = computed(() => (userId) => usuarios.value.find((user) => user.id === userId))

  function limparUsuarios() {
    usuarios.value = []
    erro.value = null
  }

  async function buscarUsuarios() {
    loading.value = true
    erro.value = null
    try {
      usuarios.value = await apiRequest('/users')
    } catch (error) {
      erro.value = error.message || 'Não foi possível carregar os usuários.'
      return []
    } finally {
      loading.value = false
    }
  }

  async function atualizarUsuario(userId, dadosAtualizados) {
    erro.value = null
    try {
      const updatedUser = await apiRequest(`/users/${encodeURIComponent(userId)}`, {
        method: 'PATCH',
        body: dadosAtualizados,
      })
      const index = usuarios.value.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) usuarios.value[index] = updatedUser
      return updatedUser
    } catch (error) {
      erro.value = error.message || 'Não foi possível atualizar o usuário.'
      throw error
    }
  }

  async function excluirUsuario(userId) {
    erro.value = null
    try {
      await apiRequest(`/users/${encodeURIComponent(userId)}`, { method: 'DELETE' })
      usuarios.value = usuarios.value.filter((user) => user.id !== userId)
    } catch (error) {
      erro.value = error.message || 'Não foi possível excluir o usuário.'
      throw error
    }
  }

  return {
    usuarios,
    loading,
    erro,
    getUserById,
    limparUsuarios,
    buscarUsuarios,
    atualizarUsuario,
    excluirUsuario,
  }
})
