<template>
  <div ref="sectionRef" class="about-skills section">
    <div class="container" data-js-animation>
      <div class="skills">
        <h3 data-js-animation-title class="section-title">My Skills</h3>
        <div class="skills-grid">
          <div v-for="(skill, index) in skillData" :key="index" class="skill-item" data-js-animation>
            <img class="skill-icon" :src="skill.meta.icon">
            <h4 class="skill-name">{{ skill.title }}</h4>
            <p class="skill-description">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { animateSectionOnScroll } from '~/composables/animate.js';
const { data: skillData } = await useCollectionData('skills');
const sectionRef = ref(null)

onMounted(() => {
  if (sectionRef.value) {
    animateSectionOnScroll(sectionRef.value, 300); // Adjust delay to your taste
  }
});


</script>

<style scoped lang="scss">
.about-skills {
  color: $text-darker;
  line-height: $line-height-base;
}

.skills-title {
  font-size: $font-size-large;
  margin-bottom: $spacing-md;
  color: $text-light;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc($pixel-xxl * 10), 1fr));
  gap: $spacing-md;
}

.skill-item {
  background-color: $background-lighter;
  padding: $spacing-md;
  border-radius: $border-radius-md;
  transition: transform $transition-speed $transition-function, box-shadow $transition-speed $transition-function;
}

.skill-item:hover {
  transform: translateY(calc(-1 * $pixel-xs - 1px)) !important;
  box-shadow: $box-shadow-hover;
}

.skill-icon {
  margin-bottom: $spacing-sm;
}

.skill-name {
  font-size: $font-size-medium;
  margin-bottom: $spacing-xs;
  color: $primary;
}

.skill-description {
  font-size: $font-size-small;
  color: $text-muted;
  line-height: $line-height-base;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>