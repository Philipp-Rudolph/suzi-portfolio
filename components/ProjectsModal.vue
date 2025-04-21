<template>
  <div v-if="project" class="project-modal" :class="{ open: isOpen }">
    <div class="modal-content">
      <button class="close-modal" @click="$emit('close')">×</button>
      <div class="modal-header">
        <h3>{{ project.title }}</h3>
      </div>
      <div class="modal-body">
        <VideoPlayer v-if="project.meta.videoUrl" :src="project.meta.videoUrl" />
        <div class="project-details">
          <div class="project-meta">
              <div class="meta-item">
                <strong>Kunde:</strong> {{ project.meta.client }}
              </div>
              <div class="meta-item">
                <strong>Jahr:</strong> {{ project.meta.year }}
              </div>
              <div class="meta-item">
                <strong>Kategorie:</strong> {{ project.meta.category }}
              </div>
            </div>
            <div class="project-tags">
              <span v-for="tag in project.meta.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          <div class="project-info">
            <p
              v-for="(paragraph, index) in videoDescription"
              :key="index"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';

interface Project {
  title: string;
  description: string;
  meta: {
    videoUrl?: string;
    client: string;
    year: string;
    category: string;
    tags: string[];
  };
  body?: { value: [string, unknown, string][] };
}

const props = defineProps<{
  project: Project | null;
  isOpen: boolean;
}>();

const _emit = defineEmits(['close']);

const videoDescription = computed(() => {
  const blocks = props.project?.body?.value ?? [];
  return blocks
    .filter((block: [string, unknown, string]) => block[0] === 'p')
    .map((block: [string, unknown, string]) => block[2])
    .join('\n\n')
    .split('\n\n');
});

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }
);

onUnmounted(() => {
  document.body.classList.remove('modal-open');
});
</script>

<style scoped lang="scss">
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
  width: 100%;
  max-width: $max-width-md;
  height: auto; /* Dynamische Höhe */
  max-height: 90vh; /* Maximalhöhe des Modals auf 90% der Bildschirmhöhe */
  background-color: $background-lighter;
  border-radius: $border-radius-md;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: scale(0.95);
  transition: $transition;
  padding: 0; /* Entfernt extra Abstand */
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
  flex: 1 1 auto; /* Flexbox sorgt dafür, dass der Body automatisch die verfügbare Höhe einnimmt */
  overflow-y: auto;
  max-height: 70vh; // wichtig: damit modal nicht überläuft
  padding: $spacing-md;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.modal-body > .video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: $spacing-md;
  flex-shrink: 0; // Verhindert, dass es zusammenschrumpft
}

.project-details {
  margin-top: $spacing-lg;
  flex-grow: 1; /* Details nehmen den verbleibenden Platz ein */
  color: $text-muted;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.project-description {
  max-width: $max-width-sm;
  margin-bottom: $spacing-md;
  line-height: $line-height-base;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  color: $text-muted;
  text-align: left;
  padding: $spacing-md;
  border-radius: $border-radius-sm;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: $transition;

  &:hover {
    background-color: $background-dark;
    color: $text-light;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  padding: $spacing-sm;
  background-color: $background-darker;
  border-radius: $border-radius-sm;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-xs 0;
  border-bottom: $pixel-base solid $border-color;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: $text-light;
    font-weight: $font-weight-bold;
  }
}

.meta-item {
  padding: $spacing-xs 0;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
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
  .modal-content {
    width: 95%;
  }
}
</style>