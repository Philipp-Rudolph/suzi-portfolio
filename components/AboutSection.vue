<!-- components/AboutSection.vue -->
<template>
  <section id="about" class="about-section">
    <div class="container">
      <h2 class="section-title">{{ about[0].title }}</h2>

      <!-- <pre><code>{{ about }}</code></pre> -->
      
      <div class="about-content">
        <div class="about-image">
          <div class="image-container">
            <!-- Hier kann ein Profilbild eingefügt werden -->
            <div class="profile-placeholder" />
            
            <!-- Optionaler Effekt für mehr visuelles Interesse -->
            <div class="image-decoration" />
          </div>
        </div>
        
        <div class="about-text">
          <ContentRenderer v-if="about" :value="about" />
          <p class="about-description">
            {{ about[0].description }}
          </p>

          <div class="skills">
            <h3 class="skills-title">Meine Fähigkeiten</h3>
            <div class="skills-grid">
              <div v-for="(skill, index) in skills" class="skill-item" :key="index">
                <div class="skill-icon" v-html="skill.icon" />
                <h4 class="skill-name">{{ skill.name }}</h4>
                <p class="skill-description">{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Skills Array mit Icons (du kannst diese anpassen)
const skills = [
  {
    name: 'Video Editing',
    description: 'Professionelle Bearbeitung von Filmmaterial mit Premire Pro & Final Cut.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'
  },
  {
    name: 'Motion Design',
    description: 'Kreative Animationen und visuelle Effekte mit After Effects.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"></path><path d="M5 10l7 7"></path><path d="M19 10l-7 7"></path></svg>'
  },
  {
    name: '3D Animation',
    description: 'Kreation von 3D-Modellen und Animationen mit Cinema 4D.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22l9-16H3l9 16z"></path><path d="M12 22V6"></path><path d="M3 6h18"></path></svg>'
  },
  {
    name: 'Color Grading',
    description: 'Professionelle Farbkorrektur und Grading für Film und Video.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20"></path><path d="M2 12h20"></path></svg>'
  }
];

// Fetch About Content
const { data: about } = await useAsyncData('about', () => queryCollection('about').all());
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
  align-items: center;
}

.about-image {
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  padding-bottom: 120%; /* Aspect Ratio */
}

.profile-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 115%;
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
  line-height: 1.7;
}

.about-text :deep(p) {
  margin-bottom: 1.5rem;
}

.skills {
  margin-top: 3rem;
}

.skills-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
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