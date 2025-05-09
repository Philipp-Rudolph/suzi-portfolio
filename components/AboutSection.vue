<!-- components/AboutSection.vue -->
<template>
  <section id="about" ref="sectionRef" class="about-section section">
    <div class="container" data-js-animation>
      <h2 data-js-animation-title class="section-title">{{ aboutData.title }}</h2>

      <div class="about-content" data-js-animation>
        <div class="about-image">
          <div class="image-container">
            <img :src="aboutData.meta.image" alt="Profilbild" class="profile-placeholder">
            <div class="image-decoration" />
          </div>
        </div>
        
        <div class="about-text">
          <div class="content-cards">
            <div
              v-for="(card, index) in aboutCards"
              :key="index"
              class="content-card"
              data-js-animation
            > 
              <h3 class="content-card-heading">{{ card.headline }}</h3>
              <p class="content-card-paragraph">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// imports
import { animateSectionOnScroll } from '~/composables/animate.js';
import { onMounted, ref } from 'vue';

// composables
const { data: aboutData } = await useCollectionData('about');

const sectionRef = ref(null);

// cards
const aboutCards = computed(() => {
  const body = aboutData.value.body.value;
  const cards = [];

  for (let i = 0; i < body.length; i++) {
    const block = body[i];
    const next = body[i + 1];

    if ((block[0] === 'h1' || block[0] === 'h2') && next && next[0] === 'p') {
      cards.push({
        headline: block[2],
        text: next[2],
      });
      i++; // Skip the paragraph in next loop
    }
  }

  return cards;
});

// mounted hook
onMounted(() => {
  if (sectionRef.value) {
    animateSectionOnScroll(sectionRef.value, 300); // Adjust delay to your taste
  }
});

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
  transform: translateY(calc(-1 * $pixel-xs - 1px)) !important;
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

/* Responsive */
@media (max-width: $breakpoint-sm) {
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