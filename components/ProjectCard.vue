<!-- components/ProjectCard.vue -->
<template>
  <!-- <pre><code>{{ project }}</code></pre> -->
  <div class="project-card" @click="$emit('click')">
    <div class="project-thumbnail" :style="{ backgroundImage: `url(${project.meta.thumbnail})` }">
      <div class="project-overlay">
        <div class="project-category">{{ project.category }}</div>
        <div class="project-actions">
          <button class="action-btn">
            <span class="play-icon">▶</span>
          </button>
        </div>
      </div>
    </div>
    <div class="project-info">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-client">{{ project.client }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.project-card {
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-thumbnail {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.project-category {
  background-color: #FF5722;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  align-self: flex-start;
}

.project-actions {
  display: flex;
  justify-content: center;
  width: 100%;
}

.action-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #FF5722;
  border-color: #FF5722;
  transform: scale(1.1);
}

.play-icon {
  margin-left: 4px;
}

.project-info {
  padding: 1rem;
}

.project-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: white;
}

.project-client {
  margin: 0;
  font-size: 0.9rem;
  color: #aaa;
}
</style>