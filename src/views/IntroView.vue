<template>
  <div class="intro-container">
    <!-- 떠다니는 장식들 -->
    <div class="floating-decoration">
      <span class="deco">💕</span>
      <span class="deco">💝</span>
      <span class="deco">💗</span>
      <span class="deco">✨</span>
      <span class="deco">💫</span>
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
      </div>
      
      <!-- 정보 카드 - 컴팩트 -->
      <div class="description-card">
        <div class="desc-item">
          <span class="icon">💬</span>
          <span class="desc-text">20개 질문</span>
        </div>
        <div class="desc-item">
          <span class="icon">🎭</span>
          <span class="desc-text">8가지 유형</span>
        </div>
        <div class="desc-item">
          <span class="icon">💞</span>
          <span class="desc-text">궁합 분석</span>
        </div>
        <div class="desc-item">
          <span class="icon">⏱️</span>
          <span class="desc-text">약 3분</span>
        </div>
      </div>

      <!-- CTA 영역 (광고 삽입 방지) -->
      <div class="cta-wrapper" data-ad-client-disable="true">
        <!-- 시작 버튼 강조 영역 -->
        <div class="button-section">
          <div class="button-glow"></div>
          <button class="start-button" @click="startTest">
            <span class="button-shine"></span>
            <span class="button-content">
              <span class="button-icon">🚀</span>
              <span class="button-text">테스트 시작</span>
              <span class="button-emoji">💕</span>
            </span>
            <span class="button-pulse"></span>
          </button>
        </div>
      </div>

      <!-- 하단 태그 -->
      <div class="bottom-tags">
        <span class="tag">#연애테스트</span>
        <span class="tag">#썸타입</span>
        <span class="tag">#무료</span>
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
  padding: 20px 20px;
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
  opacity: 0.3;
}

.deco:nth-child(1) { left: 10%; top: 15%; animation-delay: 0s; }
.deco:nth-child(2) { right: 15%; top: 20%; animation-delay: 1s; }
.deco:nth-child(3) { left: 15%; bottom: 25%; animation-delay: 2s; }
.deco:nth-child(4) { left: 20%; top: 50%; animation-delay: 1.5s; font-size: 1.5rem; }
.deco:nth-child(5) { right: 20%; bottom: 40%; animation-delay: 2.5s; font-size: 1.5rem; }

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
    opacity: 0.5;
  }
}

.intro-content {
  text-align: center;
  max-width: 450px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
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
}

.emoji-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
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
  font-size: 5rem;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 10px 25px rgba(255, 181, 216, 0.4));
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

/* 타이틀 */
.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -2px;
  animation: fadeIn 0.8s ease 0.2s backwards;
  line-height: 1;
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
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 700;
  animation: fadeIn 0.8s ease 0.3s backwards;
  letter-spacing: -0.5px;
}

/* 정보 카드 - 컴팩트 버전 */
.description-card {
  background: white;
  border-radius: 25px;
  padding: 1rem 1.2rem;
  box-shadow: 0 8px 30px rgba(255, 181, 216, 0.2);
  animation: fadeIn 0.8s ease 0.5s backwards;
  border: 2px solid #FFE5F3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  width: 100%;
}

.desc-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.4rem;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.desc-item:hover {
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  transform: translateY(-2px);
}

.desc-item .icon {
  font-size: 1.8rem;
}

.desc-text {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
}

/* CTA 래퍼 - 광고 삽입 방지 */
.cta-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 버튼 섹션 - 강조 영역 */
.button-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0;
}

.button-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 181, 216, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: glow-pulse 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.9);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* 시작 버튼 - 초강조 */
.start-button {
  position: relative;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #C71585 100%);
  color: white;
  border: none;
  border-radius: 60px;
  padding: 1.7rem 4.5rem;
  font-size: 1.4rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 
    0 15px 40px rgba(255, 20, 147, 0.5),
    0 5px 15px rgba(255, 105, 180, 0.3),
    inset 0 -5px 15px rgba(0, 0, 0, 0.1),
    inset 0 3px 10px rgba(255, 255, 255, 0.3);
  animation: buttonEntrance 0.8s ease 0.7s backwards, buttonFloat 3s ease-in-out 1.5s infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  letter-spacing: -0.5px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  min-width: 280px;
  z-index: 10;
}

@keyframes buttonEntrance {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes buttonFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.button-icon {
  font-size: 1.6rem;
  animation: rocket 1.5s ease-in-out infinite;
}

@keyframes rocket {
  0%, 100% {
    transform: translateY(0) rotate(-10deg);
  }
  50% {
    transform: translateY(-5px) rotate(10deg);
  }
}

.button-text {
  position: relative;
  text-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 255, 255, 0.5);
}

.button-emoji {
  font-size: 1.6rem;
  transition: transform 0.3s ease;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.2);
  }
  20%, 40% {
    transform: scale(1.1);
  }
}

.button-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 60px;
  border: 3px solid rgba(255, 20, 147, 0.6);
  animation: pulse-ring 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulse-ring {
  0% {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  100% {
    width: 140%;
    height: 140%;
    opacity: 0;
  }
}

.start-button:hover {
  transform: translateY(-8px) scale(1.08);
  box-shadow: 
    0 20px 50px rgba(255, 20, 147, 0.6),
    0 10px 25px rgba(255, 105, 180, 0.4),
    inset 0 -5px 15px rgba(0, 0, 0, 0.1),
    inset 0 3px 10px rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #FF85C1 100%);
}

.start-button:hover .button-emoji {
  transform: scale(1.4) rotate(15deg);
}

.start-button:hover .button-icon {
  transform: translateY(-10px) rotate(20deg);
}

.start-button:active {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 10px 30px rgba(255, 20, 147, 0.5),
    0 5px 15px rgba(255, 105, 180, 0.3);
}

/* 하단 태그 */
.bottom-tags {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  animation: fadeIn 0.8s ease 0.9s backwards;
}

.tag {
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  color: #C4A5FF;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  transition: all 0.3s ease;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(196, 165, 255, 0.3);
}

/* 반응형 - 모바일 최적화 */
@media (max-width: 768px) {
  .intro-container {
    padding: 15px 15px;
  }

  .intro-content {
    gap: 1rem;
  }

  .emoji-bg {
    width: 85px;
    height: 85px;
  }

  .main-emoji {
    font-size: 4.2rem;
  }

  .title {
    font-size: 2.8rem;
    letter-spacing: -1.5px;
  }

  .subtitle {
    font-size: 1.05rem;
  }

  .description-card {
    padding: 0.8rem 1rem;
    gap: 0.6rem;
  }

  .desc-item {
    padding: 0.5rem 0.3rem;
  }

  .desc-item .icon {
    font-size: 1.6rem;
  }

  .desc-text {
    font-size: 0.85rem;
  }

  .button-glow {
    width: 300px;
    height: 300px;
  }

  .start-button {
    padding: 1.5rem 3.8rem;
    font-size: 1.25rem;
    min-width: 260px;
  }

  .button-icon,
  .button-emoji {
    font-size: 1.5rem;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
  }

  .deco {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .intro-container {
    padding: 10px 15px;
  }

  .intro-content {
    gap: 0.9rem;
  }

  .emoji-bg {
    width: 75px;
    height: 75px;
  }

  .main-emoji {
    font-size: 3.8rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .description-card {
    padding: 0.7rem 0.9rem;
    gap: 0.5rem;
  }

  .desc-item {
    padding: 0.4rem 0.2rem;
  }

  .desc-item .icon {
    font-size: 1.5rem;
  }

  .desc-text {
    font-size: 0.8rem;
  }

  .button-section {
    padding: 1rem 0;
  }

  .button-glow {
    width: 250px;
    height: 250px;
  }

  .start-button {
    padding: 1.4rem 3.5rem;
    font-size: 1.15rem;
    min-width: 240px;
  }

  .button-icon,
  .button-emoji {
    font-size: 1.4rem;
  }

  .tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.7rem;
  }
}

@media (max-width: 390px) {
  .intro-content {
    gap: 0.8rem;
  }

  .main-emoji {
    font-size: 3.5rem;
  }

  .title {
    font-size: 2.3rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .description-card {
    padding: 0.6rem 0.8rem;
  }

  .desc-item .icon {
    font-size: 1.4rem;
  }

  .desc-text {
    font-size: 0.75rem;
  }

  .start-button {
    padding: 1.3rem 3rem;
    font-size: 1.1rem;
    min-width: 220px;
  }
}
</style>