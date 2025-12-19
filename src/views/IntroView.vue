<template>
  <div class="intro-container" data-ad-client-disable="true">
    <!-- 떠다니는 장식들 -->
    <div class="floating-decoration">
      <span class="deco">💕</span>
      <span class="deco">💝</span>
      <span class="deco">💗</span>
      <span class="deco">💖</span>
      <span class="deco">✨</span>
      <span class="deco">💫</span>
      <span class="deco">⭐</span>
      <span class="deco">🌟</span>
    </div>

    <div class="intro-content">
      <!-- 메인 이모지 -->
      <div class="main-emoji-wrapper">
        <div class="emoji-bg"></div>
        <div class="main-emoji">💝</div>
      </div>
      
      <!-- 타이틀 -->
      <div class="title-wrapper">
        <h1 class="title">썸타입</h1>
        <p class="subtitle">나의 연애 스타일 테스트</p>
        <div class="title-decoration">
          <span class="sparkle">✨</span>
          <span class="sparkle">✨</span>
        </div>
      </div>
      
      <!-- 정보 카드 -->
      <div class="description-card">
        <div class="desc-item">
          <span class="icon">💬</span>
          <div class="desc-text">
            <span class="desc-main">20개의 질문</span>
            <span class="desc-sub">빠르게 끝나요!</span>
          </div>
        </div>
        <div class="desc-item">
          <span class="icon">🎭</span>
          <div class="desc-text">
            <span class="desc-main">8가지 연애 유형</span>
            <span class="desc-sub">나는 어떤 타입?</span>
          </div>
        </div>
        <div class="desc-item">
          <span class="icon">💞</span>
          <div class="desc-text">
            <span class="desc-main">궁합 분석</span>
            <span class="desc-sub">찰떡궁합 찾기</span>
          </div>
        </div>
        <div class="desc-item">
          <span class="icon">💡</span>
          <div class="desc-text">
            <span class="desc-main">연애 꿀팁</span>
            <span class="desc-sub">실전 활용 가능!</span>
          </div>
        </div>
      </div>

      <!-- 소요시간 배지 -->
      <div class="info-badges">
        <div class="info-badge">
          <span class="badge-icon">⏱️</span>
          <span class="badge-text">약 3분 소요</span>
        </div>
        <div class="info-badge">
          <span class="badge-icon">🎯</span>
          <span class="badge-text">무료 테스트</span>
        </div>
      </div>

      <!-- 시작 버튼 -->
      <button class="start-button" @click="startTest">
        <span class="button-shine"></span>
        <span class="button-text">테스트 시작하기</span>
        <span class="button-emoji">💕</span>
      </button>

      <!-- 하단 문구 -->
      <div class="bottom-section">
        <p class="bottom-text">당신의 썸타입은? 💭</p>
        <div class="bottom-tags">
          <span class="tag">#연애테스트</span>
          <span class="tag">#썸타입</span>
          <span class="tag">#MBTI아님</span>
        </div>
      </div>
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
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
}

/* 떠다니는 장식들 */
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
  font-size: 2rem;
  animation: float 8s ease-in-out infinite;
  opacity: 0.4;
}

.deco:nth-child(1) { left: 10%; top: 15%; animation-delay: 0s; }
.deco:nth-child(2) { right: 15%; top: 20%; animation-delay: 1s; }
.deco:nth-child(3) { left: 15%; bottom: 25%; animation-delay: 2s; }
.deco:nth-child(4) { right: 10%; bottom: 20%; animation-delay: 3s; }
.deco:nth-child(5) { left: 25%; top: 40%; animation-delay: 1.5s; font-size: 1.5rem; }
.deco:nth-child(6) { right: 25%; top: 50%; animation-delay: 2.5s; font-size: 1.5rem; }
.deco:nth-child(7) { left: 20%; bottom: 40%; animation-delay: 3.5s; font-size: 1.5rem; }
.deco:nth-child(8) { right: 20%; bottom: 35%; animation-delay: 0.5s; font-size: 1.5rem; }

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-15px) rotate(3deg);
    opacity: 0.5;
  }
}

.intro-content {
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 메인 이모지 */
.main-emoji-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.emoji-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.main-emoji {
  position: relative;
  font-size: 7rem;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 10px 25px rgba(255, 181, 216, 0.4));
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) scale(1.05) rotate(5deg);
  }
}

/* 타이틀 */
.title-wrapper {
  margin-bottom: 2rem;
  position: relative;
}

.title {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -3px;
  animation: fadeIn 0.8s ease 0.2s backwards;
  line-height: 1.2;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  font-size: 1.4rem;
  color: var(--text-secondary);
  font-weight: 700;
  animation: fadeIn 0.8s ease 0.3s backwards;
  letter-spacing: -0.5px;
}

.title-decoration {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.8rem;
}

.sparkle {
  font-size: 1.5rem;
  animation: twinkle 2s ease-in-out infinite;
}

.sparkle:nth-child(1) {
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  animation-delay: 1s;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.3) rotate(180deg);
  }
}

/* 정보 카드 */
.description-card {
  background: white;
  border-radius: 30px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.8rem;
  box-shadow: 0 10px 40px rgba(255, 181, 216, 0.2);
  animation: fadeIn 0.8s ease 0.5s backwards;
  border: 3px solid #FFE5F3;
}

.desc-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.8rem;
  transition: all 0.3s ease;
  border-radius: 15px;
}

.desc-item:hover {
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  transform: translateX(5px);
}

.desc-item:not(:last-child) {
  border-bottom: 2px dashed #FFE5F3;
}

.desc-item .icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.desc-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 0.2rem;
}

.desc-main {
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 700;
}

.desc-sub {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 배지들 */
.info-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.2);
  animation: fadeIn 0.8s ease 0.7s backwards;
  border: 2px solid #FFE5F3;
  transition: all 0.3s ease;
}

.info-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 181, 216, 0.3);
}

.badge-icon {
  font-size: 1.3rem;
}

.badge-text {
  font-size: 0.95rem;
  color: var(--text-primary);
}

/* 시작 버튼 */
.start-button {
  position: relative;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.5rem 4rem;
  font-size: 1.3rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px rgba(255, 181, 216, 0.4);
  animation: fadeIn 0.8s ease 0.9s backwards;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  overflow: hidden;
  letter-spacing: -0.5px;
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.button-text {
  position: relative;
  z-index: 1;
}

.button-emoji {
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.start-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 40px rgba(255, 181, 216, 0.5);
}

.start-button:hover .button-emoji {
  transform: scale(1.3) rotate(10deg);
}

.start-button:active {
  transform: translateY(-2px) scale(1.02);
}

/* 하단 섹션 */
.bottom-section {
  animation: fadeIn 0.8s ease 1.1s backwards;
}

.bottom-text {
  font-size: 1.05rem;
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: 1rem;
}

.bottom-tags {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  color: #C4A5FF;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  transition: all 0.3s ease;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(196, 165, 255, 0.3);
}

/* 반응형 */
@media (max-width: 768px) {
  .intro-container {
    padding: 30px 15px;
  }

  .emoji-bg {
    width: 120px;
    height: 120px;
  }

  .main-emoji {
    font-size: 5.5rem;
  }

  .title {
    font-size: 3rem;
    letter-spacing: -2px;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description-card {
    padding: 1.5rem 1.2rem;
  }

  .desc-main {
    font-size: 1rem;
  }

  .desc-sub {
    font-size: 0.8rem;
  }

  .info-badges {
    flex-direction: column;
    align-items: center;
  }

  .start-button {
    padding: 1.3rem 3rem;
    font-size: 1.15rem;
  }

  .bottom-text {
    font-size: 1rem;
  }

  .tag {
    font-size: 0.8rem;
  }

  .deco {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .description-card {
    padding: 1.3rem 1rem;
  }

  .desc-item {
    padding: 0.8rem 0.5rem;
  }

  .desc-item .icon {
    font-size: 1.7rem;
  }

  .start-button {
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
  }
}
</style>