// src/stores/groupStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGroupStore = defineStore('groups', () => {
  // --- STATE ---
  const groups = ref([])
  const loading = ref(false)
  const error = ref(null)

  // --- DADOS SIMULADOS ---
  const mockGroups = [
    {
      id: 1,
      name: 'Grupo Pet Fronteira',
      description: 'Grupo Pet formado pelos Alunos de Graduação em Sistemas de Informação - CPPP',
      userIds: [1, 99], // IDs dos usuários neste grupo (Reynaldo e Admin)
    },
    {
      id: 2,
      name: 'Grupo Pet Matemática',
      description: 'Grupo Pet formado pelos alunos de Graduação em Matemática - CPPP',
      userIds: [2, 3, 4], // IDs dos usuários Maria, João e Ana
    },
  ]

  // --- ACTIONS ---
  async function fetchGroups() {
    loading.value = true
    try {
      await new Promise((res) => setTimeout(res, 500)) // Simula chamada de rede
      groups.value = mockGroups
    } catch (fetchError) {
      error.value = fetchError.message || 'Falha ao buscar grupos.'
    } finally {
      loading.value = false
    }
  }

  function addGroup(groupData) {
    const newGroup = {
      id: Date.now(),
      name: groupData.name,
      description: groupData.description,
      userIds: groupData.userIds || [],
    }
    groups.value.push(newGroup)
  }

  function updateGroup(groupId, groupData) {
    const index = groups.value.findIndex((g) => g.id == groupId)
    if (index !== -1) {
      groups.value[index] = { ...groups.value[index], ...groupData }
    }
  }

  function deleteGroup(groupId) {
    groups.value = groups.value.filter((g) => g.id != groupId)
  }

  return { groups, loading, error, fetchGroups, addGroup, updateGroup, deleteGroup }
})
