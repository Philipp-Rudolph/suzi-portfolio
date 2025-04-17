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
  lockScroll()
}

const closeModal = () => {
  modalOpen.value = false
  setTimeout(() => (selectedProject.value = null), 300)
  unlockScroll()
}

// Scroll lock (same as before)
// const isClient = typeof window !== 'undefined'
// const documentBody = isClient ? document.body : null

// const lockScroll = () => {
//   if (isClient) {
//     const scrollY = window.scrollY
//     documentBody.style.position = 'fixed'
//     documentBody.style.top = `-${scrollY}px`
//     documentBody.style.width = '100%'
//   }
// }

// const unlockScroll = () => {
//   if (isClient) {
//     const scrollY = documentBody.style.top
//     documentBody.style.position = ''
//     documentBody.style.top = ''
//     documentBody.style.width = ''
//     window.scrollTo(scrollY, parseInt(scrollY || '0') * -1)
//   }
// }
</script>

<style scoped>
.projects-section {
  padding: 6rem 0;
  background-color: #121212;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #FF5722;
}

.projects-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: none;
  border: 1px solid #333;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: rgba(255, 87, 34, 0.1);
  border-color: #FF5722;
}

.filter-btn.active {
  background-color: #FF5722;
  border-color: #FF5722;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Project Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.project-modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  width: 90%;
  max-width: 1000px;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.project-modal.open .modal-content {
  transform: scale(1);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #333;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.8rem;
  color: white;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.project-details {
  margin-top: 2rem;
}

.project-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-meta {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  padding: 0.5rem 0;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background-color: rgba(255, 87, 34, 0.1);
  color: #FF5722;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.debug-info {
  color: black;
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