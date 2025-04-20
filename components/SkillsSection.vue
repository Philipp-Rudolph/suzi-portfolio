<template>
  <div class="about-skills section">
    <div class="container">
      <div class="skills">
        <h3 class="section-title">Meine Fähigkeiten</h3>
        <div class="skills-grid">
          <div v-for="(skill, index) in skillData" :key="index" class="skill-item">
            <img class="skill-icon" :src="skill.icon">
            <h4 class="skill-name">{{ skill.name }}</h4>
            <p class="skill-description">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// fetch skills from about data where files are called about-skill-<id>.md
const { data: skillsData } = await useAsyncData('skills', () => queryCollection('aboutSkills').all());

// Map skills data to a more usable format
const skillData = skillsData.value ? skillsData.value.map(skill => ({
  name: skill.title,
  description: skill.description,
  icon: skill.meta.icon
})) : [];

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
  transform: translateY(calc(-1 * $pixel-xs - 1px));
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