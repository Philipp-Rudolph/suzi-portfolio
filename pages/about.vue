<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
  layout: 'orange',
  layoutTransition: {
    name: 'slide-in'
  }

})
</script>
