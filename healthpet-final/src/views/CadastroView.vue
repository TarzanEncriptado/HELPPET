<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const nome = ref('')
const email = ref('')
const senha = ref('')
const formValido = ref(false)
const loading = ref(false)
const erroCadastro = ref(null)
const router = useRouter()
const authStore = useAuthStore()

async function cadastrar() {
  if (!formValido.value) return

  const payload = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  }

  loading.value = true
  erroCadastro.value = null
  try {
    await authStore.register(payload)
    router.push('/login')
  } catch (error) {
    erroCadastro.value = error.message || 'Não foi possível concluir o cadastro.'
  } finally {
    loading.value = false
  }
}

const rules = {
  required: (value) => !!value || 'Este campo é obrigatório.',
  minLength: (len) => (value) => (value && value.length >= len) || `Mínimo de ${len} caracteres.`,
  emailFormat: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
              <span class="text-3xl font-bold text-blue-600">Crie sua Conta</span>
            </v-card-title>

            <v-card-text>
              <v-alert v-if="erroCadastro" type="error" class="mb-4">
                {{ erroCadastro }}
              </v-alert>
              <v-form v-model="formValido" @submit.prevent="cadastrar">
                <v-text-field
                  v-model="nome"
                  label="Nome Completo"
                  :rules="[rules.required, rules.minLength(3)]"
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>

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
                  :rules="[rules.required, rules.minLength(12)]"
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
                  Cadastrar
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
