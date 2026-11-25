<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// Dados para os links das redes sociais, facilitando a manutenção
const socialLinks = [
  { icon: 'mdi-instagram', link: 'https://instagram.com/petfronteira' },
  { icon: 'mdi-facebook', link: 'https://facebook.com/petfronteira' },
  { icon: 'mdi-linkedin', link: 'https://linkedin.com/company/petfronteira' },
  { icon: 'mdi-github', link: 'https://github.com/petfronteira' },
]
</script>

<template>
  <AppFooter app color="#242742ff" class="d-flex flex-column pa-0">
    <v-footer app color="#242742ff" class="d-flex flex-column pa-0">
      <v-container>
        <v-row justify="space-between" class="pa-4">
          <v-col cols="12" md="4" class="text-md-left text-center">
            <h4 class="text-h6 font-weight-bold mb-2">PET Fronteira</h4>
            <div class="d-flex align-center justify-center justify-md-start mb-1">
              <v-icon start icon="mdi-map-marker-outline"></v-icon>
              <span>Ponta Porã, Mato Grosso do Sul</span>
            </div>
            <div class="d-flex align-center justify-center justify-md-start">
              <v-icon start icon="mdi-email-outline"></v-icon>
              <a href="mailto:petfronteiraufms@gmail.com" class="text-white text-decoration-none">
                petfronteiraufms@gmail.com
              </a>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <h4 class="text-subtitle-1 font-weight-bold mb-2">Siga-nos</h4>
            <div>
              <v-btn
                v-for="item in socialLinks"
                :key="item.icon"
                class="mx-2"
                :href="item.link"
                target="_blank"
                icon
                variant="text"
              >
                <v-icon size="24px">{{ item.icon }}</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <div class="px-4 py-2 bg-black text-center w-100">
        <strong>© {{ new Date().getFullYear() }} — PET Fronteira.</strong> Todos os direitos
        reservados.
      </div>
    </v-footer>
  </AppFooter>
</template>

<style scoped>
/* Garante que os links no rodapé não tenham sublinhado e fiquem brancos */
a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;
}

a:hover {
  opacity: 0.8;
}

/* Aumenta a legibilidade em telas menores */
.v-footer {
  font-size: 0.9rem;
}
</style>
