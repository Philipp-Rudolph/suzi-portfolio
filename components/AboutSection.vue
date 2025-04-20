<!-- components/AboutSection.vue -->
<template>
  <section id="about" class="about-section">
    <div class="container">
      <h2 class="section-title">{{ about[0].title }}</h2>

      <div class="about-content">
        <div class="about-image">
          <div class="image-container">
            <img :src="about[0].meta.image" alt="Profilbild" class="profile-placeholder">
            <!-- Optionaler Effekt für mehr visuelles Interesse -->
            <div class="image-decoration" />
          </div>
        </div>
        
        <div class="about-text">
          <!-- About Text Content Cards -->
          <div class="content-cards">
            <div class="content-card" v-for="(group, groupIndex) in contentGroups" :key="groupIndex">
              <component 
                :is="group.heading.type" 
                :id="group.heading.props?.id" 
                class="content-card-heading"
              >
                {{ group.heading.content }}
              </component>
              <div v-for="(paragraph, pIndex) in group.paragraphs" :key="`p-${groupIndex}-${pIndex}`" class="content-card-paragraph">
                {{ paragraph.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about-skills">
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
  </section>
</template>

<script setup>
// Fetch About Content
const { data: about } = await useAsyncData('about', () => queryCollection('about').all());

// fetch skills from about data where files are called about-skill-<id>.md
const { data: skillsData } = await useAsyncData('skills', () => queryCollection('aboutSkills').all());

const aboutData = about.value ? about.value.map(entry => entry) : [];

// Map skills data to a more usable format
const skillData = skillsData.value ? skillsData.value.map(skill => ({
  name: skill.title,
  description: skill.description,
  icon: skill.meta.icon
})) : [];

// // Process the array into groups with headings and paragraphs
const processContentArray = (arr) => {
  if (typeof arr !== 'object' || !Array.isArray(arr)) {
    return [];
  }
  
  const groups = [];
  let currentGroup = null;

  for (const item of arr) {
    const [type, props, content] = item;
    
    // If this is a heading, start a new group
    if (type.startsWith('h')) {
      currentGroup = {
        heading: { type, props, content },
        paragraphs: []
      };
      groups.push(currentGroup);
    } 
    // If this is a paragraph, add to the current group
    else if (type === 'p' && currentGroup) {
      currentGroup.paragraphs.push({ type, props, content });
    }
  }

  return groups;
};

const contentGroups = processContentArray(aboutData[0].body.value);
</script>

<style lang="scss" scoped>
.about-section {
  padding: $spacing-xxl 0;
  background-color: $background-darker;
}

.container {
  max-width: $breakpoint-lg;
  margin: 0 auto;
  padding: 0 $spacing-lg;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 3rem;
}

.about-image {
  position: relative;
  height: 100%;
  max-width: $max-width-xs;
  border-radius: $border-radius-md;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; 
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  transition: all 0.5s ease;
  filter: grayscale(1) brightness(0.8);
  object-fit: cover;
  background-color: $background-lighter;
  border-radius: $border-radius-md;
}

.profile-placeholder:hover {
  background-color: $primary;
  transform: scale(1.05);
  filter: grayscale(0);
 }

.image-decoration {
  position: absolute;
  top: $pixel-xl;
  right: -$pixel-xl;
  width: 100%;
  height: 100%;
  border: calc($pixel-xs - 1px) solid $primary;
  border-radius: $border-radius-md;
  z-index: $z-index-background;
}

.about-text {
  color: $text-darker;
}

/* Content Cards Styling */
.content-cards {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.content-card {
  background-color: #1a1a1a;
  border-radius: $border-radius-md;
  padding: $spacing-md;
  box-shadow: $box-shadow;
  transition: transform $transition-speed $transition-function, box-shadow $transition-speed $transition-function;
}

.content-card:hover {
  transform: translateY(calc(-1 * $pixel-xs - 1px));
  box-shadow: $box-shadow-lg;
}

.content-card-heading {
  color: $primary;
  margin-bottom: $spacing-sm;
}

.content-card h1 {
  font-size: $font-size-large;
}

.content-card h2 {
  font-size: $font-size-medium;
}

.content-card-paragraph {
  color: $text-muted;
  line-height: $line-height-base;
  margin-bottom: $spacing-sm;
}

.content-card-paragraph:last-child {
  margin-bottom: 0;
}

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

/* Responsive */
@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    max-width: $max-width-xxs;
    margin: 0 auto $spacing-lg;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>