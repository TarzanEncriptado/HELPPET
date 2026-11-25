import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore' // 1. Importa a userStore para poder consultá-la

export const useAuthStore = defineStore(
  'auth',
  () => {
    // STATE
    const user = ref(null) // Armazena os dados do usuário logado

    // GETTERS
    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin') // O '?' evita erros se user for nulo

    // ACTIONS
    async function login(credentials) {
      // 2. Obtém a instância da userStore para acessar a "base de dados"
      const userStore = useUserStore()

      // 3. Garante que os usuários de simulação foram carregados
      if (userStore.usuarios.length === 0) {
        await userStore.buscarUsuarios()
      }

      // 4. Procura o usuário na userStore pelo e-mail
      const foundUser = userStore.usuarios.find((u) => u.email === credentials.email)

      // 5. Verifica se o usuário foi encontrado e se a senha corresponde
      if (foundUser && foundUser.senha === credentials.senha) {
        // Sucesso! Define o usuário logado na authStore,
        // criando um novo objeto sem a senha por segurança.
        user.value = {
          id: foundUser.id,
          nome: foundUser.nome,
          email: foundUser.email,
          role: foundUser.role, // A permissão (role) é pega diretamente do "banco de dados"
        }
        return // Encerra a função com sucesso
      }

      // --- CÓDIGO DE AUTENTICAÇÃO COM API REAL ---
      /*
        Aqui iria a sua lógica de API real. Note como ela é separada da lógica de simulação.

        const response = await fetch('https://sua-api.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credentials.email, senha: credentials.senha }),
        })

        if (!response.ok) {
          // Trata erros da API, como 401 (Não autorizado)
          throw new Error('E-mail ou senha inválidos.')
        }

        const { token, userData } = await response.json()

        // Salva os dados do usuário e o token recebidos da API
        user.value = userData
        // Ex: localStorage.setItem('authToken', token)
      */

      // 6. Se o usuário não foi encontrado ou a senha estava incorreta, lança um erro
      throw new Error('E-mail ou senha inválidos.')
    }

    function logout() {
      user.value = null
    }

    return { user, isAuthenticated, isAdmin, login, logout }
  },
  {
    // Habilita a persistência do estado no localStorage
    persist: true,
  },
)
