// src/stores/projectStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('projects', () => {
  // --- STATE ---
  const projects = ref([])
  const loading = ref(false)
  const error = ref(null)

  // --- DADOS SIMULADOS ---
  const mockProjects = [
    {
      id: 101,
      name: 'Help Pet',
      description: 'Construção do sistema de gerenciamento de projetos do PET FRONTEIRA.',
      groupId: 1, // Pertence ao Grupo de Robótica Avançada
      userIds: [99], // Apenas o Admin está neste projeto por enquanto
    },
    {
      id: 103,
      name: 'Pet Hacking',
      description: 'Introduzir a segurança em infraestrutura e código na comunidade interna.',
      groupId: 1, // Pertence ao Grupo de Inclusão Digital
      userIds: [2, 4], // Maria e Ana estão neste projeto
    },
    {
      id: 102,
      name: 'Pet Calculo 1',
      description: 'Fornecer uma base de pré-calculo aos estudantes ingressantes.',
      groupId: 2, // Pertence ao Grupo de Inclusão Digital
      userIds: [2, 4], // Maria e Ana estão neste projeto
    },
  ]

  // --- ACTIONS (CRUD) ---
  // (As ações aqui seriam muito similares às do groupStore: fetch, add, update, delete)
  async function fetchProjects() {
    loading.value = true
    try {
      await new Promise((res) => setTimeout(res, 500))
      projects.value = mockProjects
    } catch (fetchError) {
      error.value = fetchError.message || 'Falha ao buscar projetos.'
    } finally {
      loading.value = false
    }
  }
  function addProject(projectData) {
    const newProject = {
      id: Date.now(),
      name: projectData.name,
      description: projectData.description,
      groupId: projectData.groupId,
      userIds: projectData.userIds || [],
    }
    projects.value.push(newProject)
  }
  function updateProject(projectId, projectData) {
    const index = projects.value.findIndex((g) => g.id == projectId)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...projectData }
    }
  }

  function deleteProject(projectId) {
    projects.value = projects.value.filter((project) => project.id != projectId)
  }

  return { projects, loading, error, fetchProjects, addProject, updateProject, deleteProject }
})
