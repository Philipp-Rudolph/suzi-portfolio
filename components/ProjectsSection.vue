<!-- components/ProjectsSection.vue -->
<template>
  <section id="projects" ref="sectionRef" class="projects-section section">
    <div class="container" data-js-animation>
      <h2 class="section-title" data-js-animation-title>Meine Projekte</h2>

      <div class="projects-filter">
        <button
          v-for="category in categories" :key="category" :class="{ active: filterCategory === category }"
          class="filter-btn" @click="filterCategory = category">
          {{ category }}
        </button>
      </div>
      <div class="projects-grid">
        <ProjectCard
          v-for="project in filteredProjects" :key="project._path" :project="project"
          data-js-animation @click="openProjectDetails(project)"/>
      </div>

      <ProjectsModal
        :project="selectedProject"
        :is-open="modalOpen"
        @close="closeModal"
      />
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { animateSectionOnScroll } from '~/composables/animate.js';

const sectionRef = ref(null);

onMounted(() => {
  if (sectionRef.value) {
    animateSectionOnScroll(sectionRef.value, 300); // Adjust delay to your taste
  }
});

// Modal & Filter State
const filterCategory = ref('Alle')

interface Project {
  _path: string;
  title: string;
  description: string;
  meta: {
    videoUrl?: string;
    client: string;
    year: string;
    category: string;
    tags: string[];
  };
  tags: string[];
}

const selectedProject = ref<Project | null>(null);
const modalOpen = ref(false)

const { data: projectsData } = await useCollectionData('projects')

// Categories
const categories = computed(() => {
  if (!Array.isArray(projectsData.value) || !projectsData.value.length) return ['Alle']
  return ['Alle', ...new Set(projectsData.value.map(p => p.meta.category))]
})

// Filter
const filteredProjects = computed(() => {
  if (!projectsData.value) return []
  return filterCategory.value === 'Alle'
    ? projectsData.value
    : projectsData.value.filter(p => p.meta.category === filterCategory.value)
})

// Modal Controls
const openProjectDetails = (project) => {
  selectedProject.value = project
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  setTimeout(() => (selectedProject.value = null), 300)
}
</script>

<style scoped lang="scss">
.projects-section {
  background-color: $background-darker;
}
.projects-filter {
  display: flex;
  justify-content: center;
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
  flex-wrap: wrap;
}

.filter-btn {
  background: none;
  border: $pixel-base solid $border-color;
  color: $text-light;
  padding: $spacing-xs $spacing-md;
  border-radius: $pixel-xxxl;
  cursor: pointer;
  transition: $transition;
}

.filter-btn:hover {
  background-color: $primary-translucent;
  border-color: $primary;
}

.filter-btn.active {
  background-color: $primary;
  border-color: $primary;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($max-width-xxs, 1fr));
  gap: $spacing-lg;
}

.tag {
  background-color: $backdrop;
  color: $primary;
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-small;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .modal-content {
    width: 95%;
  }
}
</style>