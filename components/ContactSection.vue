<!-- components/ContactSection.vue -->
<template>
  <section id="contact" class="contact-section section">
    <div class="container">
      <h2 class="section-title">{{ contact.title }}</h2>
      
      <div class="contact-content">
        <div class="contact-info">
          <h3>{{ contact.meta.heading }}</h3>
          <p class="contact-text">
            {{ contact.meta.intro }}
          </p>
          
          <div class="contact-details">
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
            
            <div class="contact-item">
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
            
            <div class="contact-item">
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
          
          <div class="social-links">
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
        
        <div class="contact-form-container">
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

      <!-- FAQ-Sektion im bestehenden ContactSection.vue -->
    <!-- FAQ-Sektion mit korrigierter Accordion-Logik -->
    <div class="faq-section">
      <template v-if="contact.body && Array.isArray(contact.body.value)">
        <div class="faq-content">
          <template v-for="(item, index) in groupedFaqItems" :key="index">
            <div class="faq-group">
              <h2 v-if="item.title" class="faq-group-title">{{ item.title }}</h2>
              
              <!-- FAQ Fragen mit Accordion-Funktionalität -->
              <div v-for="(qa, qaIndex) in item.questions" :key="qaIndex" class="faq-item">
                <h3 
                  class="faq-question" 
                  :class="{ 'active': openQuestions[qa.id] }"
                  @click="toggleQuestion(qa.id)"
                >
                  {{ qa.question }}
                  <span class="faq-toggle">{{ openQuestions[qa.id] ? '−' : '+' }}</span>
                </h3>
                <div 
                  class="faq-answer"
                  :class="{ 'active': openQuestions[qa.id] }"
                >
                  <p v-for="(paragraph, pIndex) in qa.answers" :key="pIndex">
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>

    </div>
  </section>
</template>

<script setup>

// Fetch contact data from Nuxt Content
const { data: contactData } = await useAsyncData('contact', () =>
  queryCollection('contact').all()
);

// Einfacherer Zugriff auf die Kontaktdaten
const contact = computed(() => {
  if (!contactData.value || contactData.value.length === 0) {
    return {
      title: 'Kontaktiere mich',
      meta: {
        heading: 'Lass uns über dein Projekt sprechen',
        intro: 'Hast du ein spannendes Projekt, bei dem ich dir helfen kann? Ich freue mich auf deine Nachricht und antworte schnellstmöglich.',
        phone: '+49 123 456 7890',
        email: 'kontakt@example.com',
        location: 'Berlin, Deutschland',
        social: []
      }
    };
  }
  
  return contactData.value[0];
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

// Funktion zum Rendern der Social Media Icons
const getSocialIcon = (iconName) => {
  // Hier könntest du eine vollständige Icon-Bibliothek implementieren
  // Für dieses Beispiel verwenden wir nur eine einfache Switch-Anweisung
  
  // Social Media Icons als Komponenten (vereinfacht)
  const icons = {
    instagram: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }),
          h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
          h('line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5' })
        ]);
      }
    },
    vimeo: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('path', { d: 'M23 6.66C22.91 5.92 22.51 5.01 21.81 4.31C21.11 3.61 20.21 3.2 19.46 3.1C16.79 2.73 12 2.73 12 2.73C12 2.73 7.21 2.73 4.54 3.1C3.79 3.2 2.89 3.61 2.19 4.31C1.49 5.01 1.09 5.92 1 6.66C0.75 8.3 0.75 11.7 0.75 11.7C0.75 11.7 0.75 15.1 1 16.74C1.09 17.48 1.49 18.39 2.19 19.09C2.89 19.79 3.79 20.2 4.54 20.3C7.21 20.67 12 20.67 12 20.67C12 20.67 16.79 20.67 19.46 20.3C20.21 20.2 21.11 19.79 21.81 19.09C22.51 18.39 22.91 17.48 23 16.74C23.25 15.1 23.25 11.7 23.25 11.7C23.25 11.7 23.25 8.3 23 6.66Z' }),
          h('polygon', { points: '9.75 15.27 15.75 11.7 9.75 8.13 9.75 15.27' })
        ]);
      }
    },
    behance: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('path', { d: 'M22 7h-7v10h7V7zm-7-4H3v18h12V3zm-4 10H7V9.5h4V13z' })
        ]);
      }
    },
    linkedin: {
      render() {
        return h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        }, [
          h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
          h('rect', { x: '2', y: '9', width: '4', height: '12' }),
          h('circle', { cx: '4', cy: '4', r: '2' })
        ]);
      }
    }
  };
  
  return icons[iconName] || null;
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