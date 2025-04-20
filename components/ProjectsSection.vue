<!-- components/ProjectsSection.vue -->
<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h2 class="section-title">Meine Projekte</h2>

      <!-- Debug info -->
      <!-- <div class="debug-info" style="background: #f5f5f5; padding: 10px; margin-bottom: 20px; border: 1px solid #ddd;">
        <p>Projects loaded: {{ projects?.length || 0 }}</p>
        <pre>{{ JSON.stringify(projects, null, 2) }}</pre>
      </div> -->

      <div class="projects-filter">
        <button v-for="category in categories" :key="category" :class="{ active: filterCategory === category }"
          class="filter-btn" @click="filterCategory = category">
          {{ category }}
        </button>
      </div>
      <div class="projects-grid">
        <ProjectCard v-for="project in filteredProjects" :key="project._path" :project="project"
          @click="openProjectDetails(project)" />
      </div>
      <!-- Project Details Modal -->
      <div v-if="selectedProject" class="project-modal" :class="{ open: modalOpen }">
        <div class="modal-content">
          <button class="close-modal" @click="closeModal">×</button>
          <div class="modal-header">
            <h3>{{ selectedProject.title }}</h3>
          </div>
          <div class="modal-body">
            <VideoPlayer v-if="selectedProject.meta.videoUrl" :src="selectedProject.meta.videoUrl" />
            <div class="project-details">
              <div class="project-info">
                <p class="project-description">{{ selectedProject.description }}</p>
                <div class="project-meta">
                  <div class="meta-item">
                    <strong>Kunde:</strong> {{ selectedProject.meta.client }}
                  </div>
                  <div class="meta-item">
                    <strong>Jahr:</strong> {{ selectedProject.meta.year }}
                  </div>
                  <div class="meta-item">
                    <strong>Kategorie:</strong> {{ selectedProject.meta.category }}
                  </div>
                </div>
                <div class="project-tags">
                  <span v-for="tag in selectedProject.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'

// Modal & Filter State
const filterCategory = ref('Alle')
const selectedProject = ref(null)
const modalOpen = ref(false)

// Fetch ALL projects from the 'projects' collection
// query function according to documentation
// const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').all())

// Categories
const categories = computed(() => {
  if (!projects.value?.length) return ['Alle']
  return ['Alle', ...new Set(projects.value.map(p => p.meta.category))]
})

// Filter
const filteredProjects = computed(() => {
  if (!projects.value) return []
  return filterCategory.value === 'Alle'
    ? projects.value
    : projects.value.filter(p => p.meta.category === filterCategory.value)
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
  padding: $spacing-xxl 0;
  background-color: $background-dark;
  position: relative;
}

.container {
  max-width: $max-width-lg;
  margin: 0 auto;
  padding: 0 $spacing-md;
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

/* Project Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $backdrop;
  z-index: $z-index-modal;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: $transition;
}

.project-modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  width: 90%;
  max-width: $max-width-md;
  background-color: $background-lighter;
  border-radius: $border-radius-md;
  overflow: hidden;
  max-height: 90dvh;
  display: flex;
  flex-direction: column;
  transform: scale(0.9);
  transition: $transition;
}

.project-modal.open .modal-content {
  transform: scale(1);
}

.close-modal {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  background: none;
  border: none;
  color: $text-light;
  font-size: $spacing-lg;
  cursor: pointer;
  z-index: $z-index-dropdown-menu;
}

.modal-header {
  padding: $spacing-md;
  border-bottom: $pixel-base solid $border-color;
}

.modal-header h3 {
  margin: 0;
  font-size: $font-size-large;
  font-weight: $font-weight-bold;
  color: $text-light;
}

.modal-body {
  padding: $spacing-md;
  overflow-y: auto;
}

.project-details {
  margin-top: $spacing-lg;
}

.project-description {
  margin-bottom: $spacing-md;
  line-height: $line-height-base;
}

.project-meta {
  display: flex;
  gap: $spacing-xs;
  justify-content: space-between;
}

.meta-item {
  padding: $spacing-xs 0;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin-top: $spacing-sm;
}

.tag {
  background-color: $backdrop;
  color: $primary;
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-small;
}

.debug-info {
  color: $text-dark;
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