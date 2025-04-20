<!-- components/HeroSection.vue -->
<template>
  <section class="hero section">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="name">{{ heroData?.name || 'Max Mustermann' }}</span>
        <span class="profession">{{ heroData?.profession || 'Video Editor & Motion Designer' }}</span>
      </h1>
      <div class="hero-reel">
        <!-- Hier könnte ein kurzes Showreel oder eine Animation eingebunden werden -->
        <div class="reel-placeholder">
          <div class="animation-element"/>
        </div>
      </div>
      <div class="hero-cta">
        <a href="#projects" class="btn-primary">{{ heroData?.ctaPrimary || 'Meine Arbeiten' }}</a>
        <a href="#contact" class="btn-secondary">{{ heroData?.ctaSecondary || 'Kontakt' }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Methode 1: Direkter Zugriff mit findOne
const { data: hero } = await useAsyncData('hero', () => queryCollection('hero').all());
// Einfacherer Zugriff auf die Daten
const heroData = computed(() => {
  if (!hero.value) return null;
  
  return {
    name: hero.value[0].title || 'Max Mustermann',
    profession: hero.value[0].profession || 'Video Editor & Motion Designer',
    image: hero.value[0].image || hero.value[0]?.meta?.image,
    ctaPrimary: hero.value[0].ctaPrimary || 'Meine Arbeiten',
    ctaSecondary: hero.value[0].ctaSecondary || 'Kontakt'
  };
});

// Alternative Methode mit transformierter Datenabruf
/*
const { data: heroTransformed } = await useAsyncData('hero', async () => {
  const hero = await queryContent('hero').findOne();
  
  // Daten direkt transformieren
  return {
    name: hero?.title || 'Max Mustermann',
    profession: hero?.profession || 'Video Editor & Motion Designer',
    image: hero?.image || hero?.meta?.image,
    ctaPrimary: hero?.ctaPrimary || 'Meine Arbeiten',
    ctaSecondary: hero?.ctaSecondary || 'Kontakt'
  };
});
*/
</script>

<style scoped lang="scss">
.hero {
  height: 100dvh;
}
.hero-content {
  text-align: center;
  z-index: 2;
  max-width: $max-width-lg;
  padding: 0 $spacing-lg;
}
.hero-title {
  display: flex;
  flex-direction: column;
  margin-bottom: $spacing-lg;
}
.name {
  font-size: $font-size-max;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-sm; /* Updated margin-bottom for name */
}
.profession {
  font-size: $font-size-xlarge;
  color: $primary; /* Orange Akzentfarbe */
}
.hero-reel {
  margin: $spacing-xl 0;
}
.reel-placeholder {
  width: 100%;
  height: $max-width-xxs;
  background-color: $primary-translucent; /* Transparentes Orange */
  border-radius: $border-radius-md;
  position: relative;
  overflow: hidden;
}
.animation-element {
  position: absolute;
  width: calc($pixel-xl * 5);
  height: calc($pixel-xl * 5);
  background-color: $primary; 
  border-radius: $border-radius-full;
  top: $border-radius-full;
  left: 0;
  transform: translateY(-50%);
  animation: move 3s infinite ease-in-out;
}
@keyframes move {
  0% { left: 0; transform: translateY(-50%) scale(0.5); }
  50% { left: calc(100% - 100px); transform: translateY(-50%) scale(1); }
  100% { left: 0; transform: translateY(-50%) scale(0.5); }
}
.hero-cta {
  display: flex;
  gap: $spacing-sm;
  justify-content: center;
  margin-top: $spacing-lg;
}
.btn-primary, .btn-secondary {
  padding: $spacing-xs $spacing-md;
  border-radius: $border-radius-sm;
  font-weight: $font-weight-bold;
  text-decoration: none;
  transition: $transition;
}
.btn-primary {
  background-color: $primary;
  color: $text-light;
}
.btn-primary:hover {
  background-color: $primary-light;
  transform: translateY(-2px);
}
.btn-secondary {
  background-color: transparent;
  color: $text-light; 
  border: 2px solid $primary; 
}
.btn-secondary:hover {
  background-color: $primary-translucent;
  transform: translateY(-2px);
}
</style>