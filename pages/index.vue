<!-- <script setup lang="ts">
// const runtimeConfig = useRuntimeConfig()
// const appConfig = useAppConfig()

definePageMeta({
  layout: 'orange'
})

const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
  meta: [
    { property: 'og:title', content: home.value?.title },
    { property: 'og:description', content: home.value?.description }
  ]
})
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </div>
</template> -->


<!-- pages/index.vue -->
<template>
  <div class="portfolio">
    <!-- Hero Section mit Animation -->
    <HeroSection />
    
    <!-- About Section -->
    <AboutSection id="about" />
    
    <!-- Projects & Videos Section -->
    <ProjectsSection id="projects" />
    
    <!-- Contact Section -->
    <ContactSection id="contact" />
  </div>
</template>

<script setup>
// Komponenten werden automatisch importiert dank Nuxt.js
</script>

<style>
.portfolio {
  /* Das Container-Styling sorgt für einheitliche Abstände */
  scroll-behavior: smooth;
  background-color: #121212;
  color: #FFFFFF;
}
</style>