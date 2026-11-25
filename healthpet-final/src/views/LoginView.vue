<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const senha = ref('')
const formValido = ref(false)
const loading = ref(false)
const erroLogin = ref(null)

const router = useRouter()
const authStore = useAuthStore()

async function login() {
  if (!formValido.value) return

  loading.value = true
  erroLogin.value = null

  try {
    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await authStore.login({ email: email.value, senha: senha.value })

    alert('Login efetuado com sucesso! (simulação com Pinia)')
    router.push('/') // Redireciona para a home após o login
  } catch (error) {
    erroLogin.value = error.message
  } finally {
    loading.value = false
  }
}

const rules = {
  required: (value) => !!value || 'Este campo é obrigatório.',
  emailFormat: (value) => {
    const pattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/
    return pattern.test(value) || 'E-mail inválido.'
  },
}
</script>

<template>
  <div class="form-wrapper">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="mx-auto my-12" max-width="500">
            <v-card-title class="justify-center">
              <span class="text-3xl font-bold text-blue-600">Login</span>
            </v-card-title>

            <v-alert v-if="erroLogin" type="error" dense text class="mx-4 mb-n2">
              {{ erroLogin }}
            </v-alert>

            <v-card-text>
              <v-form v-model="formValido" @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  type="email"
                  :rules="[rules.required, rules.emailFormat]"
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>

                <v-text-field
                  v-model="senha"
                  label="Senha"
                  type="password"
                  :rules="[rules.required]"
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>
                <v-btn
                  :disabled="!formValido || loading"
                  :loading="loading"
                  block
                  type="submit"
                  size="large"
                  color="primary"
                  class="mt-4"
                >
                  Entrar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.form-wrapper {
  min-height: 70vh;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #242742ff, #ffffff);
}
</style>
