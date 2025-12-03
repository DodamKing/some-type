<template>
  <div class="intro-container">
    <div class="floating-hearts">
      <span class="heart">💕</span>
      <span class="heart">💝</span>
      <span class="heart">💗</span>
      <span class="heart">💖</span>
    </div>

    <div class="intro-content">
      <div class="main-emoji">💝</div>
      
      <div class="title-wrapper">
        <h1 class="title">썸타입</h1>
        <p class="subtitle">나의 연애 성향 테스트</p>
      </div>
      
      <div class="description-card">
        <div class="desc-item">
          <span class="icon">💬</span>
          <span class="text">20개의 질문</span>
        </div>
        <div class="desc-item">
          <span class="icon">💝</span>
          <span class="text">나의 연애 스타일</span>
        </div>
        <div class="desc-item">
          <span class="icon">⭐</span>
          <span class="text">썸 성공률 분석</span>
        </div>
      </div>

      <div class="info-badge">
        <span class="clock">⏱️</span>
        약 3분 소요
      </div>

      <button class="start-button" @click="startTest">
        <span class="button-text">테스트 시작하기</span>
        <span class="button-arrow">→</span>
      </button>

      <p class="bottom-text">8가지 유형 중 당신은?</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startTest = () => {
  router.push('/test')
}
</script>

<style scoped>
.intro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 떠다니는 하트들 */
.floating-hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.heart {
  position: absolute;
  font-size: 2rem;
  animation: float 6s ease-in-out infinite;
  opacity: 0.3;
}

.heart:nth-child(1) {
  left: 10%;
  top: 20%;
  animation-delay: 0s;
  animation-duration: 7s;
}

.heart:nth-child(2) {
  left: 80%;
  top: 30%;
  animation-delay: 1.5s;
  animation-duration: 6s;
}

.heart:nth-child(3) {
  left: 20%;
  top: 70%;
  animation-delay: 3s;
  animation-duration: 8s;
}

.heart:nth-child(4) {
  left: 85%;
  top: 65%;
  animation-delay: 2s;
  animation-duration: 7.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
  75% {
    transform: translateY(-15px) rotate(3deg);
  }
}

.intro-content {
  text-align: center;
  max-width: 480px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-emoji {
  font-size: 7rem;
  margin-bottom: 1rem;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 8px 20px rgba(255, 181, 216, 0.4));
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

.title-wrapper {
  margin-bottom: 2.5rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -2px;
  animation: fadeIn 0.8s ease 0.2s backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 600;
  animation: fadeIn 0.8s ease 0.4s backwards;
}

.description-card {
  background: white;
  border-radius: 25px;
  padding: 1.8rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 30px rgba(255, 181, 216, 0.15);
  animation: fadeIn 0.8s ease 0.6s backwards;
}

.desc-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 0;
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.desc-item:not(:last-child) {
  border-bottom: 2px dashed #FFE5F3;
}

.desc-item .icon {
  font-size: 1.5rem;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.15);
  animation: fadeIn 0.8s ease 0.8s backwards;
}

.clock {
  font-size: 1.2rem;
}

.start-button {
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.3rem 3.5rem;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 25px rgba(255, 181, 216, 0.4);
  animation: fadeIn 0.8s ease 1s backwards, pulse 2s ease-in-out 2s infinite;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.button-text {
  position: relative;
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.start-button:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 12px 35px rgba(255, 181, 216, 0.5);
}

.start-button:hover .button-arrow {
  transform: translateX(5px);
}

.start-button:active {
  transform: translateY(-2px) scale(1.01);
}

.bottom-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 500;
  opacity: 0.8;
  animation: fadeIn 0.8s ease 1.2s backwards;
}

@media (max-width: 768px) {
  .main-emoji {
    font-size: 5.5rem;
  }

  .title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .description-card {
    padding: 1.5rem 1.2rem;
  }

  .desc-item {
    font-size: 1rem;
  }

  .start-button {
    padding: 1.1rem 3rem;
    font-size: 1.1rem;
  }

  .heart {
    font-size: 1.5rem;
  }
}
</style>