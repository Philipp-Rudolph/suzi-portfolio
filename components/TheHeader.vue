<!-- components/TheHeader.vue -->
<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }">
    <div class="header-content">
      <div class="logo">
        <!-- Logo kann hier platziert werden -->
        <span class="logo-text">MM</span>
      </div>
      
      <nav class="nav-desktop">
        <ul class="nav-list">
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#projects" class="nav-link">Projekte</a></li>
          <li><a href="#contact" class="nav-link">Kontakt</a></li>
        </ul>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span class="bar"/>
        <span class="bar"/>
        <span class="bar"/>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="nav-mobile" :class="{ 'open': mobileMenuOpen }">
      <ul class="mobile-nav-list">
        <li><a href="#about" class="mobile-nav-link" @click="closeMobileMenu">About</a></li>
        <li><a href="#projects" class="mobile-nav-link" @click="closeMobileMenu">Projekte</a></li>
        <li><a href="#contact" class="mobile-nav-link" @click="closeMobileMenu">Kontakt</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

// Scroll-Event-Listener für transparente Navigation
const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

// Mobile Menu Toggle
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  // Verhindere Scrollen, wenn das Mobile-Menü geöffnet ist
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Event-Listener beim Mounten hinzufügen
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Event-Listener beim Unmounten entfernen
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease;
  padding: 1.5rem 0;
}

.header-scrolled {
  background-color: rgba(18, 18, 18, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 1rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
}

.logo-text {
  color: #FF5722;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #FF5722;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #FF5722;
}

.nav-link:hover::after {
  width: 100%;
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px 0;
  background-color: white;
  transition: all 0.3s ease;
}

.nav-mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #121212;
  padding-top: 5rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 90;
}

.nav-mobile.open {
  transform: translateX(0);
}

.mobile-nav-list {
  list-style: none;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  display: block;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: #FF5722;
}

/* Media Queries für Responsive Design */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .nav-mobile {
    display: block;
  }
  
  /* Animation für Hamburger zu X */
  .mobile-menu-btn.active .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  
  .mobile-menu-btn.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-btn.active .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
}
</style>