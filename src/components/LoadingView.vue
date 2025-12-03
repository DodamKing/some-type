<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="loader">
        <div class="heart">💝</div>
      </div>
      <h2 class="loading-text">당신의 연애 성향을 분석 중...</h2>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="loading-subtext">{{ currentMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = [
  '당신의 연애 스타일을 파악하고 있어요',
  '썸 성공 패턴을 분석하고 있어요',
  '최적의 연애 유형을 찾고 있어요',
  '거의 다 됐어요!'
]

const currentMessage = ref(messages[0])
let messageIndex = 0

onMounted(() => {
  const interval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length
    currentMessage.value = messages[messageIndex]
  }, 800)

  // 컴포넌트 언마운트 시 인터벌 정리
  return () => clearInterval(interval)
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: white;
}

.loader {
  margin-bottom: 2rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.heart {
  font-size: 5rem;
  animation: heartbeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 4px 20px rgba(255, 255, 255, 0.5));
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

.loading-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.dots span {
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
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
    transform: scale(1.2);
    opacity: 1;
  }
}

.loading-subtext {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
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
  .heart {
    font-size: 4rem;
  }

  .loading-text {
    font-size: 1.3rem;
    padding: 0 1rem;
  }

  .loading-subtext {
    font-size: 1rem;
    padding: 0 1rem;
  }
}
</style>