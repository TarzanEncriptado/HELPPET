<script setup>
import { computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useGroupStore } from '@/stores/groupStore'
import { useAuthStore } from '@/stores/authStore'

const groupStore = useGroupStore()
const authStore = useAuthStore()
const { mobile } = useDisplay()
const headers = computed(() => [
  { title: 'Nome', value: 'name' },
  { title: 'Descrição', value: 'description' },
  ...(authStore.isAdmin ? [{ title: 'Ações', value: 'actions', sortable: false }] : []),
])

onMounted(() => {
  groupStore.fetchGroups()
})
</script>

<template>
  <section class="groups-page">
    <header class="groups-heading">
      <div>
        <p class="page-eyebrow">Comunidade</p>
        <h1>Grupos</h1>
        <p class="page-description">Conheça as equipes e áreas de atuação do PET Fronteira.</p>
      </div>
      <v-btn
        v-if="authStore.isAdmin"
        color="primary"
        prepend-icon="mdi-plus"
        to="/grupos/novo"
        class="new-group-button"
      >
        Novo grupo
      </v-btn>
    </header>

    <v-skeleton-loader
      v-if="groupStore.loading && mobile"
      type="card"
      class="group-loading"
    ></v-skeleton-loader>

    <div v-else-if="mobile" class="group-cards">
      <v-card v-for="group in groupStore.groups" :key="group.id" class="group-card">
        <v-card-text>
          <div class="group-card-heading">
            <div class="group-icon"><v-icon icon="mdi-account-group-outline"></v-icon></div>
            <div class="group-card-title">
              <h2>{{ group.name }}</h2>
              <p>{{ group.description }}</p>
            </div>
          </div>
          <div v-if="authStore.isAdmin" class="group-card-actions">
            <v-btn
              variant="text"
              size="small"
              prepend-icon="mdi-pencil"
              :to="`/grupos/editar/${group.id}`"
            >
              Editar
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              color="error"
              prepend-icon="mdi-delete"
              @click="groupStore.deleteGroup(group.id)"
            >
              Excluir
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-card v-else class="groups-table-card">
      <v-data-table
        :headers="headers"
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
  </section>
</template>

<style scoped>
.groups-page {
  width: min(100%, 1120px);
  margin: 0 auto;
}

.groups-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.page-eyebrow {
  margin: 0 0 8px;
  color: #a8a1ff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.groups-heading h1 {
  color: #f7f8ff;
  font-size: clamp(2rem, 5vw, 3.25rem);
  letter-spacing: -0.045em;
  line-height: 1.1;
}

.page-description {
  margin: 10px 0 0;
  color: #aab0c8;
  line-height: 1.5;
}

.new-group-button {
  flex: none;
  border-radius: 12px;
  text-transform: none;
  font-weight: 700;
}

.groups-table-card,
.group-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: #181b33;
}

.groups-table-card :deep(th) {
  color: #c5c9d8;
  font-weight: 700;
  white-space: nowrap;
}

.groups-table-card :deep(td) {
  color: #edf0fa;
}

.group-cards {
  display: grid;
  gap: 12px;
}

.group-card-heading {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.group-icon {
  display: grid;
  place-items: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  color: #b9b2ff;
  background: rgba(145, 132, 255, 0.12);
}

.group-card-title {
  min-width: 0;
}

.group-card-title h2 {
  margin: 0;
  color: #f7f8ff;
  font-size: 1rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.group-card-title p {
  margin: 6px 0 0;
  color: #aab0c8;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.group-card-actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding-top: 8px;
}

.group-loading {
  border-radius: 18px;
  overflow: hidden;
}

@media (max-width: 600px) {
  .groups-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
  }

  .new-group-button {
    width: 100%;
  }
}
</style>
