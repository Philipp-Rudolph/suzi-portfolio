<!-- components/ContactSection.vue -->
<template>
  <section id="contact" class="contact-section">
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
import { ref, computed, h } from 'vue';

// Zustandsvariable für geöffnete Fragen
const openQuestions = ref({});

// Funktion zum Umschalten des Accordion-Status
const toggleQuestion = (id) => {
  openQuestions.value = {
    ...openQuestions.value,
    [id]: !openQuestions.value[id]
  };
};

// Gruppiere FAQ-Elemente in eine besser strukturierte Form
const groupedFaqItems = computed(() => {
  if (!contact.value?.body?.value || !Array.isArray(contact.value.body.value)) {
    return [];
  }

  const items = contact.value.body.value;
  const result = [];
  let currentGroup = null;
  let currentQuestion = null;

  // Durchlaufe alle Elemente und gruppiere sie
  for (const item of items) {
    if (!Array.isArray(item) || item.length < 3) continue;
    
    const [type, props, content] = item;
    
    // Haupttitel (h2) beginnt eine neue Gruppe
    if (type === 'h2') {
      currentGroup = { 
        title: content, 
        id: props.id || `group-${result.length}`,
        questions: [] 
      };
      result.push(currentGroup);
      currentQuestion = null;
    } 
    // Frage (h3) beginnt eine neue Frage-Antwort-Paar
    else if (type === 'h3' && currentGroup) {
      currentQuestion = {
        question: content,
        id: props.id || `question-${currentGroup.questions.length}`,
        answers: []
      };
      currentGroup.questions.push(currentQuestion);
    } 
    // Absatz (p) wird zur aktuellen Frage hinzugefügt
    else if (type === 'p' && currentQuestion) {
      currentQuestion.answers.push(content);
    }
    // Absatz (p) ohne vorherige Frage wird direkt zur Gruppe hinzugefügt
    else if (type === 'p' && currentGroup && !currentQuestion) {
      // Erstelle eine leere Frage, wenn nötig
      if (currentGroup.questions.length === 0) {
        currentQuestion = {
          question: "",
          id: `group-content-${currentGroup.id}`,
          answers: []
        };
        currentGroup.questions.push(currentQuestion);
      }
      currentGroup.questions[currentGroup.questions.length - 1].answers.push(content);
    }
  }

  return result;
});

// Fetch contact data from Nuxt Content
const { data: contactData } = await useAsyncData('contact', () =>
  queryCollection('contact').all()
);

// Debugging-Ausgabe
console.log('Contact Data:', contactData.value);

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

<style scoped>
.contact-section {
  padding: 6rem 0;
  background-color: #121212;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #FF5722;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
}

.contact-text {
  margin-bottom: 2rem;
  color: #ccc;
  line-height: 1.6;
}

.contact-details {
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.contact-icon {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 87, 34, 0.1);
  border-radius: 50%;
}

.contact-item .contact-text {
  margin-bottom: 0;
}

.contact-item .contact-text span {
  display: block;
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 0.3rem;
}

.contact-item .contact-text a,
.contact-item .contact-text p {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  margin: 0;
}

.contact-item .contact-text a:hover {
  color: #FF5722;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #1a1a1a;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #FF5722;
  transform: translateY(-3px);
}

.faq-section {
  margin-top: 3rem;
  padding: 2rem;
  background-color: #1a1a1a;
  border-radius: 8px;
}

.faq-group {
  margin-bottom: 2rem;
}

.faq-group-title {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
}

.faq-item {
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
}

.faq-question {
  font-size: 1.2rem;
  color: #FF5722;
  padding: 1rem 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: #FF8A65;
}

.faq-question.active {
  color: #FF8A65;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #FF5722;
  transition: transform 0.3s ease;
}

.faq-question.active .faq-toggle {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 1rem;
  opacity: 0;
}

.faq-answer.active {
  max-height: 500px; /* Anpassen je nach Bedarf */
  padding: 0 1rem 1rem;
  opacity: 1;
}

.faq-answer p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.faq-answer p:last-child {
  margin-bottom: 0;
}

/* Contact Form Styling */
.contact-form-container {
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 0.8rem 1rem;
  background-color: #242424;
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #FF5722;
}

.submit-btn {
  background-color: #FF5722;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-btn:hover {
  background-color: #FF8A65;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
  transform: none;
}

.status-message {
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
}

.status-message.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.status-message.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: #F44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

/* Responsive Styling */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    margin-bottom: 2rem;
  }
}
</style>