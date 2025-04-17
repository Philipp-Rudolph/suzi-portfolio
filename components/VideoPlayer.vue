<!-- components/VideoPlayer.vue -->
<template>
  <div class="video-player">
    <div class="video-container">
      <video
        ref="videoRef"
        class="video-element"
        :src="src"
        playsinline
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @ended="isPlaying = false"
        @click="togglePlay"
      /> 
      
      <!-- Custom Controls -->
      <div 
        v-show="!isPlaying || showControls" 
        class="video-controls"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <button class="play-pause-btn" @click.stop="togglePlay">
          <span v-if="!isPlaying" class="play-icon">▶</span>
          <span v-else class="pause-icon">❚❚</span>
        </button>
        
        <div class="progress-container" @click.stop="seek">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progress}%` }" />
          </div>
          <div class="time-display">
            <span>{{ formatTime(currentTime) }}</span>
            <span>/</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>
        
        <div class="volume-container">
          <button class="volume-btn" @click.stop="toggleMute">
            <span v-if="isMuted" class="volume-muted">🔇</span>
            <span v-else class="volume-on">🔊</span>
          </button>
          <div class="volume-slider-container">
            <input 
              v-model="volume"
              type="range"
              class="volume-slider"
              min="0"
              max="1"
              step="0.1"
              @input="updateVolume"
            >
          </div>
        </div>
        
        <button class="fullscreen-btn" @click.stop="toggleFullscreen">
          <span>⛶</span>
        </button>
      </div>
      
      <!-- Play button overlay for initial state -->
      <div 
        v-if="!isPlaying && !interacted" 
        class="play-overlay"
        @click="startPlay"
      >
        <div class="play-button">
          <span>▶</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Props
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  poster: {
    type: String,
    default: ''
  }
});

// Refs
const videoRef = ref(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const volume = ref(1);
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);
const showControls = ref(false);
const controlsTimeout = ref(null);
const interacted = ref(false);

// Toggle play/pause
const togglePlay = () => {
  interacted.value = true;
  if (!videoRef.value) return;
  const audio = new Audio(videoRef.value);
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
};

// Initial play 
const startPlay = () => {
  interacted.value = true;
  if (videoRef.value) {
    videoRef.value.play();
  }
};

// Toggle mute
const toggleMute = () => {
  if (!videoRef.value) return;
  
  videoRef.value.muted = !videoRef.value.muted;
  isMuted.value = videoRef.value.muted;
};

// Update volume
const updateVolume = () => {
  if (!videoRef.value) return;
  
  videoRef.value.volume = volume.value;
  isMuted.value = volume.value === 0;
};

// Seek functionality
const seek = (event) => {
  if (!videoRef.value) return;
  
  const rect = event.target.getBoundingClientRect();
  const pos = (event.clientX - rect.left) / rect.width;
  videoRef.value.currentTime = pos * videoRef.value.duration;
};

// Toggle fullscreen
const toggleFullscreen = () => {
  if (!videoRef.value) return;
  
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    const videoContainer = videoRef.value.parentElement;
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    }
  }
};

// Format time (seconds to MM:SS)
const formatTime = (seconds) => {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Controls visibility
const handleMouseEnter = () => {
  showControls.value = true;
  if (controlsTimeout.value) {
    clearTimeout(controlsTimeout.value);
  }
};

const handleMouseLeave = () => {
  if (isPlaying.value) {
    controlsTimeout.value = setTimeout(() => {
      showControls.value = false;
    }, 2000);
  }
};

// Update time and progress
const updateTime = () => {
  if (!videoRef.value) return;
  
  currentTime.value = videoRef.value.currentTime;
  duration.value = videoRef.value.duration || 0;
  progress.value = (currentTime.value / duration.value) * 100 || 0;
};

// Lifecycle hooks
onMounted(() => {
  if (videoRef.value) {
    // Set initial volume
    videoRef.value.volume = volume.value;
    
    // Set poster if provided
    if (props.poster) {
      videoRef.value.poster = props.poster;
    }
    
    // Add timeupdate event listener
    videoRef.value.addEventListener('timeupdate', updateTime);
    
    // Set autoplay if true
    if (props.autoplay) {
      videoRef.value.autoplay = true;
    }
  }
});

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener('timeupdate', updateTime);
  }
  if (controlsTimeout.value) {
    clearTimeout(controlsTimeout.value);
  }
});

// Watch for src changes
watch(() => props.src, (newSrc) => {
  if (videoRef.value) {
    videoRef.value.src = newSrc;
    isPlaying.value = false;
    currentTime.value = 0;
    progress.value = 0;
  }
});
</script>

<style scoped>
.video-player {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: black;
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: black;
}

/* Controls */
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: opacity 0.3s ease;
}

.play-pause-btn, .volume-btn, .fullscreen-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
}

.progress-container {
  flex: 1;
  cursor: pointer;
}

.progress-bar {
  height: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: #FF5722;
  border-radius: 5px;
  transition: width 0.1s linear;
}

.time-display {
  display: flex;
  gap: 0.5rem;
  color: white;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-slider-container {
  width: 80px;
}

.volume-slider {
  width: 100%;
  cursor: pointer;
  accent-color: #FF5722;
}

/* Play Overlay */
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 87, 34, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.play-button span {
  color: white;
  font-size: 2rem;
  padding-left: 5px;
}

.play-overlay:hover .play-button {
  transform: scale(1.1);
  background-color: #FF5722;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .video-controls {
    padding: 0.5rem;
  }
  
  .volume-slider-container {
    display: none;
  }
  
  .time-display {
    font-size: 0.7rem;
  }
}
</style>