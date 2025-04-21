<!-- components/ProjectCard.vue -->
<template>
  <div class="project-card" @click="$emit('click')">
    <div class="project-thumbnail" :style="{ backgroundImage: `url(${project.meta.thumbnail})` }">
      <div class="project-overlay">
        <div class="project-category">{{ project.meta.category }}</div>
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

<style scoped lang="scss">
.project-card {
  background-color: $background-lighter;
  border-radius: $border-radius-md;
  overflow: hidden;
  cursor: pointer;
  transition: $transition;
}

.project-card:hover {
  transform: translateY(-$pixel-xs) !important;
  box-shadow: $box-shadow-lg;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-thumbnail {
  height: calc($pixel-xl * 10);
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
  transition: $transition;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: $spacing-md;
}

.project-category {
  background-color: $primary;
  color: $text-light;
  padding: $spacing-xs $spacing-sm;  
  border-radius: $border-radius-sm;
  font-size: $font-size-small;
  align-self: flex-start;
}

.project-actions {
  display: flex;
  justify-content: center;
  width: 100%;
}

.action-btn {
  width: calc($pixel-xl * 2.5);
  height: calc($pixel-xl * 2.5);
  border-radius: $border-radius-full;
  background-color: $white-translucent;
  border: calc($pixel-xs / 2) solid $text-light;
  color: $text-light;  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: $transition;
}

.action-btn:hover {
  background-color: $primary;
  border-color: $primary;
  transform: scale(1.1);
}

.play-icon {
  margin-left: $pixel-xs;
}

.project-info {
  padding: $spacing-sm;
}

.project-title {
  margin: 0 0 $spacing-xs 0;
  font-size: $font-size-medium;
  color: $text-light;
}

.project-client {
  margin: 0;
  font-size: $font-size-small;
  color: $text-muted;
}
</style>