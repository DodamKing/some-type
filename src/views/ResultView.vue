<template>
  <div class="result-container">
    <!-- 잘못된 접근 시 안내 화면 -->
    <div v-if="hasError" class="error-overlay">
      <div class="error-content">
        <div class="error-emoji">🤔</div>
        <h2 class="error-title">잘못된 접근이에요</h2>
        <p class="error-message">
          테스트를 먼저 진행해주세요!<br>
          잠시 후 홈으로 이동합니다...
        </p>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- 정상 결과 화면 -->
    <template v-else>
      <!-- SVG 그라데이션 정의 -->
      <svg width="0" height="0" style="position: absolute; pointer-events: none;">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFB5D8;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#C4A5FF;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>

      <!-- 배경 장식 -->
      <div class="floating-decoration">
        <span class="deco">✨</span>
        <span class="deco">💫</span>
        <span class="deco">⭐</span>
        <span class="deco">🌟</span>
      </div>

      <div class="result-content">
        <!-- 메인 결과 카드 -->
        <div class="result-card">
          <!-- 상단 리본 -->
          <div class="ribbon">
            <span>나의 연애 유형</span>
          </div>

          <!-- 이모지 -->
          <div class="emoji-wrapper">
            <div class="emoji-circle">
              <div class="emoji">{{ resultData.emoji }}</div>
            </div>
          </div>

          <!-- 유형명 -->
          <h1 class="type-name">{{ resultData.name }}</h1>
          <p class="subtitle">{{ resultData.subtitle }}</p>

          <!-- 구분선 -->
          <div class="divider"></div>

          <!-- 연애 스타일 섹션 -->
          <div class="info-section style-section">
            <div class="section-header">
              <span class="section-icon">💝</span>
              <h3>연애 스타일</h3>
            </div>
            <p class="section-content">{{ resultData.description }}</p>
          </div>

          <!-- 썸 성공률 섹션 -->
          <div class="info-section success-section">
            <div class="section-header">
              <span class="section-icon">📊</span>
              <h3>썸 성공률</h3>
            </div>
            <div class="success-rate-display">
              <div class="rate-circle">
                <svg class="rate-svg" viewBox="0 0 100 100">
                  <circle class="rate-bg" cx="50" cy="50" r="45"></circle>
                  <circle 
                    class="rate-fill" 
                    cx="50" 
                    cy="50" 
                    r="45"
                    :style="{ strokeDashoffset: rateOffset }"
                  ></circle>
                </svg>
                <div class="rate-text">
                  <span class="rate-number">{{ resultData.successRate }}</span>
                  <span class="rate-percent">%</span>
                </div>
              </div>
            </div>
            <p class="section-content">{{ resultData.comment }}</p>
          </div>

          <!-- 광고 1: 버튼 위 -->
          <AdSense />

          <!-- 버튼들 -->
          <div class="buttons">
            <button class="share-button" @click="share">
              <span class="button-icon">🔗</span>
              <span>링크 복사</span>
            </button>
            <button class="restart-button" @click="restart">
              <span class="button-icon">🔄</span>
              <span>다시 하기</span>
            </button>
          </div>
        </div>

        <!-- 광고 2: 버튼 아래 (카드 밖) -->
        <AdSense />

        <!-- 하단 메시지 -->
        <p class="bottom-message">친구들도 테스트 해보세요!</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { results } from '../data/results'
import AdSense from '@/components/AdSense.vue'

const router = useRouter()
const route = useRoute()
const hasError = ref(false)

const resultType = computed(() => {
  return route.query.type || 'A'
})

const resultData = computed(() => {
  return results[resultType.value] || results['A']
})

// 썸 성공률 원형 게이지용
const rateOffset = computed(() => {
  const rate = resultData.value.successRate
  const circumference = 2 * Math.PI * 45
  return circumference - (rate / 100) * circumference
})

// 잘못된 파라미터 체크 및 리다이렉트
onMounted(() => {
  const type = route.query.type
  
  if (!type || !results[type]) {
    hasError.value = true
    
    // 2초 후 인트로로 이동
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
})

const restart = () => {
  router.push('/')
}

const share = async () => {
  const shareUrl = window.location.origin
  
  try {
    await navigator.clipboard.writeText(shareUrl)
    alert('링크가 복사되었습니다! 친구들에게 공유해보세요 💝')
  } catch {
    alert('링크 복사에 실패했습니다.')
  }
}
</script>

<style scoped>
.result-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 에러 오버레이 */
.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
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

.error-content {
  text-align: center;
  padding: 0 20px;
}

.error-emoji {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: bounceError 0.8s ease;
}

@keyframes bounceError {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.error-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-weight: 600;
  word-break: keep-all;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
}

.loading-dots span {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.3);
    opacity: 1;
  }
}

/* 배경 장식 */
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
  animation: twinkle 3s ease-in-out infinite;
  opacity: 0.4;
}

.deco:nth-child(1) {
  left: 15%;
  top: 15%;
  animation-delay: 0s;
}

.deco:nth-child(2) {
  right: 15%;
  top: 25%;
  animation-delay: 0.7s;
}

.deco:nth-child(3) {
  left: 10%;
  bottom: 20%;
  animation-delay: 1.4s;
}

.deco:nth-child(4) {
  right: 20%;
  bottom: 15%;
  animation-delay: 2.1s;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

.result-content {
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 1;
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

/* 메인 카드 */
.result-card {
  background: white;
  border-radius: 30px;
  padding: 0;
  box-shadow: 0 15px 50px rgba(255, 181, 216, 0.25);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

/* 상단 리본 */
.ribbon {
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  padding: 0.8rem;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  animation: slideDown 0.6s ease 0.2s backwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* 이모지 영역 */
.emoji-wrapper {
  padding: 2.5rem 2rem 1.5rem;
  text-align: center;
}

.emoji-circle {
  display: inline-block;
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(255, 181, 216, 0.3);
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s backwards;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.emoji {
  font-size: 5rem;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
}

/* 유형명 */
.type-name {
  font-size: 2.2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0 2rem 0.8rem;
  animation: fadeInText 0.6s ease 0.6s backwards;
  letter-spacing: -1px;
}

@keyframes fadeInText {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.6;
  margin: 0 2rem 2rem;
  font-weight: 500;
  animation: fadeInText 0.6s ease 0.7s backwards;
  word-break: keep-all;
}

/* 구분선 */
.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #FFE5F3, transparent);
  margin: 0 2rem 2rem;
}

/* 정보 섹션 */
.info-section {
  margin: 0 2rem 2rem;
  animation: fadeInText 0.6s ease 0.8s backwards;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.section-icon {
  font-size: 1.5rem;
}

.section-header h3 {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary);
}

.section-content {
  font-size: 1.05rem;
  color: var(--text-primary);
  line-height: 1.8;
  word-break: keep-all;
  background: #FFF8FC;
  padding: 1.2rem;
  border-radius: 15px;
  border-left: 4px solid #FFB5D8;
}

/* 썸 성공률 원형 게이지 */
.success-rate-display {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.rate-circle {
  position: relative;
  width: 150px;
  height: 150px;
}

.rate-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.rate-bg {
  fill: none;
  stroke: #FFE5F3;
  stroke-width: 8;
}

.rate-fill {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 283;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: drawCircle 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s backwards;
}

@keyframes drawCircle {
  from {
    stroke-dashoffset: 283;
  }
}

.rate-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.rate-number {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.rate-percent {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-secondary);
}

/* 버튼들 */
.buttons {
  display: flex;
  gap: 1rem;
  padding: 0 2rem 2.5rem;
  animation: fadeInText 0.6s ease 1s backwards;
}

.share-button,
.restart-button {
  flex: 1;
  padding: 1.2rem;
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

.share-button {
  background: white;
  color: #FFB5D8;
  border: 3px solid #FFB5D8;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.2);
}

.share-button:hover {
  background: #FFF8FC;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 181, 216, 0.3);
}

.restart-button {
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.3);
}

.restart-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 181, 216, 0.4);
}

.share-button:active,
.restart-button:active {
  transform: translateY(-1px);
}

/* 하단 메시지 */
.bottom-message {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  opacity: 0.8;
  animation: fadeInText 0.6s ease 1.2s backwards;
}

@media (max-width: 768px) {
  .result-container {
    padding: 30px 15px;
  }

  .error-emoji {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.7rem;
  }

  .error-message {
    font-size: 1.1rem;
  }

  .emoji-circle {
    width: 120px;
    height: 120px;
  }

  .emoji {
    font-size: 4rem;
  }

  .type-name {
    font-size: 1.9rem;
    margin: 0 1.5rem 0.8rem;
  }

  .subtitle {
    font-size: 1rem;
    margin: 0 1.5rem 1.5rem;
  }

  .info-section {
    margin: 0 1.5rem 1.5rem;
  }

  .section-content {
    font-size: 1rem;
    padding: 1rem;
  }

  .rate-circle {
    width: 130px;
    height: 130px;
  }

  .rate-number {
    font-size: 2.5rem;
  }

  .buttons {
    flex-direction: column;
    padding: 0 1.5rem 2rem;
  }

  .deco {
    font-size: 1.5rem;
  }
}
</style>