<template>
  <div class="intro-container">
    <div class="intro-content">
      <h1 class="title">썸타입</h1>
      <p class="subtitle">나의 연애 성향 테스트</p>
      
      <div class="description">
        <p>20개의 질문으로</p>
        <p>나의 연애 스타일과</p>
        <p>썸 성공 가능성을 분석해드려요</p>
      </div>

      <div class="info">
        <span>⏱️ 소요 시간: 약 3분</span>
      </div>

      <button class="start-button" @click="startTest">
        테스트 시작하기
      </button>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  animation: gradientShift 10s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.intro-content {
  text-align: center;
  color: white;
  max-width: 500px;
  width: 100%;
}

.title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  animation: fadeInDown 0.8s ease;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  animation: fadeInUp 0.8s ease 0.2s backwards;
  font-weight: 300;
  letter-spacing: 1px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.description {
  font-size: 1.15rem;
  line-height: 1.9;
  margin-bottom: 3rem;
  animation: fadeIn 1s ease 0.4s backwards;
  font-weight: 300;
}

.description p {
  margin: 0.4rem 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.info {
  margin-bottom: 3rem;
  font-size: 1rem;
  opacity: 0.85;
  animation: fadeIn 1s ease 0.6s backwards;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  display: inline-block;
  backdrop-filter: blur(10px);
}

.start-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 1.2rem 3.5rem;
  font-size: 1.15rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: fadeInUp 1s ease 0.8s backwards, pulse 2s ease-in-out 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.start-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  background: #f8f9fa;
}

.start-button:active {
  transform: translateY(-1px) scale(1.02);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .description {
    font-size: 1.05rem;
  }

  .start-button {
    padding: 1rem 3rem;
    font-size: 1.05rem;
  }
}
</style>