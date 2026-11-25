<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActivityStore } from '@/stores/activityStore'
import { useProjectStore } from '@/stores/projectStore'
import { useGroupStore } from '@/stores/groupStore'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const router = useRouter()
const activityStore = useActivityStore()
const projectStore = useProjectStore()
const groupStore = useGroupStore()
const userStore = useUserStore()

const activityId = ref(route.params.id)
const isEditMode = !!activityId.value

const form = ref({
  name: '',
  description: '',
  projectId: null,
  groupId: null,
  userIds: [],
})

onMounted(async () => {
  // Carrega dados para os seletores
  await projectStore.fetchProjects()
  await groupStore.fetchGroups()
  await userStore.buscarUsuarios()

  // Se editando, preenche o formulário
  if (isEditMode) {
    // Garante que atividades foram carregadas
    if (activityStore.activities.length === 0) {
      await activityStore.fetchActivities()
    }
    const activity = activityStore.getActivityById(activityId.value)
    if (activity) {
      form.value = {
        name: activity.name,
        description: activity.description,
        projectId: activity.projectId,
        groupId: activity.groupId,
        userIds: activity.userIds,
      }
    }
  }
})

function handleSubmit() {
  if (isEditMode) {
    activityStore.updateActivity(activityId.value, form.value)
  } else {
    activityStore.addActivity(form.value)
  }
  router.push('/atividades')
}
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-4">{{ isEditMode ? 'Editar Atividade' : 'Nova Atividade' }}</h1>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Nome da Atividade"
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
            v-model="form.projectId"
            :items="projectStore.projects"
            item-title="name"
            item-value="id"
            label="Projeto Relacionado"
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
            class="mb-4"
          ></v-autocomplete>
          <v-autocomplete
            v-model="form.userIds"
            :items="userStore.usuarios"
            item-title="nome"
            item-value="id"
            label="Usuários Envolvidos"
            variant="outlined"
            multiple
            chips
            closable-chips
          ></v-autocomplete>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">{{
              isEditMode ? 'Salvar Alterações' : 'Criar Atividade'
            }}</v-btn>
            <v-btn to="/atividades">Cancelar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
