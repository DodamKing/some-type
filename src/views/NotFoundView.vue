<template>
  <div class="notfound-container">
    <div class="notfound-content">
      <div class="emoji">😢</div>
      <h1 class="title">페이지를 찾을 수 없어요</h1>
      <p class="description">
        잘못된 주소로 접속하셨거나<br>
        페이지가 삭제되었을 수 있어요
      </p>
      
      <div class="buttons">
        <button class="home-button" @click="goHome">
          홈으로 가기
        </button>
        <button class="test-button" @click="goTest">
          테스트 하러 가기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goTest = () => {
  router.push('/test')
}
</script>

<style scoped>
.notfound-container {
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

.notfound-content {
  text-align: center;
  color: white;
  max-width: 500px;
  width: 100%;
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.emoji {
  font-size: 6rem;
  margin-bottom: 2rem;
  animation: shake 1s ease infinite;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
}

@keyframes shake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.description {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  line-height: 1.8;
  opacity: 0.95;
  font-weight: 300;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.home-button,
.test-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.home-button {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.test-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  backdrop-filter: blur(10px);
}

.test-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.home-button:active,
.test-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .emoji {
    font-size: 5rem;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1.1rem;
  }

  .buttons {
    flex-direction: column;
  }

  .home-button,
  .test-button {
    width: 100%;
  }
}
</style>