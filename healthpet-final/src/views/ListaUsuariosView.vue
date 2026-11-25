<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

// 1. Inicia a store e pega as variáveis necessárias
const userStore = useUserStore()
const { usuarios, loading, erro } = storeToRefs(userStore)

// 2. Define as variáveis para controlar o diálogo de exclusão
const dialogExcluir = ref(false)
const usuarioParaExcluir = ref(null)

// Funções que controlam o diálogo
function abrirDialogExcluir(usuario) {
  usuarioParaExcluir.value = usuario
  dialogExcluir.value = true
}

function fecharDialogExcluir() {
  dialogExcluir.value = false
  usuarioParaExcluir.value = null
}

async function confirmarExclusao() {
  if (usuarioParaExcluir.value) {
    try {
      await userStore.excluirUsuario(usuarioParaExcluir.value.id)
      fecharDialogExcluir()
    } catch {
      fecharDialogExcluir()
    }
  }
}

// Busca os dados iniciais quando o componente é montado.
onMounted(() => {
  if (userStore.usuarios.length === 0) {
    userStore.buscarUsuarios()
  }
})
</script>

<template>
  <v-container>
    <v-card class="v-responsive">
      <v-card-title>Usuários</v-card-title>

      <div v-if="loading" class="text-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Carregando usuários...</p>
      </div>

      <div v-else-if="erro" class="text-center pa-4 text-red">
        <p>Ocorreu um erro:</p>
        <p>{{ erro }}</p>
      </div>

      <v-table v-else>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td class="text-center">
              <v-btn
                icon="mdi-pencil"
                size="small"
                color="blue"
                class="me-2"
                :to="`/usuarios/editar/${usuario.id}`"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon="mdi-delete"
                size="small"
                color="red"
                @click="abrirDialogExcluir(usuario)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog v-model="dialogExcluir" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text v-if="usuarioParaExcluir">
          Você tem certeza que deseja excluir o usuário
          <strong>{{ usuarioParaExcluir.nome }}</strong
          >? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="fecharDialogExcluir">Cancelar</v-btn>
          <v-btn color="red-darken-1" variant="elevated" @click="confirmarExclusao"
            >Confirmar Exclusão</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.v-responsive {
  overflow-x: auto;
}
</style>
