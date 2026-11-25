<script setup>
import { ref, onMounted } from 'vue'
import HomePetFronteira from '@/components/HomePetFronteira.vue'
import { useGroupStore } from '@/stores/groupStore'
import { useProjectStore } from '@/stores/projectStore'
import scratchImage from '@/assets/ScratchHD.jpg'
import agricultureImage from '@/assets/agri.png'
import triadImage from '@/assets/triade.png'
import helpPetImage from '@/assets/HelpPet.jpg'
import hackingImage from '@/assets/PetHacking4K.jpg'
import roboticsImage from '@/assets/RoboticaHD.jpg'

const groupStore = useGroupStore()
const projectStore = useProjectStore()

onMounted(() => {
  groupStore.fetchGroups()
  projectStore.fetchProjects()
})

const carouselItems = ref([
  {
    src: scratchImage,
  },
  {
    src: agricultureImage,
  },
  {
    src: triadImage,
  },
])
</script>

<template>
  <div>
    <section class="hero-section">
      <v-carousel
        cycle
        height="100%"
        hide-delimiters
        show-arrows="hover"
        class="background-carousel"
      >
        <v-carousel-item v-for="(item, i) in carouselItems" :key="i" :src="item.src" cover>
          <v-overlay
            absolute
            color="#000"
            :model-value="false"
            :scrim="false"
            style="opacity: 0.5"
            class="background-overlay"
          ></v-overlay>
        </v-carousel-item>
      </v-carousel>

      <div class="foreground-content">
        <HomePetFronteira />
      </div>
    </section>

    <br />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <v-container class="my-12">
      <div class="d-flex justify-center flex-wrap gap-8">
        <v-hover v-slot="{ props }">
          <v-card class="mx-auto" max-width="344" v-bind="props">
            <v-img :src="helpPetImage"></v-img>
            <v-card-text>
              <h2 class="text-h6 text-primary">Help Pet</h2>
              Sistema de gestão de projetos do PET Fronteira com controle de atividades, membros e
              eventos.
            </v-card-text>

            <v-card-title>
              <span class="text-primary text-subtitle-2">Em desenvolvimento: 2025</span>
            </v-card-title>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ props }">
          <v-card class="mx-auto" max-width="344" v-bind="props">
            <v-img :src="hackingImage"></v-img>

            <v-card-text>
              <h2 class="text-h6 text-primary">Pet Hacking</h2>
              Ensino e compartilhamento de conhecimentos sobre Hacking, colaboração em
              desenvolvimento de projetos e implementação do laboratório de cibersegurança do PET
              Fronteira.
            </v-card-text>

            <v-card-title>
              <span class="text-primary text-subtitle-2">Em desenvolvimento: 2025</span>
            </v-card-title>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ props }">
          <v-card class="mx-auto" max-width="344" v-bind="props">
            <v-img :src="roboticsImage"></v-img>

            <v-card-text>
              <h2 class="text-h6 text-primary">Pet Robótica</h2>
              Ensino e compartilhamento de conhecimentos sobre Robótica, colaboração em
              desenvolvimento de projetos e implementação do laboratório do PET Fronteira.
            </v-card-text>

            <v-card-title>
              <span class="text-primary text-subtitle-2">Em desenvolvimento: 2025</span>
            </v-card-title>
          </v-card>
        </v-hover>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h4 text-center mb-6">Grupos</h2>
          <br />
          <v-card v-if="groupStore.loading">
            <v-skeleton-loader type="list-item-two-line@3"></v-skeleton-loader>
          </v-card>
          <v-list v-else lines="two" class="elevation-2 rounded">
            <v-list-item
              v-for="group in groupStore.groups"
              :key="group.id"
              :title="group.name"
              :subtitle="group.description"
            ></v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="text-h4 text-center mb-6">Projetos</h2>
          <br />
          <v-card v-if="projectStore.loading">
            <v-skeleton-loader type="list-item-two-line@3"></v-skeleton-loader>
          </v-card>
          <v-list v-else lines="two" class="elevation-2 rounded">
            <v-list-item
              v-for="project in projectStore.projects"
              :key="project.id"
              :title="project.name"
              :subtitle="project.description"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: calc(100vh - 64px); /* Altura da tela menos a barra de navegação */
  width: 100%;
}

.background-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  /* IMPORTANTE: O contêiner principal permanece interativo (sem pointer-events: none) */
}


/* 1. Usamos :deep() para desativar os eventos do mouse na janela das imagens
      E na camada de sobreposição escura (o verdadeiro culpado). */
.background-carousel :deep(.v-carousel__window),
.background-carousel :deep(.v-overlay__scrim) {
  pointer-events: none;
}

/* 2. Esta regra garante que as setas, que estão em outra camada,
      voltem a ser interativas para o hover e o click. */
.background-carousel :deep(.v-carousel__controls) {
  pointer-events: auto;
}


.foreground-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}
</style>
