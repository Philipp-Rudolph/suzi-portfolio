<template>
  <div ref="sectionRef" class="faq-section section">
    <div class="container" data-js-animation>
      <template v-if="faq.body && Array.isArray(faq.body.value)">
        <div class="faq-content">
          <template v-for="(item, index) in groupedFaqItems" :key="index">
            <div class="faq-group" data-js-animation>
              <h2 data-js-animation-title v-if="item.title" class="faq-group-title section-title">{{ item.title }}</h2>
              
              <!-- FAQ Fragen mit Accordion-Funktionalität -->
              <div v-for="(qa, qaIndex) in item.questions" :key="qaIndex" class="faq-item" data-js-animation>
                <h3 
                  class="faq-question" 
                  :class="{ 'active': openQuestions[qa.id] }"
                  @click="toggleQuestion(qa.id)"
                >
                  {{ qa.question }}
                  <span class="faq-toggle">{{ openQuestions[qa.id] ? '−' : '+' }}</span>
                </h3>
                <transition name="faq-transition" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                  <div v-if="openQuestions[qa.id]" class="faq-answer">
                    <p v-for="(paragraph, pIndex) in qa.answers" :key="pIndex">
                      {{ paragraph }}
                    </p>
                  </div>
                </transition>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
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


// Zustandsvariable für geöffnete Fragen
const openQuestions = ref({});

// Funktion zum Umschalten des Accordion-Status
const toggleQuestion = (id) => {
  openQuestions.value = {
    ...openQuestions.value,
    [id]: !openQuestions.value[id]
  };
};

const { data: faqData } = await useAsyncData('faq', () =>
  queryCollection('faq').all()
);

const faq = computed(() => {
  if (!faqData.value || faqData.value.length === 0) {
    return {
      title: 'Häufig gestellte Fragen',
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

  return faqData.value[0];
});

// Gruppiere FAQ-Elemente in eine besser strukturierte Form
const groupedFaqItems = computed(() => {
  if (!faq.value?.body?.value || !Array.isArray(faq.value.body.value)) {
    return [];
  }

  const items = faq.value.body.value;
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

// Transition-Hooks für sanftes Öffnen und Schließen
const beforeEnter = (el) => {
  el.style.maxHeight = '0';
  el.style.opacity = '0';
  el.style.transition = 'all 0.5s ease-out';
};

const enter = (el, done) => {
  el.style.maxHeight = `${el.scrollHeight + 20}px`;  // Dynamische Höhe setzen
  el.style.opacity = '1';
  done();
};

const leave = (el, done) => {
  el.style.maxHeight = `${el.scrollHeight}px`; // Starthöhe setzen
  el.style.transition = 'all 0.5s ease-out';

  // Kleines Timeout, um das Setzen der Starthöhe zuzulassen
  requestAnimationFrame(() => {
    el.style.maxHeight = '0';
    el.style.opacity = '0';
  });

  // Warten, bis die Transition vorbei ist, bevor done() aufgerufen wird
  setTimeout(() => {
    done();
  }, 500); // muss exakt zur Dauer in CSS passen!
};

</script>

<style lang="scss" scoped>
.faq-section {
  background-color: $background-darker;
}

.faq-group {
  margin-bottom: $spacing-lg;
}

.faq-item {
  margin-bottom: $spacing-sm;
  border-bottom: $pixel-base solid $border-color; 
}

.faq-question {
  font-size: $font-size-medium;
  color: $primary;
  padding: $spacing-sm 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: $transition;
}

.faq-question:hover {
  color: $primary-light;
}

.faq-question.active {
  color: $primary-light;
}

.faq-toggle {
  font-size: $font-size-large;
  color: $primary;
  transition: $transition;
}

.faq-question.active .faq-toggle {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  padding: 0 $spacing-sm;
}

.faq-answer p {
  color: #ccc;
  line-height: $line-height-base;
  margin-bottom: $spacing-sm;
}

/* Transition für das Auf- und Zuklappen */
.faq-transition-enter-active, .faq-transition-leave-active {
  transition: all 0.5s ease-out;
}

.faq-transition-enter, .faq-transition-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
