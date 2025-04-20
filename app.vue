<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// SEO und Meta-Tags
useHead({
  titleTemplate: '%s - Video Editor & Motion Designer',
  meta: [
    { name: 'description', content: 'Portfolio für Video Editing und Motion Design mit kreativem Storytelling und visuellen Effekten.' },
    { name: 'keywords', content: 'video editing, motion design, animation, visual effects, portfolio' },
    { name: 'author', content: 'Simone Zuccala' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
  ],
  bodyAttrs: {
    class: 'portfolio-body'
  }
})

// Open Graph und Twitter Meta-Tags für Social Media Sharing
useSeoMeta({
  title: 'Simone Zuccala - Video Editor & Motion Designer',
  ogTitle: 'Simone Zuccala - Creative Visual Storytelling',
  description: 'Portfolio für Video Editing und Motion Design mit kreativem Storytelling und visuellen Effekten.',
  ogDescription: 'Kreative Videos und Motion Design für dein nächstes Projekt. Überzeuge mit professionellen visuellen Geschichten.',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://simone-portfolio.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Simone Zuccala - Video Editor & Motion Designer',
  twitterDescription: 'Kreative Videos und Motion Design für dein nächstes Projekt.',
  twitterImage: '/twitter-image.jpg'
})
</script>

<style lang="scss">
// Animation für Seitenübergänge
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
  transform: translateY(10px);
}

// Layout-Animationen
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

// Globale Styles, die spezifisch für die App sind und nicht in main.scss gehören
html {
  scroll-behavior: smooth; // Für sanftes Scrollen zu Ankern
  scrollbar-width: thin;
  scrollbar-color: $primary; // Verwende hier $primary anstelle von $primary-color
}

// Custom Scrollbar für Webkit-Browser
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: $background-dark; // Verwende hier $background-dark anstelle von $background-darker
}

::-webkit-scrollbar-thumb {
  background-color: $primary; // Verwende hier $primary anstelle von $primary-color
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: $primary-light; // Stelle sicher, dass diese Variable in _colors.scss oder _variables.scss definiert ist
}

// Scroll Reveal Klassen für Animationen beim Scrollen
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

// Selection Styling
::selection {
  background-color: rgba($primary, 0.7); // Verwende hier $primary anstelle von $primary-color
  color: white;
}

// Verbessertes Box-Sizing
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

// Verbesserte Grundstile für Formularelemente
button, input, select, textarea, a {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  // remove outline
  outline: none;
  border: none;
}
</style>