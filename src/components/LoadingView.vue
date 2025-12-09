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

    <!-- 떠다니는 장식들 -->
    <div class="floating-decorations">
      <span class="float-deco" style="left: 10%; top: 20%; animation-delay: 0s;">💕</span>
      <span class="float-deco" style="right: 15%; top: 25%; animation-delay: 0.5s;">✨</span>
      <span class="float-deco" style="left: 15%; bottom: 30%; animation-delay: 1s;">💖</span>
      <span class="float-deco" style="right: 10%; bottom: 25%; animation-delay: 1.5s;">💫</span>
      <span class="float-deco" style="left: 25%; top: 50%; animation-delay: 0.7s;">💝</span>
      <span class="float-deco" style="right: 25%; bottom: 45%; animation-delay: 1.2s;">⭐</span>
    </div>

    <div class="loading-content">
      <!-- 로딩 애니메이션 -->
      <div class="loader">
        <div class="heart-wrapper">
          <!-- 반짝이는 배경 -->
          <div class="sparkle-bg"></div>
          
          <div class="heart-circle">
            <div class="heart">💝</div>
          </div>
          
          <!-- 원형 progress -->
          <svg class="progress-ring" viewBox="0 0 120 120">
            <circle class="progress-bg" cx="60" cy="60" r="54"></circle>
            <circle class="progress-bar" cx="60" cy="60" r="54"></circle>
          </svg>

          <!-- 진행률 표시 -->
          <div class="progress-percent">{{ progress }}%</div>
        </div>
      </div>

      <!-- 로딩 텍스트 -->
      <h2 class="loading-text">{{ currentMessage.text }}</h2>

      <!-- 도트 애니메이션 -->
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 서브 메시지 -->
      <p class="loading-subtext">
        <span class="subtext-emoji">{{ currentMessage.emoji }}</span>
        {{ currentMessage.sub }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const messages = [
  { 
    text: '두근두근... 결과 나오는 중', 
    emoji: '💕',
    sub: '당신의 썸타입을 찾고 있어요!'
  },
  { 
    text: '연애 스타일 분석 중', 
    emoji: '✨',
    sub: '완벽한 궁합을 찾는 중이에요'
  },
  { 
    text: '찰떡궁합 계산 중', 
    emoji: '💞',
    sub: '딱 맞는 타입을 찾았어요!'
  },
  { 
    text: '거의 다 왔어요!', 
    emoji: '🎉',
    sub: '곧 결과를 확인하실 수 있어요'
  }
]

const currentMessage = ref(messages[0])
const progress = ref(0)
let messageIndex = 0
let messageInterval = null
let progressInterval = null

onMounted(() => {
  // 메시지 순환
  messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length
    currentMessage.value = messages[messageIndex]
  }, 700)

  // 진행률 증가
  progressInterval = setInterval(() => {
    if (progress.value < 95) {
      progress.value += Math.floor(Math.random() * 10) + 1
      if (progress.value > 95) progress.value = 95
    }
  }, 200)
})

onUnmounted(() => {
  if (messageInterval) clearInterval(messageInterval)
  if (progressInterval) clearInterval(progressInterval)
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
  overflow: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 떠다니는 장식들 */
.floating-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.float-deco {
  position: absolute;
  font-size: 2rem;
  animation: floatAround 4s ease-in-out infinite;
  opacity: 0.4;
}

@keyframes floatAround {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(10deg) scale(1.1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-10px) rotate(-10deg) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-15px) rotate(5deg) scale(1.05);
    opacity: 0.5;
  }
}

.loading-content {
  text-align: center;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* 로딩 애니메이션 */
.loader {
  margin-bottom: 2.5rem;
  animation: float 2.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.heart-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;
}

/* 반짝이는 배경 */
.sparkle-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  border-radius: 50%;
  animation: sparkle 2s ease-in-out infinite;
  opacity: 0.5;
  z-index: 0;
}

@keyframes sparkle {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15) rotate(180deg);
    opacity: 0.7;
  }
}

.heart-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(255, 181, 216, 0.4);
  z-index: 2;
}

.heart {
  font-size: 5rem;
  animation: heartbeat 1.2s ease-in-out infinite;
  filter: drop-shadow(0 4px 15px rgba(255, 181, 216, 0.4));
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  10% {
    transform: scale(1.1) rotate(-5deg);
  }
  20% {
    transform: scale(1) rotate(0deg);
  }
  30% {
    transform: scale(1.15) rotate(5deg);
  }
  40% {
    transform: scale(1) rotate(0deg);
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
  stroke: rgba(255, 181, 216, 0.2);
  stroke-width: 7;
}

.progress-bar {
  fill: none;
  stroke: url(#loadingGradient);
  stroke-width: 7;
  stroke-linecap: round;
  stroke-dasharray: 339;
  animation: progressSpin 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 181, 216, 0.6));
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

/* 진행률 숫자 */
.progress-percent {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: countUp 0.3s ease;
}

@keyframes countUp {
  from {
    transform: translateX(-50%) scale(1.2);
  }
  to {
    transform: translateX(-50%) scale(1);
  }
}

/* 로딩 텍스트 */
.loading-text {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textPulse 0.7s ease-in-out;
  letter-spacing: -1px;
}

@keyframes textPulse {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 도트 애니메이션 */
.dots {
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
}

.dots span {
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(255, 181, 216, 0.5);
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

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.7) translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.4) translateY(-10px);
    opacity: 1;
  }
}

/* 서브 텍스트 */
.loading-subtext {
  font-size: 1.15rem;
  color: var(--text-secondary);
  font-weight: 700;
  min-height: 30px;
  animation: subtextFade 0.7s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.subtext-emoji {
  font-size: 1.5rem;
  animation: emojiPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes emojiPop {
  0% {
    transform: scale(0) rotate(0deg);
  }
  50% {
    transform: scale(1.3) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes subtextFade {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 반응형 */
@media (max-width: 768px) {
  .heart-wrapper {
    width: 160px;
    height: 160px;
  }

  .sparkle-bg {
    width: 120px;
    height: 120px;
  }

  .heart-circle {
    width: 100px;
    height: 100px;
  }

  .heart {
    font-size: 4.5rem;
  }

  .loading-text {
    font-size: 1.5rem;
    padding: 0 1rem;
  }

  .loading-subtext {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .float-deco {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .loading-text {
    font-size: 1.3rem;
  }

  .loading-subtext {
    font-size: 0.95rem;
  }

  .progress-percent {
    font-size: 0.9rem;
    bottom: -35px;
  }
}
</style>