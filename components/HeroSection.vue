<!-- components/HeroSection.vue -->
<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="name">Max Mustermann</span>
        <span class="profession">Video Editor & Motion Designer</span>
      </h1>
      <div class="hero-reel">
        <!-- Hier könnte ein kurzes Showreel oder eine Animation eingebunden werden -->
        <div class="reel-placeholder">
          <div class="animation-element"/>
        </div>
      </div>
      <div class="hero-cta">
        <a href="#projects" class="btn-primary">Meine Arbeiten</a>
        <a href="#contact" class="btn-secondary">Kontakt</a>
      </div>
    </div>
    <TheHeader />
  </section>
</template>

<script setup>
// Hier könnten reactive Eigenschaften oder Methoden definiert werden
</script>

<style scoped>
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 1200px;
  padding: 0 2rem;
}

.hero-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.name {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.profession {
  font-size: 1.8rem;
  color: #FF5722; /* Orange Akzentfarbe */
}

.hero-reel {
  margin: 3rem 0;
}

.reel-placeholder {
  width: 100%;
  height: 300px;
  background-color: rgba(255, 87, 34, 0.1); /* Transparentes Orange */
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.animation-element {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #FF5722;
  border-radius: 50%;
  top: 50%;
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
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #FF5722;
  color: white;
}

.btn-primary:hover {
  background-color: #FF8A65;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid #FF5722;
}

.btn-secondary:hover {
  background-color: rgba(255, 87, 34, 0.1);
  transform: translateY(-2px);
}
</style>