<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const usuarioId = route.params.id
const formValido = ref(false)
const nome = ref('')
const email = ref('')

onMounted(() => {
  const usuario = userStore.getUserById(usuarioId)
  if (usuario) {
    nome.value = usuario.nome
    email.value = usuario.email
  }
})

function salvarAlteracoes() {
  if (!formValido.value) return
  const payload = {
    nome: nome.value,
    email: email.value,
  }
  userStore.atualizarUsuario(usuarioId, payload)
  alert('Alterações salvas com sucesso!')
  router.push('/usuarios')
}

const rules = {
  required: (value) => !!value || 'Este campo é obrigatório.',
  emailFormat: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="px-6 py-4">
          <v-card-title>
            <span>Editando Usuário #{{ usuarioId }}</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValido">
              <v-text-field
                v-model="nome"
                label="Nome Completo"
                :rules="[rules.required]"
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
              <v-btn
                @click="salvarAlteracoes"
                :disabled="!formValido"
                block
                size="large"
                color="success"
                class="mt-4"
              >
                Salvar Alterações
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
