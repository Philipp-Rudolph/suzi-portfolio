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
          <li><a href="#skills" class="nav-link">Skills</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
          <li><a href="#faq" class="nav-link">FAQ</a></li>
        </ul>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn burger" :class="{ active: mobileMenuOpen }" @click="toggleMobileMenu">
        <div class="burger-icon">
          <span class="bar"/>
          <span class="bar"/>
          <span class="bar"/>
        </div>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="nav-mobile" :class="{ 'open': mobileMenuOpen }">
      <div class="mobile-menu-content">
        <div class="logo">
          <span class="logo-text">Portfolio</span>
        </div>
        <p class="mobile-menu-description">by Simone Zuccala</p>
      </div>
      <div class="mobile-menu-divider"/>
      <ul class="mobile-nav-list">
        <li><a href="#about" class="mobile-nav-link" @click="closeMobileMenu">About</a></li>
        <li><a href="#skills" class="mobile-nav-link" @click="closeMobileMenu">Skills</a></li>
        <li><a href="#projects" class="mobile-nav-link" @click="closeMobileMenu">Projects</a></li>
        <li><a href="#contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</a></li>
        <li><a href="#faq" class="mobile-nav-link" @click="closeMobileMenu">FAQ</a></li>
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

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  z-index: $z-index-dropdown;

  .burger-icon {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bar {
    display: block;
    width: 100%;
    height: 2.5px;
    background-color: $text-light;
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    position: absolute;
  }

  .bar:nth-child(1) {
    top: 1px;
  }

  .bar:nth-child(2) {
    top: 8px;
  }

  .bar:nth-child(3) {
    top: 16px;
  }

  &.active .bar:nth-child(1) {
    transform: rotate(45deg);
  }

  &.active .bar:nth-child(2) {
    opacity: 0;
  }

  &.active .bar:nth-child(3) {
    transform: rotate(-45deg);
  }
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

.mobile-menu-divider {
  width: 100%;
  height: $pixel-base;
  background-color: $border-color;
  margin: $spacing-lg 0;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-lg;
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
  
  .mobile-menu-btn.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

  .mobile-menu-btn.active .bar:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn.active .bar:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

}
</style>