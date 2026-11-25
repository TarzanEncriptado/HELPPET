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
  <v-footer color="#242742ff" class="d-flex flex-column pa-0 healthpet-footer">
      <v-container class="footer-container">
        <v-row justify="space-between" align="center" class="footer-row">
          <v-col cols="12" sm="7" class="text-center text-sm-left">
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

          <v-col cols="12" sm="5" class="text-center text-sm-right">
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

@media (max-width: 600px) {
  .healthpet-footer {
    font-size: 0.76rem;
  }

  .footer-container {
    max-height: none;
    padding: 8px 12px 6px !important;
  }

  .footer-row {
    row-gap: 4px !important;
    padding: 0 !important;
  }

  .footer-row :deep(.v-col) {
    padding: 2px 8px !important;
  }

  .footer-row h4 {
    font-size: 0.96rem !important;
    margin-bottom: 2px !important;
  }

  .footer-row :deep(.v-icon) {
    font-size: 16px !important;
    width: 16px;
    height: 16px;
  }

  .footer-row :deep(.v-btn) {
    width: 36px;
    height: 36px;
  }

  .footer-row :deep(.v-btn .v-icon) {
    font-size: 20px !important;
  }

  .healthpet-footer > div:last-child {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
    font-size: 0.72rem;
  }
}
</style>
