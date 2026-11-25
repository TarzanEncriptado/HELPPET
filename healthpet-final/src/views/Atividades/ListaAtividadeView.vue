<script setup>
import { ref, computed, onMounted } from 'vue'
import { useActivityStore } from '@/stores/activityStore'
import { useProjectStore } from '@/stores/projectStore'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

const activityStore = useActivityStore()
const projectStore = useProjectStore()
const authStore = useAuthStore()
const userStore = useUserStore()

// --- Estado para o Modal de Atribuição ---
const dialog = ref(false)
const selectedActivity = ref(null)
const selectedUsers = ref([])
const userLoadError = ref(null)
// -----------------------------------------

const selectedProjectId = ref(null)

onMounted(async () => {
  activityStore.fetchActivities()
  projectStore.fetchProjects()
  if (authStore.isAdmin) {
    await userStore.buscarUsuarios()
    userLoadError.value = userStore.erro
  }
})

const filteredActivities = computed(() => {
  if (!selectedProjectId.value) {
    return activityStore.activities
  }
  return activityStore.activities.filter((act) => act.projectId === selectedProjectId.value)
})

// Função para pegar o nome do usuário pelo ID
function getUserNameById(id) {
  const user = userStore.usuarios.find((u) => u.id === id)
  return user ? user.nome : `Membro ${id}`
}

// Função para abrir o modal
function openAssignDialog(activity) {
  selectedActivity.value = activity
  // Cria uma cópia dos userIds atuais para não alterar o original antes de salvar
  selectedUsers.value = [...activity.userIds]
  dialog.value = true
}

// Função para salvar as atribuições
function saveAssignments() {
  if (selectedActivity.value) {
    activityStore.assignUsersToActivity(selectedActivity.value.id, selectedUsers.value)
  }
  dialog.value = false
}

function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<template>
  <v-container>
    <v-alert v-if="userLoadError" type="error" class="mb-4">{{ userLoadError }}</v-alert>
    <div class="d-flex justify-space-between align-center mb-4 flex-wrap">
      <h1 class="text-h4">Gerenciamento de Atividades</h1>
      <v-btn v-if="authStore.isAdmin" color="primary" to="/atividades/novo">Nova Atividade</v-btn>
    </div>

    <v-autocomplete
      v-model="selectedProjectId"
      :items="projectStore.projects"
      item-title="name"
      item-value="id"
      label="Filtrar por Projeto"
      variant="outlined"
      class="mb-6"
      clearable
    ></v-autocomplete>

    <v-card>
      <v-data-table
        :headers="[
          { title: 'Status', key: 'status', sortable: false },
          { title: 'Nome', key: 'name' },
          { title: 'Integrantes', key: 'userIds', sortable: false },
          { title: 'Concluída em', key: 'completedAt' },
          { title: 'Ações', key: 'actions', sortable: false },
        ]"
        :items="filteredActivities"
        :loading="activityStore.loading"
        no-data-text="Nenhuma atividade encontrada para este projeto."
        item-value="id"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip v-if="authStore.isAdmin" :color="item.isDone ? 'success' : 'grey'" size="small">
            {{ item.isDone ? 'Concluída' : 'Pendente' }}
          </v-chip>
        </template>

        <!-- NOVO SLOT PARA INTEGRANTES -->
        <template v-slot:[`item.userIds`]="{ item }">
          <div v-if="item.userIds.length > 0">
            <v-chip v-for="userId in item.userIds" :key="userId" size="small" class="ma-1" label>
              {{ getUserNameById(userId) }}
            </v-chip>
          </div>
          <span v-else class="text-grey text-caption">Ninguém atribuído</span>
        </template>

        <template v-slot:[`item.completedAt`]="{ item }">
          {{ formatDate(item.completedAt) }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <!-- Botão para Marcar/Desmarcar -->
          <v-btn
            v-if="authStore.isAdmin"
            :icon="item.isDone ? 'mdi-check-circle' : 'mdi-circle-outline'"
            size="small"
            variant="text"
            :color="item.isDone ? 'success' : 'grey'"
            @click="activityStore.toggleActivityStatus(item.id)"
            class="mr-2"
          ></v-btn>

          <!-- NOVO BOTÃO PARA ATRIBUIR USUÁRIOS -->
          <v-btn
            v-if="authStore.isAdmin"
            icon="mdi-account-plus-outline"
            size="small"
            variant="text"
            @click="openAssignDialog(item)"
          ></v-btn>

          <!-- Botões de Editar/Excluir (só para Admin) -->
          <div v-if="authStore.isAdmin" style="display: inline-block">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              :to="`/atividades/editar/${item.id}`"
              class="mr-2"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="activityStore.deleteActivity(item.id)"
            ></v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- MODAL (POP-UP) PARA ATRIBUIR USUÁRIOS -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card v-if="selectedActivity">
        <v-card-title>
          <span class="text-h5">Atribuir Integrantes</span>
          <div class="text-subtitle-1 text-grey">{{ selectedActivity.name }}</div>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="selectedUsers"
            :items="userStore.usuarios"
            item-title="nome"
            item-value="id"
            label="Selecione os integrantes"
            multiple
            chips
            closable-chips
            variant="outlined"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="flat" @click="saveAssignments">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
