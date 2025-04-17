<!-- components/TheFooter.vue -->
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <span class="logo-text">MM</span>
          <p class="tagline">Video Editor & Motion Designer</p>
        </div>
        
        <div class="footer-nav">
          <ul class="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projekte</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">© {{ currentYear }} Max Mustermann. Alle Rechte vorbehalten.</p>
        <button class="back-to-top" @click="scrollToTop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          <span>Nach oben</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

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

<style scoped>
.footer {
  background-color: #0d0d0d;
  padding: 3rem 0 1.5rem;
  color: #ccc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo .logo-text {
  font-size: 2rem;
  font-weight: 700;
  color: #FF5722;
}

.tagline {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #999;
}

.footer-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #FF5722;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #222;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.9rem;
  color: #777;
}

.back-to-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-to-top:hover {
  color: #FF5722;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
  }
  
  .footer-links {
    margin-top: 1rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>