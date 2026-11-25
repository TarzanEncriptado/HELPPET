<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGroupStore } from '@/stores/groupStore'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const groupStore = useGroupStore()
const userStore = useUserStore()

const groupId = ref(route.params.id)
const isEditMode = !!groupId.value

const form = ref({
  name: '',
  description: '',
  userIds: [],
})

onMounted(async () => {
  // Carrega a lista de todos os usuários para o seletor
  await userStore.buscarUsuarios()

  // Se estiver em modo de edição, busca os dados do grupo
  if (isEditMode) {
    // Garante que os grupos foram carregados
    if (groupStore.groups.length === 0) {
      await groupStore.fetchGroups()
    }
    const group = groupStore.groups.find((g) => g.id == groupId.value)
    if (group) {
      form.value = { ...group }
    }
  }
})

function handleSubmit() {
  if (isEditMode) {
    groupStore.updateGroup(groupId.value, form.value)
  } else {
    groupStore.addGroup(form.value)
  }
  router.push('/grupos')
}
</script>
<template>
  <v-container>
    <h1 class="text-h4 mb-4">{{ isEditMode ? 'Editar Grupo' : 'Novo Grupo' }}</h1>
    <v-card>
      <v-card-text>
        <v-alert v-if="userStore.erro" type="error" class="mb-4">
          {{ userStore.erro }}
        </v-alert>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Nome do Grupo"
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            label="Descrição"
            variant="outlined"
            class="mb-4"
          ></v-textarea>

          <v-autocomplete
            v-model="form.userIds"
            :items="userStore.usuarios"
            item-title="nome"
            item-value="id"
            label="Membros do Grupo"
            multiple
            chips
            closable-chips
            variant="outlined"
          ></v-autocomplete>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">{{
              isEditMode ? 'Salvar Alterações' : 'Criar Grupo'
            }}</v-btn>
            <v-btn to="/grupos">Cancelar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
