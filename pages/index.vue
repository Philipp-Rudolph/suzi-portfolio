
<!-- pages/index.vue -->
<template>
  <div class="portfolio">
    <!-- Header -->
    <TheHeader />

    <!-- Hero Section mit Animation -->
    <HeroSection />
    
    <!-- About Section -->
    <AboutSection id="about" />
    
    <!-- Skills Section -->
    <SkillsSection id="skills" />
    
    <!-- Projects & Videos Section -->
    <ProjectsSection id="projects" />
    
    <!-- Contact Section -->
    <ContactSection id="contact" />

    <!-- FAQ Section -->
    <FaqSection id="faq" />

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
// Komponenten werden automatisch importiert dank Nuxt.js
</script>

<style lang="scss">
.portfolio {
  scroll-behavior: smooth;
  background-color: $background-dark;
  color: $text-light;
}
</style>