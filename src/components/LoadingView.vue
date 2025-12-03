<template>
  <div class="loading-container">
    <!-- SVG 그라데이션 정의 -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
      <defs>
        <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFB5D8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#C4A5FF;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>

    <div class="loading-content">
      <!-- 로딩 애니메이션 -->
      <div class="loader">
        <div class="heart-wrapper">
          <div class="heart-circle">
            <div class="heart">💝</div>
          </div>
          <!-- 원형 progress -->
          <svg class="progress-ring" viewBox="0 0 120 120">
            <circle class="progress-bg" cx="60" cy="60" r="54"></circle>
            <circle class="progress-bar" cx="60" cy="60" r="54"></circle>
          </svg>
        </div>
      </div>

      <!-- 로딩 텍스트 -->
      <h2 class="loading-text">당신의 연애 성향을 분석 중...</h2>

      <!-- 도트 애니메이션 -->
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 서브 메시지 -->
      <p class="loading-subtext">{{ currentMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const messages = [
  '당신의 연애 스타일을 파악하고 있어요',
  '썸 성공 패턴을 분석하고 있어요',
  '최적의 연애 유형을 찾고 있어요',
  '거의 다 됐어요!'
]

const currentMessage = ref(messages[0])
let messageIndex = 0
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length
    currentMessage.value = messages[messageIndex]
  }, 800)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-content {
  text-align: center;
  padding: 0 20px;
}

/* 로딩 애니메이션 */
.loader {
  margin-bottom: 2.5rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.heart-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

.heart-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(255, 181, 216, 0.3);
  z-index: 2;
}

.heart {
  font-size: 4.5rem;
  animation: heartbeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 2px 8px rgba(255, 181, 216, 0.3));
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.15);
  }
}

/* 원형 progress bar */
.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  z-index: 1;
}

.progress-bg {
  fill: none;
  stroke: white;
  stroke-width: 6;
  opacity: 0.3;
}

.progress-bar {
  fill: none;
  stroke: url(#loadingGradient);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 339;
  animation: progressSpin 2s ease-in-out infinite;
}

@keyframes progressSpin {
  0% {
    stroke-dashoffset: 339;
  }
  50% {
    stroke-dashoffset: 85;
  }
  100% {
    stroke-dashoffset: 339;
  }
}

/* 로딩 텍스트 */
.loading-text {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 도트 애니메이션 */
.dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.dots span {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
  box-shadow: 0 2px 10px rgba(255, 181, 216, 0.4);
}

.dots span:nth-child(1) {
  animation-delay: 0s;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.3);
    opacity: 1;
  }
}

/* 서브 텍스트 */
.loading-subtext {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 600;
  min-height: 30px;
  animation: fadeInOut 0.8s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .heart-wrapper {
    width: 140px;
    height: 140px;
  }

  .heart-circle {
    width: 90px;
    height: 90px;
  }

  .heart {
    font-size: 4rem;
  }

  .loading-text {
    font-size: 1.4rem;
    padding: 0 1rem;
  }

  .loading-subtext {
    font-size: 1rem;
    padding: 0 1rem;
  }
}
</style>