<!-- components/HeroSection.vue -->
<template>
  <section ref="sectionRef" class="hero section">
    <!-- Background Video -->
    <div class="video-background">
      <video
        ref="videoRef"
        autoplay
        loop
        muted
        playsinline
        class="fullscreen-video"
      >
        <source :src="heroData?.backgroundVideo || '/videos/compressed_720p.mp4'" type="video/mp4" >
        Your browser does not support the video tag.
      </video>
      <div class="video-overlay" />
    </div>

    <!-- Particle background -->
    <div ref="particlesContainer" class="particles-container" />

    <!-- Glowing background shapes -->
    <div class="bg-shapes">
      <div class="shape shape-1" />
      <div class="shape shape-2" />
      <div class="shape shape-3" />
    </div>

    <div class="hero-content">
      <h1 class="hero-title">
        <span class="name animate-fade-in" :data-text="heroData?.name || 'Max Mustermann'">
          {{ heroData?.name || 'Max Mustermann' }}
        </span>
        <span class="profession animate-fade-in animate-delay-1">
          {{ heroData?.profession || 'Video Editor & Motion Designer' }}
        </span>
      </h1>

      <div class="hero-cta animate-fade-in animate-delay-3">
        <a href="#projects" class="btn-primary">
          {{ heroData?.ctaPrimary || 'Meine Arbeiten' }}
          <span class="btn-glow" />
        </a>
        <a href="#contact" class="btn-secondary">
          {{ heroData?.ctaSecondary || 'Kontakt' }}
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator animate-fade-in animate-delay-4">
      <div class="mouse">
        <div class="wheel" />
      </div>
      <div class="arrow" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const videoRef = ref(null);
const particlesContainer = ref(null);
let animationFrame = null;

// Load and style video on mount
function handleVideoLoaded() {
  if (videoRef.value) {
    videoRef.value.classList.add('video-loaded');
    videoRef.value.style.opacity = '1';
  }
}

onMounted(() => {
  initParticles();
  window.addEventListener('resize', handleResize);

  if (videoRef.value) {
    // fallback if already ready
    if (videoRef.value.readyState >= 3) {
      handleVideoLoaded();
    } else {
      videoRef.value.addEventListener('canplay', handleVideoLoaded);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (animationFrame) cancelAnimationFrame(animationFrame);

  if (videoRef.value) {
    videoRef.value.removeEventListener('canplay', handleVideoLoaded);
  }
});

// Fetch data (same logic)
const { data: hero } = await useAsyncData('hero', () => queryCollection('hero').all());

const heroData = computed(() => {
  if (!hero.value) return null;
  return {
    name: hero.value[0].title || 'Max Mustermann',
    profession: hero.value[0].profession || 'Video Editor & Motion Designer',
    image: hero.value[0].image || hero.value[0]?.meta?.image,
    backgroundVideo: hero.value[0]?.backgroundVideo || null,
    ctaPrimary: hero.value[0].ctaPrimary || 'Meine Arbeiten',
    ctaSecondary: hero.value[0].ctaSecondary || 'Kontakt'
  };
});

// Particles
function handleResize() {
  if (particlesContainer.value) {
    initParticles();
  }
}

function initParticles() {
  if (typeof window === 'undefined' || !particlesContainer.value) return;

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  particlesContainer.value.innerHTML = '';
  particlesContainer.value.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const numberOfParticles = Math.min(30, Math.floor(window.innerWidth / 30));

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.3 + 0.2
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      const p = particlesArray[i];

      ctx.fillStyle = `rgba(255, 135, 0, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    }

    animationFrame = requestAnimationFrame(animateParticles);
  }

  animateParticles();
}
</script>

<style scoped lang="scss">
.hero {
  height: 100dvh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

// Video background
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.fullscreen-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.video-loaded {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1); // Adjust darkness as needed
  z-index: 1;
}

// Animation classes for fade-in
.animate-fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s ease-in-out forwards;
}

.animate-delay-1 {
  animation-delay: 0.3s;
}

.animate-delay-2 {
  animation-delay: 0.6s;
}

.animate-delay-3 {
  animation-delay: 0.9s;
}

.animate-delay-4 {
  animation-delay: 1.5s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Particles background
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

// Background shapes
.bg-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15; // Reduced opacity with video
}

.shape-1 {
  width: 50vw;
  height: 50vw;
  background: radial-gradient($primary, transparent 70%);
  top: -15%;
  right: -15%;
  animation: float 15s infinite alternate ease-in-out;
}

.shape-2 {
  width: 30vw;
  height: 30vw;
  background: radial-gradient($primary-light, transparent 70%);
  bottom: -10%;
  left: -5%;
  animation: float 12s infinite alternate-reverse ease-in-out;
}

.shape-3 {
  width: 40vw;
  height: 40vw;
  background: radial-gradient($primary-dark, transparent 70%);
  top: 40%;
  left: 20%;
  animation: float 18s infinite alternate ease-in-out;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(5%, 5%); }
}

.hero-content {
  text-align: center;
  z-index: 3; // Above video and particle layers
  max-width: $max-width-lg;
  padding: 0 $spacing-lg;
  position: relative;
}

.hero-title {
  display: flex;
  flex-direction: column;
  margin-bottom: $spacing-lg;
}

.name {
  font-size: $font-size-max;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-sm;
  
  /* Approach 1: Enhanced gradient text with better visibility */
  color: $text-light; /* Fallback color */
  background: linear-gradient(90deg, blue, $primary, blue);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  
  /* Make it more visible */
  filter: drop-shadow(0 0 8px rgba($primary, 0.3));
  text-shadow: 0 0 2px rgba($primary, 0.1);
  
  /* Animation */
  animation: shine 5s linear infinite, fadeIn 1s ease-in-out forwards;
}

@keyframes shine {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.profession {
  font-size: $font-size-xlarge;
  color: $primary;
  text-shadow: 0 0 10px rgba($primary, 0.5);
}

// Enhanced reel
.hero-reel {
  margin: $spacing-xl 0;
}

.reel-container {
  position: relative;
}

.reel-placeholder {
  width: 100%;
  height: $max-width-xxs;
  background-color: rgba($primary-translucent, 0.2);
  border-radius: $border-radius-md;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba($primary, 0.3);
  box-shadow: 0 10px 30px rgba($primary-dark, 0.3);
  backdrop-filter: blur(5px); // Blur effect for content on top of video
  -webkit-backdrop-filter: blur(5px);
}

.reel-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: $border-radius-md;
  box-shadow: 0 0 50px rgba($primary, 0.5);
  opacity: 0.7;
  z-index: -1;
}

.animation-element {
  position: absolute;
  width: calc($pixel-xl * 5);
  height: calc($pixel-xl * 5);
  background: linear-gradient(135deg, $primary, $primary-light);
  border-radius: $border-radius-full;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation: moveElement 5s infinite ease-in-out;
  box-shadow: 0 0 30px rgba($primary, 0.8);
}

.animation-trail {
  position: absolute;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, transparent, $primary, transparent);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
  filter: blur(3px);
  animation: pulseTrail 5s infinite ease-in-out;
}

@keyframes moveElement {
  0% { 
    left: 0; 
    transform: translateY(-50%) scale(0.5); 
    background-position: 0% 50%;
  }
  50% { 
    left: calc(100% - 100px); 
    transform: translateY(-50%) scale(1); 
    background-position: 100% 50%;
  }
  100% { 
    left: 0; 
    transform: translateY(-50%) scale(0.5); 
    background-position: 0% 50%;
  }
}

@keyframes pulseTrail {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}

// Enhanced buttons
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
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(45deg, $primary-dark, $primary, $primary-light);
  background-size: 200% 200%;
  color: $text-light;
  border: none;
  animation: gradientMove 3s ease infinite;
  box-shadow: 0 5px 15px rgba($primary, 0.5);
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  animation: btnGlowEffect 3s infinite;
}

@keyframes btnGlowEffect {
  0% { transform: translateX(-100%); }
  20%, 100% { transform: translateX(100%); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.btn-primary:hover {
  background-position: right center;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba($primary, 0.7);
}

.btn-secondary {
  background-color: rgba(0, 0, 0, 0.3); // Semi-transparent background
  color: $text-light;
  border: 2px solid $primary;
  box-shadow: 0 0 15px rgba($primary, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.btn-secondary:hover {
  background-color: $primary-translucent;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba($primary, 0.4);
}

// Scroll indicator
.scroll-indicator {
  position: absolute;
  bottom: $spacing-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid rgba($text-light, 0.8);
  border-radius: 15px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background-color: $primary;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  animation: scroll 1.5s infinite;
}

.arrow {
  width: 10px;
  height: 10px;
  border-right: 2px solid $primary;
  border-bottom: 2px solid $primary;
  transform: rotate(45deg);
  margin-top: $spacing-xs;
  animation: fadeInOut 1.5s infinite;
}

@keyframes scroll {
  0% { top: 8px; opacity: 1; }
  100% { top: 25px; opacity: 0; }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

// Media queries for responsiveness
@media (max-width: 768px) {
  .name {
    font-size: calc($font-size-max * 0.7);
  }
  
  .profession {
    font-size: calc($font-size-xlarge * 0.8);
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 80%;
    margin-bottom: $spacing-xs;
  }
  
  .shape-1, .shape-2, .shape-3 {
    opacity: 0.1;
  }
}
</style>