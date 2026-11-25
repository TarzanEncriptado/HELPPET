<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import { useUserStore } from '@/stores/userStore'
import { useGroupStore } from '@/stores/groupStore'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const userStore = useUserStore()
const groupStore = useGroupStore()

const projectId = ref(route.params.id)
const isEditMode = !!projectId.value

const form = ref({
  name: '',
  description: '',
  groupId: null,
  userIds: [],
})

onMounted(async () => {
  await userStore.buscarUsuarios()
  await groupStore.fetchGroups()

  if (isEditMode) {
    if (projectStore.projects.length === 0) {
      await projectStore.fetchProjects()
    }
    const project = projectStore.projects.find((p) => p.id == projectId.value)
    if (project) {
      form.value = { ...project }
    }
  }
})

function handleSubmit() {
  if (isEditMode) {
    projectStore.updateProject(projectId.value, form.value)
  } else {
    projectStore.addProject(form.value)
  }
  router.push('/projetos')
}
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-4">{{ isEditMode ? 'Editar Projeto' : 'Novo Projeto' }}</h1>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Nome do Projeto"
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
            label="Membros do Projeto"
            multiple
            chips
            closable-chips
            variant="outlined"
            class="mb-4"
          ></v-autocomplete>

          <v-autocomplete
            v-model="form.groupId"
            :items="groupStore.groups"
            item-title="name"
            item-value="id"
            label="Grupo Responsável"
            variant="outlined"
          ></v-autocomplete>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">{{
              isEditMode ? 'Salvar Alterações' : 'Criar Projeto'
            }}</v-btn>
            <v-btn to="/projetos">Cancelar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
