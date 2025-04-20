<!-- components/TheHeader.vue -->
<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }">
    <div class="header-content">
      <div class="logo">
        <!-- Logo kann hier platziert werden -->
        <span class="logo-text">Portfolio</span>
      </div>
      
      <nav class="nav-desktop">
        <ul class="nav-list">
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
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

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $z-index-navbar;
  transition: $transition;
  padding: $spacing-md 0;
}

.header-scrolled {
  background-color: rgba(18, 18, 18, 0.95);
  box-shadow: $box-shadow-md;
  padding: $spacing-sm 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: $max-width-lg;
  margin: 0 auto;
  padding: 0 $spacing-lg;
}

.logo {
  font-size: $font-size-xlarge;
  font-weight: $font-weight-bold;
}

.logo-text {
  color: $primary;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: $spacing-lg;
}

.nav-link {
  color: $text-light;
  text-decoration: none;
  font-size: $font-size-medium;
  font-weight: $font-weight-normal;
  padding: $spacing-xs;
  transition: $transition;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: calc($pixel-base * 2);
  bottom: 0;
  left: 0;
  background-color: $primary;
  transition: $transition;
}

.nav-link:hover {
  color: $primary;
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
  padding: $spacing-xs;
}

.bar {
  display: block;
  width: $pixel-xxl;
  height: $pixel-xs;
  margin: $pixel-xs 0;
  background-color: $text-light;
  transition: $transition;
}

.nav-mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: $background-dark;
  padding-top: $spacing-xxl;
  transform: translateX(100%);
  transition: $transition;
  z-index: $z-index-navbar;
}

.nav-mobile.open {
  transform: translateX(0);
}

.mobile-nav-list {
  list-style: none;
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.mobile-nav-link {
  color: $text-light;
  text-decoration: none;
  font-size: $spacing-md;
  font-weight: $font-weight-normal;
  display: block;
  padding: $spacing-xs 0;
  transition: $transition;
}

.mobile-nav-link:hover {
  color: $primary;
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