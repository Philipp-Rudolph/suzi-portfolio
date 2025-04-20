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
          <h3 class="skills-title">Meine Fähigkeiten</h3>
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

<style scoped>
.about-section {
  padding: 6rem 0;
  background-color: #0d0d0d;
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
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
}

.image-decoration {
  position: absolute;
  top: 20px;
  right: -20px;
  width: 100%;
  height: 100%;
  border: 3px solid #FF5722;
  border-radius: 8px;
  z-index: -1;
}

.about-text {
  color: #f5f5f5;
}

/* Content Cards Styling */
.content-cards {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.content-card-heading {
  color: #FF5722;
  margin-bottom: 1rem;
}

.content-card h1 {
  font-size: 1.8rem;
}

.content-card h2 {
  font-size: 1.5rem;
}

.content-card-paragraph {
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.content-card-paragraph:last-child {
  margin-bottom: 0;
}

.about-skills {
  color: #f5f5f5;
  line-height: 1.7;
}

.skills-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.skill-icon {
  margin-bottom: 1rem;
}

.skill-name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #FF5722;
}

.skill-description {
  font-size: 0.9rem;
  color: #ccc;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    max-width: 300px;
    margin: 0 auto 2rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>