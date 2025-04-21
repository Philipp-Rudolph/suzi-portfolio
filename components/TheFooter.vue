<!-- components/TheFooter.vue -->
<template>
  <footer ref="sectionRef" class="footer">
    <div class="container" data-js-animation>
      <div class="footer-content" data-js-animation>
        <div class="footer-logo">
          <span class="logo-text">SZ</span>
          <p class="tagline">Video Editor & Motion Designer</p>
        </div>
        
        <div class="footer-nav" data-js-animation>
          <ul class="footer-links">
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#skills" class="nav-link">Skills</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
            <li><a href="#faq" class="nav-link">FAQ</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom" data-js-animation>
        <p class="copyright">© {{ currentYear }} Simone Zuccala. All rights reserved.</p>
        <button class="back-to-top" @click="scrollToTop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          <span>back to top</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { animateSectionOnScroll } from '~/composables/animate.js';

const sectionRef = ref(null);

onMounted(() => {
  if (sectionRef.value) {
    animateSectionOnScroll(sectionRef.value, 300); // Adjust delay to your taste
  }
});

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear());

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: $background-darker;
  padding: $spacing-xl 0 $spacing-md;
  color: $text-muted;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-xl;
  flex-wrap: wrap;
  gap: $spacing-lg;
}

.footer-logo .logo-text {
  font-size: $font-size-xlarge;
  font-weight: $font-weight-bold;
  color: $primary;
}

.tagline {
  margin-top: $spacing-xs;
  font-size: $font-size-small;
  color: $text-darken;
}

.footer-links {
  list-style: none;
  display: flex;
  gap: $spacing-lg;
}

.footer-links a {
  color: $text-muted;
  text-decoration: none;
  transition: $transition;
}

.footer-links a:hover {
  color: $primary;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: $spacing-md;
  border-top: $pixel-base solid $border-color;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.copyright {
  font-size: $font-size-small;
  color: $text-darken;
}

.back-to-top {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  background: none;
  border: none;
  color: $text-muted;
  cursor: pointer;
  transition: $transition;
}

.back-to-top:hover {
  color: $primary;
}

/* Responsive */
@media (max-width: $breakpoint-sm) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $spacing-lg;
  }
  
  .footer-links {
    margin-top: $spacing-sm;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>