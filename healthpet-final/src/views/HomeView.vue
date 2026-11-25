<script setup>
import { onMounted } from 'vue'
import { useGroupStore } from '@/stores/groupStore'
import { useProjectStore } from '@/stores/projectStore'
import helpPetImage from '@/assets/HelpPet.jpg'
import hackingImage from '@/assets/PetHacking4K.jpg'
import roboticsImage from '@/assets/RoboticaHD.jpg'

const groupStore = useGroupStore()
const projectStore = useProjectStore()

onMounted(() => {
  groupStore.fetchGroups()
  projectStore.fetchProjects()
})

const focusItems = [
  {
    title: 'Help Pet',
    text: 'Gestão de projetos, atividades, membros e eventos em uma experiência única.',
    image: helpPetImage,
    tag: 'Plataforma',
  },
  {
    title: 'Pet Hacking',
    text: 'Segurança, infraestrutura e desenvolvimento de soluções colaborativas.',
    image: hackingImage,
    tag: 'Segurança',
  },
  {
    title: 'Pet Robótica',
    text: 'Laboratório, experimentação e inovação aplicada à comunidade.',
    image: roboticsImage,
    tag: 'Inovação',
  },
]
</script>

<template>
  <main class="home-page">
    <section class="hero-panel">
      <div class="hero-glow"></div>
      <div class="hero-copy">
        <span class="eyebrow"><span class="status-dot"></span>PET Fronteira · 2027</span>
        <h1>Projetos que conectam<br /><span>ideias e pessoas.</span></h1>
        <p>
          Organize grupos, acompanhe iniciativas e transforme cada atividade em progresso real.
        </p>
        <div class="hero-actions">
          <v-btn to="/projetos" color="primary" size="large" rounded="lg" class="primary-action">
            Explorar projetos
            <v-icon end icon="mdi-arrow-right"></v-icon>
          </v-btn>
          <v-btn to="/grupos" variant="outlined" size="large" rounded="lg" class="secondary-action">
            Conhecer grupos
          </v-btn>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="hero-mark">
          <v-icon icon="mdi-puzzle-outline" size="72"></v-icon>
        </div>
      </div>
    </section>

    <section class="section-block" aria-labelledby="programas-heading">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Programas</span>
          <h2 id="programas-heading">Onde a inovação acontece</h2>
        </div>
      </div>
      <div class="program-grid">
        <article v-for="item in focusItems" :key="item.title" class="program-card">
          <img :src="item.image" :alt="item.title" />
          <div class="program-shade"></div>
          <div class="program-content">
            <span>{{ item.tag }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="data-grid">
      <article class="data-card">
        <div class="data-heading">
          <div>
            <span class="section-kicker">Comunidade</span>
            <h2>Grupos</h2>
          </div>
          <v-btn to="/grupos" icon="mdi-arrow-top-right" variant="text" aria-label="Ver grupos"></v-btn>
        </div>
        <v-skeleton-loader v-if="groupStore.loading" type="list-item-two-line@3"></v-skeleton-loader>
        <div v-else class="compact-list">
          <RouterLink
            v-for="group in groupStore.groups"
            :key="group.id"
            to="/grupos"
            class="compact-item"
          >
            <div class="item-icon"><v-icon icon="mdi-account-group-outline"></v-icon></div>
            <div>
              <h3>{{ group.name }}</h3>
              <p>{{ group.description }}</p>
            </div>
            <v-icon icon="mdi-chevron-right" class="item-arrow"></v-icon>
          </RouterLink>
        </div>
      </article>

      <article class="data-card">
        <div class="data-heading">
          <div>
            <span class="section-kicker">Portfólio</span>
            <h2>Projetos</h2>
          </div>
          <v-btn to="/projetos" icon="mdi-arrow-top-right" variant="text" aria-label="Ver projetos"></v-btn>
        </div>
        <v-skeleton-loader v-if="projectStore.loading" type="list-item-two-line@3"></v-skeleton-loader>
        <div v-else class="compact-list">
          <RouterLink
            v-for="project in projectStore.projects"
            :key="project.id"
            to="/projetos"
            class="compact-item"
          >
            <div class="item-icon project-icon"><v-icon icon="mdi-briefcase-outline"></v-icon></div>
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <v-icon icon="mdi-chevron-right" class="item-arrow"></v-icon>
          </RouterLink>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.home-page { max-width: 1440px; margin: 0 auto; }
.hero-panel {
  position: relative; min-height: 520px; overflow: hidden; display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); align-items: center;
  border: 1px solid rgba(255,255,255,.08); border-radius: 28px;
  background: linear-gradient(120deg, rgba(31,35,70,.96), rgba(20,23,43,.94));
  box-shadow: 0 24px 70px rgba(3,5,20,.22);
}
.hero-panel::after {
  content:""; position:absolute; inset:0;
  background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size:32px 32px; mask-image:linear-gradient(to right,transparent 35%,black); pointer-events:none;
}
.hero-glow { position:absolute; width:420px; height:420px; right:-100px; top:-160px; border-radius:50%; background:rgba(123,105,255,.16); filter:blur(16px); }
.hero-copy { position:relative; z-index:2; padding:clamp(40px,7vw,88px); }
.eyebrow,.section-kicker { color:#9da7c7; font-size:.78rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.eyebrow { display:inline-flex; align-items:center; gap:9px; margin-bottom:26px; }
.status-dot { width:8px; height:8px; border-radius:50%; background:#62d7b5; box-shadow:0 0 18px #62d7b5; }
.hero-copy h1 { max-width:760px; color:#f7f8ff; font-size:clamp(2.8rem,6vw,5.8rem); line-height:.98; letter-spacing:-.055em; font-weight:760; }
.hero-copy h1 span { color:#8d84ff; }
.hero-copy p { max-width:620px; margin:26px 0 32px; color:#b7bdd2; font-size:clamp(1rem,1.5vw,1.22rem); line-height:1.7; }
.hero-actions { display:flex; flex-wrap:wrap; gap:12px; }
.primary-action,.secondary-action { text-transform:none; letter-spacing:0; font-weight:750; padding-inline:22px!important; height:52px!important; border-radius:14px!important; }
.primary-action { color:#15172a!important; background:#a8a1ff!important; }
.secondary-action { border-color:rgba(255,255,255,.16)!important; color:#edf0ff!important; }
.hero-visual { position:relative; z-index:2; height:100%; min-height:420px; display:grid; place-items:center; }
.hero-mark { width:180px; height:180px; display:grid; place-items:center; border-radius:38px; color:#dcd9ff; transform:rotate(-8deg); background:linear-gradient(145deg,rgba(151,139,255,.25),rgba(61,206,183,.08)); border:1px solid rgba(210,204,255,.16); box-shadow:0 30px 80px rgba(88,74,180,.24); backdrop-filter:blur(12px); }
.orbit { position:absolute; border:1px solid rgba(169,159,255,.16); border-radius:50%; }
.orbit-one { width:320px; height:320px; }
.orbit-two { width:430px; height:430px; border-style:dashed; opacity:.7; }
.section-block { padding:64px 0 36px; }
.section-heading,.data-heading { display:flex; align-items:flex-end; justify-content:space-between; }
.section-heading h2,.data-heading h2 { margin:8px 0 0; color:#f4f5fb; font-size:clamp(1.7rem,3vw,2.5rem); letter-spacing:-.035em; }
.program-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:24px; }
.program-card { position:relative; min-height:390px; overflow:hidden; border-radius:22px; border:1px solid rgba(255,255,255,.08); background:#1a1d35; }
.program-card img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; transition:transform 500ms cubic-bezier(.2,.8,.2,1); }
.program-card:hover img { transform:scale(1.035); }
.program-shade { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,12,28,.98),rgba(10,12,28,.05) 70%); }
.program-content { position:absolute; z-index:2; left:24px; right:24px; bottom:24px; }
.program-content span { display:inline-block; margin-bottom:10px; color:#bdb7ff; font-size:.72rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
.program-content h3 { color:#fff; font-size:1.45rem; margin:0 0 8px; }
.program-content p { min-height:48px; margin:0; color:#c5c9d8; line-height:1.55; font-size:.92rem; }
.data-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; padding:36px 0 24px; }
.data-card { min-height:280px; padding:24px; border:1px solid rgba(255,255,255,.08); border-radius:22px; background:rgba(24,27,51,.82); }
.data-heading { margin-bottom:16px; }
.compact-list { display:grid; gap:8px; }
.compact-item { display:grid; grid-template-columns:44px minmax(0,1fr) 24px; align-items:center; gap:12px; min-height:72px; padding:10px; border-radius:14px; color:inherit; transition:180ms ease; }
.compact-item:hover { background:rgba(255,255,255,.055); }
.item-icon { width:44px; height:44px; display:grid; place-items:center; border-radius:12px; color:#b9b2ff; background:rgba(145,132,255,.12); }
.project-icon { color:#77d6c1; background:rgba(72,192,165,.11); }
.compact-item h3 { margin:0 0 3px; color:#edf0fa; font-size:.96rem; }
.compact-item p { overflow:hidden; margin:0; color:#969db5; font-size:.82rem; white-space:nowrap; text-overflow:ellipsis; }
.item-arrow { color:#777e99; }
@media(max-width:960px){
  .hero-panel{min-height:480px; grid-template-columns:1fr 220px}
  .hero-copy{padding:44px}
  .hero-visual{min-height:360px}
  .hero-mark{width:140px;height:140px}
  .orbit-one{width:250px;height:250px}
  .orbit-two{width:330px;height:330px}
  .program-card{min-height:340px}
}
@media(max-width:700px){
  .hero-panel{min-height:460px; grid-template-columns:1fr; border-radius:20px}
  .hero-copy{align-self:end;padding:28px 18px}
  .hero-copy h1{font-size:clamp(2.25rem,11vw,3.25rem); line-height:1.02}
  .hero-copy p{margin:16px 0 20px; font-size:.95rem; line-height:1.55}
  .eyebrow{margin-bottom:18px}
  .hero-visual{position:absolute;width:180px;height:180px;min-height:0;right:-58px;top:-58px;opacity:.55}
  .hero-mark{width:100px;height:100px}
  .orbit-one{width:190px;height:190px}
  .orbit-two{width:250px;height:250px}
  .hero-actions{display:grid}
  .primary-action,.secondary-action{width:100%}
  .section-block{padding-top:44px}
  .program-grid,.data-grid{grid-template-columns:1fr}
  .program-grid{display:grid;grid-auto-flow:column;grid-auto-columns:82%;overflow-x:auto;padding-bottom:10px;scroll-snap-type:x mandatory}
  .program-card{min-height:360px;scroll-snap-align:start}
  .data-grid{padding-top:18px}
  .data-card{padding:18px 12px}
}
</style>
