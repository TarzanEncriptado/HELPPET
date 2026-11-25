// Arquivo: src/stores/userStore.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('users', () => {
  // --- STATE ---
  const usuarios = ref([])
  const loading = ref(false)
  const erro = ref(null)

  // --- GETTERS ---
  const getUserById = computed(() => {
    return (userId) => usuarios.value.find((user) => user.id == userId)
  })

  // --- ACTIONS ---

  async function buscarUsuarios() {
    loading.value = true
    erro.value = null
    console.log('Buscando usuários na store do Pinia...')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockData = [
        {
          id: 99, // Um ID para o admin
          nome: 'Administrador',
          email: 'admin@pet.com',
          senha: 'admin123', // Apenas para simulação
          role: 'admin', // Use 'papel' ou 'role', mas seja consistente
        },
        {
          id: 1,
          nome: 'Reynaldo Costa',
          email: 'reynaldo@email.com',
          senha: 'password123',
          role: 'user', // Corrigido para ser consistente
        },
        {
          id: 2,
          nome: 'Maria Silva',
          email: 'maria.silva@email.com',
          senha: 'password123',
          role: 'user',
        },
        {
          id: 3,
          nome: 'João Souza',
          email: 'joao.souza@email.com',
          senha: 'password123',
          role: 'user',
        },
        {
          id: 4,
          nome: 'Ana Pereira',
          email: 'ana.pereira@email.com',
          senha: 'password123',
          role: 'user',
        },
        {
          id: 5,
          nome: 'João pé de feijão',
          email: 'joao.feijão@email.com',
          senha: 'password123',
          role: 'user',
        },
        {
          id: 6,
          nome: 'Ana Luana',
          email: 'ana.luana@email.com',
          senha: 'password123',
          role: 'user',
        },
      ]
      usuarios.value = mockData
    } catch (e) {
      erro.value = e.message || 'Ocorreu um erro na simulação dos dados.'
    } finally {
      loading.value = false
    }
  }

  function atualizarUsuario(userId, dadosAtualizados) {
    // Log para sabermos que a função foi chamada
    console.log(`Tentando atualizar o usuário ID: ${userId} na store...`)

    const index = usuarios.value.findIndex((user) => user.id == userId)

    if (index !== -1) {
      // Log para sabermos que o usuário foi encontrado
      console.log(`Usuário encontrado no índice ${index}. Aplicando atualizações...`)

      // Mescla os dados antigos com os novos para preservar campos que não foram editados
      usuarios.value[index] = { ...usuarios.value[index], ...dadosAtualizados }

      // Log para vermos o resultado final
      console.log('Dados do usuário após a atualização:', usuarios.value[index])
    } else {
      // Log de erro se o usuário não for encontrado
      console.error(`ERRO: Usuário com ID ${userId} não foi encontrado na store.`)
    }
  }

  function excluirUsuario(userId) {
    console.log(`Excluindo usuário ID: ${userId} da store...`)
    const index = usuarios.value.findIndex((user) => user.id == userId)
    if (index !== -1) {
      usuarios.value.splice(index, 1)
    }
  }
  function cadastrarUsuario(dadosNovoUsuario) {
    // Simula a criação de um ID único
    const novoId = Date.now()

    const novoUsuario = {
      id: novoId,
      nome: dadosNovoUsuario.nome,
      email: dadosNovoUsuario.email,
      senha: dadosNovoUsuario.senha,
      role: 'user', // Define um papel padrão para novos usuários
    }

    // Adiciona o novo usuário à lista de usuários existentes
    usuarios.value.push(novoUsuario)
    console.log('Novo usuário cadastrado na store (simulação):', novoUsuario)
  }
  return {
    usuarios,
    loading,
    erro,
    getUserById,
    buscarUsuarios,
    atualizarUsuario,
    excluirUsuario,
    cadastrarUsuario,
  }
})
