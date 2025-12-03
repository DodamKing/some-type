<template>
  <div class="notfound-container">
    <!-- 떠다니는 장식 -->
    <div class="floating-decoration">
      <span class="deco">💔</span>
      <span class="deco">🔍</span>
      <span class="deco">❓</span>
    </div>

    <div class="notfound-content">
      <!-- 404 카드 -->
      <div class="error-card">
        <div class="error-code">404</div>
        <div class="emoji">😢</div>
        <h1 class="title">페이지를 찾을 수 없어요</h1>
        <p class="description">
          잘못된 주소로 접속하셨거나<br>
          페이지가 삭제되었을 수 있어요
        </p>
        
        <div class="buttons">
          <button class="home-button" @click="goHome">
            <span class="button-icon">🏠</span>
            <span>홈으로 가기</span>
          </button>
          <button class="test-button" @click="goTest">
            <span class="button-icon">💝</span>
            <span>테스트 하기</span>
          </button>
        </div>
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
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 떠다니는 장식 */
.floating-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.deco {
  position: absolute;
  font-size: 2.5rem;
  animation: floatSlow 8s ease-in-out infinite;
  opacity: 0.3;
}

.deco:nth-child(1) {
  left: 15%;
  top: 20%;
  animation-delay: 0s;
}

.deco:nth-child(2) {
  right: 20%;
  top: 30%;
  animation-delay: 2s;
}

.deco:nth-child(3) {
  left: 10%;
  bottom: 25%;
  animation-delay: 4s;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.notfound-content {
  max-width: 550px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* 404 카드 */
.error-card {
  background: white;
  border-radius: 30px;
  padding: 3rem 2.5rem;
  box-shadow: 0 15px 50px rgba(255, 181, 216, 0.25);
  text-align: center;
  animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1rem;
  animation: fadeIn 0.6s ease 0.2s backwards;
  letter-spacing: -3px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.emoji {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: shake 2s ease-in-out infinite 0.4s backwards;
  filter: drop-shadow(0 4px 15px rgba(255, 181, 216, 0.2));
}

@keyframes shake {
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-3deg);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(3deg);
  }
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  animation: fadeIn 0.6s ease 0.6s backwards;
}

.description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.8;
  font-weight: 500;
  animation: fadeIn 0.6s ease 0.8s backwards;
  word-break: keep-all;
}

/* 버튼들 */
.buttons {
  display: flex;
  gap: 1rem;
  animation: fadeIn 0.6s ease 1s backwards;
}

.home-button,
.test-button {
  flex: 1;
  padding: 1.2rem 1.5rem;
  border: none;
  border-radius: 20px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-icon {
  font-size: 1.3rem;
}

.home-button {
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.3);
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 181, 216, 0.4);
}

.test-button {
  background: white;
  color: #FFB5D8;
  border: 3px solid #FFB5D8;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.2);
}

.test-button:hover {
  background: #FFF8FC;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 181, 216, 0.3);
}

.home-button:active,
.test-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .error-card {
    padding: 2.5rem 2rem;
  }

  .error-code {
    font-size: 4rem;
  }

  .emoji {
    font-size: 4rem;
  }

  .title {
    font-size: 1.7rem;
  }

  .description {
    font-size: 1rem;
  }

  .buttons {
    flex-direction: column;
  }

  .home-button,
  .test-button {
    width: 100%;
  }

  .deco {
    font-size: 2rem;
  }
}
</style>