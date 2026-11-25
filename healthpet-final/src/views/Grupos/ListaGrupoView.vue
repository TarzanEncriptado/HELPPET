<script setup>
import { onMounted } from 'vue'
import { useGroupStore } from '@/stores/groupStore'
import { useAuthStore } from '@/stores/authStore'

const groupStore = useGroupStore()
const authStore = useAuthStore()

onMounted(() => {
  groupStore.fetchGroups()
})
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Gerenciamento de Grupos</h1>
      <br />
      <hr />
      <br />
      <v-btn color="primary" v-if="authStore.isAdmin" to="/grupos/novo">Novo Grupo</v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="[
          { title: 'Nome', value: 'name' },
          { title: 'Descrição', value: 'description' },
          { title: 'Ações', value: 'actions', sortable: false },
        ]"
        :items="groupStore.groups"
        :loading="groupStore.loading"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="authStore.isAdmin">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              :to="`/grupos/editar/${item.id}`"
              class="mr-2"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="groupStore.deleteGroup(item.id)"
            ></v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
