<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { useGroupStore } from '@/stores/groupStore'
import { useAuthStore } from '@/stores/authStore'

const projectStore = useProjectStore()
const groupStore = useGroupStore()
const authStore = useAuthStore()

const selectedGroupId = ref(null)


const headers = [
  { title: 'Nome', key: 'name', align: 'start' },
  { title: 'Descrição', key: 'description', align: 'start' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'start' },
]

// 1. Mantemos a propriedade computada para filtrar
const filteredProjects = computed(() => {
  const allProjects = [...projectStore.projects]
  if (!selectedGroupId.value) {
    return allProjects
  }
  return allProjects.filter((project) => project.groupId === selectedGroupId.value)
})

// 2. Criamos uma ref local para armazenar a lista a ser exibida na tabela
const tableItems = ref([])

// 3. Usamos 'watch' para atualizar a lista local SOMENTE quando o filtro mudar
watch(
  filteredProjects,
  (newFilteredList) => {
    console.log('Filtro mudou, atualizando tableItems...')
    // Atualiza a ref local com uma NOVA cópia da lista filtrada
    tableItems.value = [...newFilteredList]
  },
  {
    immediate: true, // Executa o watch imediatamente na montagem inicial
  },
)

onMounted(() => {
  projectStore.fetchProjects()
  groupStore.fetchGroups()
})
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4 flex-wrap">
      <h1 class="text-h4">Gerenciamento de Projetos</h1>
      <v-btn v-if="authStore.isAdmin" color="primary" to="/projetos/novo">Novo Projeto</v-btn>
    </div>

    <v-autocomplete
      v-model="selectedGroupId"
      :items="groupStore.groups"
      item-title="name"
      item-value="id"
      label="Filtrar por Grupo"
      variant="outlined"
      class="mb-6"
      clearable
    ></v-autocomplete>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="tableItems"
        :loading="projectStore.loading"
        item-value="name"
        no-data-text="Nenhum projeto encontrado para este grupo."
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="authStore.isAdmin">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              :to="`/projetos/editar/${item.id}`"
              class="mr-2"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="projectStore.deleteProject(item.id)"
            ></v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
