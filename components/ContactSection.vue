<!-- components/ContactSection.vue -->
<template>
  <section id="contact" ref="sectionRef" class="contact-section section">
    <div class="container" data-js-animation>
      <h2 data-js-animation-title class="section-title">{{ contact.title }}</h2>
      
      <div class="contact-content" data-js-animation>
        <div class="contact-info">
          <h3>{{ contact.meta.heading }}</h3>
          <p class="contact-text">
            {{ contact.meta.intro }}
          </p>
          
          <div class="contact-details" data-js-animation>
            <div class="contact-item">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="contact-text">
                <span>Telefon</span>
                <a :href="`tel:${contact.meta.phone}`">{{ contact.meta.phone }}</a>
              </div>
            </div>
            
            <div class="contact-item" data-js-animation>
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="contact-text">
                <span>E-Mail</span>
                <a :href="`mailto:${contact.meta.email}`">{{ contact.meta.email }}</a>
              </div>
            </div>
            
            <div class="contact-item" data-js-animation>
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FF5722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="contact-text">
                <span>Standort</span>
                <p>{{ contact.meta.location }}</p>
              </div>
            </div>
          </div>
          
          <div class="social-links" data-js-animation>
            <a 
              v-for="social in contact.meta.social" 
              :key="social.name"
              :href="social.url" 
              class="social-link" 
              :aria-label="`Besuche mein ${social.name}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="getSocialIcon(social.icon)" />
            </a>
          </div>
        </div>
        
        <div class="contact-form-container" data-js-animation>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                id="name" 
                v-model="formData.name" 
                type="text" 
                placeholder="Dein Name"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input 
                id="email" 
                v-model="formData.email" 
                type="email" 
                placeholder="Deine E-Mail-Adresse"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Betreff</label>
              <input 
                id="subject" 
                v-model="formData.subject" 
                type="text" 
                placeholder="Worum geht es?"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="message">Nachricht</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                placeholder="Deine Nachricht"
                rows="5"
                required
              />
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">{{ contact.meta.submittingButton || 'Senden...' }}</span>
              <span v-else>{{ contact.meta.submitButton || 'Nachricht senden' }}</span>
            </button>
            
            <div v-if="submitStatus" :class="['status-message', submitStatus.type]">
              {{ submitStatus.message }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// imports
import { animateSectionOnScroll } from '~/composables/animate.js';
import { getSocialIcon } from '~/composables/getSocialIcons.ts';
import { onMounted, ref } from 'vue';

// composables
const { data: contact } = await useCollectionData('contact');

const sectionRef = ref(null);

// mounted
onMounted(() => {
  if (sectionRef.value) {
    animateSectionOnScroll(sectionRef.value, 300); // Adjust delay to your taste
  }
});

// Form data
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref(null);

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;
  
  try {
    // Hier würde die tatsächliche API-Integration stattfinden
    // Zum Beispiel mit fetch oder axios
    
    // Simuliere API-Aufruf mit Timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Erfolgsfall
    submitStatus.value = {
      type: 'success',
      message: contact.value.meta.formSuccess || 'Deine Nachricht wurde erfolgreich gesendet! Ich melde mich in Kürze bei dir.'
    };
    
    // Formular zurücksetzen
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
  } catch (error) {
    // Fehlerfall
    console.error('Fehler beim Senden des Formulars:', error);
    submitStatus.value = {
      type: 'error',
      message: contact.value.meta.formError || 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.'
    };
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style scoped  lang="scss">
.contact-section {
  padding: $spacing-xxl 0;
  background-color: $background-dark;
  position: relative;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl;
}

.contact-info h3 {
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-md;
  color: $text-light;
}

.contact-text {
  margin-bottom: $spacing-xl;
  color: $text-muted;
  line-height: $line-height-base;
}

.contact-details {
  margin-bottom: $spacing-xl;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: $spacing-md;
}

.contact-icon {
  margin-right: $spacing-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc($pixel-xl * 2);
  height: calc($pixel-xl * 2);;
  background-color: $primary-translucent;
  border-radius: $border-radius-full%;
}

.contact-item .contact-text {
  margin-bottom: 0;
}

.contact-item .contact-text span {
  display: block;
  font-size: $font-size-small;
  color: $text-darken;
  margin-bottom: $spacing-xs;
}

.contact-item .contact-text a,
.contact-item .contact-text p {
  color: white;
  text-decoration: none;
  font-size: $font-size-medium;
  margin: 0;
}

.contact-item .contact-text a:hover {
  color: $primary;
}

.social-links {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc($pixel-xl * 2);  
  height: calc($pixel-xl * 2);  
  background-color: $background-lighter;
  border-radius: $border-radius-full;
  color: $text-light;
  transition: $transition;
}

.social-link:hover {
  background-color: $primary;
  transform: translateY(-3px);
}

/* Contact Form Styling */
.contact-form-container {
  background-color: #1a1a1a;
  padding: $spacing-lg;
  border-radius: $border-radius-md;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: $spacing-xs;
  color: #ccc;
  font-size: $font-size-small;
}

.form-group input,
.form-group textarea {
  padding: $spacing-sm;
  background-color: $text-dark;
  border: $pixel-base solid $border-color;
  border-radius: $border-radius-sm;
  color: $text-light;
  font-size: $spacing-sm;
  transition: $transition;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: $primary;
}

.submit-btn {
  background-color: $primary;
  color: $text-light;
  padding: $spacing-sm;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $spacing-sm;
  font-weight: $font-weight-bold;
  cursor: pointer;
  transition: $transition;
}

.submit-btn:hover {
  background-color: $primary-light;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: $border-color;
  cursor: not-allowed;
  transform: none;
}

.status-message {
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-small;
  text-align: center;
}

.status-message.success {
  background-color: $success;
  color: $success-strong;
  border: $pixel-base solid $success-light;
}

.status-message.error {
  background-color: $error-light;
  color: $error;
  border: $pixel-base solid $error-strong;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    margin-bottom: $spacing-lg; 
  }
}
</style>