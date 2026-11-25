// src/stores/activityStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivityStore = defineStore('activities', () => {
  // --- STATE ---
  const activities = ref([])
  const loading = ref(false)
  const error = ref(null)

  const mockActivities = [
    {
      id: 201,
      name: 'Dev Front',
      description: 'Criar card de apresentação das tasks',
      projectId: 101,
      groupId: 1,
      userIds: [99],
      isDone: false,
      completedAt: null,
    },
    {
      id: 202,
      name: 'Organizar o Laboratório do PET',
      description: 'Limpar e organizar os componentes.',
      projectId: 102,
      groupId: 1,
      userIds: [2, 4],
      isDone: false,
      completedAt: null,
    },
    {
      id: 203,
      name: 'Slides',
      description: 'Criar Slides da Oficina de Funções quadráticas',
      projectId: 103,
      groupId: 2,
      userIds: [2, 4],
      isDone: false,
      completedAt: null,
    },
  ]

  const getActivityById = computed(() => {
    return (activityId) => activities.value.find((act) => act.id == activityId)
  })

  // --- ACTIONS (CRUD) ---
  async function fetchActivities() {
    loading.value = true
    error.value = null
    console.log('Buscando atividades na store...')
    try {
      await new Promise((res) => setTimeout(res, 500))
      activities.value = mockActivities
    } catch (e) {
      error.value = 'Falha ao buscar atividades.'
      console.error('Fetch Activities Error:', e)
    } finally {
      loading.value = false
    }
  }

  function addActivity(activityData) {
    const newActivity = {
      id: Date.now(),
      name: activityData.name,
      description: activityData.description,
      projectId: activityData.projectId,
      groupId: activityData.groupId,
      userIds: activityData.userIds || [],
      isDone: false,
      completedAt: null,
    }
    activities.value.push(newActivity)
  }

  function updateActivity(activityId, activityData) {
    const index = activities.value.findIndex((a) => a.id == activityId)
    if (index !== -1) {
      const existingActivity = activities.value[index]
      activities.value[index] = { ...existingActivity, ...activityData }
    }
  }

  function deleteActivity(activityId) {
    activities.value = activities.value.filter((a) => a.id != activityId)
  }

  function toggleActivityStatus(activityId) {
    const index = activities.value.findIndex((a) => a.id == activityId)
    if (index !== -1) {
      const activity = activities.value[index]
      activity.isDone = !activity.isDone
      activity.completedAt = activity.isDone ? new Date() : null
    }
  }
  function assignUsersToActivity(activityId, newUserIds) {
    const index = activities.value.findIndex((a) => a.id == activityId)
    if (index !== -1) {
      activities.value[index].userIds = newUserIds
      console.log(`Usuários da atividade ${activityId} atualizados.`)
    }
  }

  return {
    activities,
    loading,
    error,
    getActivityById,
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityStatus,
    assignUsersToActivity,
  }
})
