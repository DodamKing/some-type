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
        <span class="deco">💝</span>
        <span class="deco">💖</span>
      </div>

      <div class="result-content">
        <!-- 메인 결과 카드 (스크린샷용 - 응원 메시지 포함) -->
        <div class="result-card main-card screenshot-card">
          <!-- 상단 리본 -->
          <div class="ribbon">
            <span>나의 썸타입 결과</span>
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

          <!-- 해시태그 -->
          <div class="hashtags">
            <span 
              v-for="(tag, index) in resultData.hashtags" 
              :key="index"
              class="hashtag"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 응원 메시지 (캡처 카드 안에 통합) -->
          <div class="encouragement-inline">
            <div class="encouragement-icon">✨</div>
            <p class="encouragement-text">{{ resultData.encouragement }}</p>
          </div>
        </div>

        <!-- 기본 설명 카드 (스크롤 후 보임) -->
        <div class="result-card description-card">
          <div class="section-header">
            <span class="section-icon">💝</span>
            <h3>당신은 이런 사람</h3>
          </div>
          <div class="description-content">
            {{ resultData.description }}
          </div>
        </div>

        <!-- 광고 1 -->
        <div class="ad-wrapper">
          <AdSense />
        </div>

        <!-- 섹션별 카드들 -->
        <div 
          v-for="(section, sectionIndex) in resultData.sections" 
          :key="sectionIndex"
          class="result-card section-card"
        >
          <div class="section-header main-section-header">
            <span class="section-icon">{{ section.icon }}</span>
            <h2>{{ section.title }}</h2>
          </div>

          <!-- 매력 포인트 / 조심할 점 -->
          <div v-if="section.items" class="items-grid">
            <div 
              v-for="(item, itemIndex) in section.items" 
              :key="itemIndex"
              class="item-card"
            >
              <h4 class="item-subtitle">{{ item.subtitle }}</h4>
              <p class="item-content">{{ item.content }}</p>
            </div>
          </div>

          <!-- 연애 꿀팁 -->
          <div v-if="section.tips" class="tips-grid">
            <div 
              v-for="(tip, tipIndex) in section.tips" 
              :key="tipIndex"
              class="tip-card"
            >
              <div class="tip-header">
                <span class="tip-emoji">{{ tip.emoji }}</span>
                <h4 class="tip-title">{{ tip.title }}</h4>
              </div>
              <p class="tip-content">{{ tip.content }}</p>
            </div>
          </div>

          <!-- 궁합 체크 -->
          <div v-if="section.chemistry" class="chemistry-section">
            <!-- 광고 2: 궁합 체크 전 (중간 광고) -->
            <div class="ad-wrapper ad-middle">
              <AdSense />
            </div>

            <!-- 찰떡 궁합 -->
            <div class="chemistry-group best-group">
              <h3 class="chemistry-group-title">
                <span class="chemistry-icon">✨</span>
                찰떡 궁합
              </h3>
              <div class="chemistry-grid">
                <div 
                  v-for="(match, matchIndex) in section.chemistry.best" 
                  :key="matchIndex"
                  class="chemistry-card best-card"
                >
                  <div class="chemistry-header">
                    <span class="chemistry-emoji">{{ match.emoji }}</span>
                    <h4 class="chemistry-name">{{ match.name }}</h4>
                  </div>
                  <p class="chemistry-reason">{{ match.reason }}</p>
                </div>
              </div>
            </div>

            <!-- 괜찮은 궁합 -->
            <div class="chemistry-group good-group">
              <h3 class="chemistry-group-title">
                <span class="chemistry-icon">🤝</span>
                괜찮은 궁합
              </h3>
              <div class="chemistry-grid">
                <div 
                  v-for="(match, matchIndex) in section.chemistry.good" 
                  :key="matchIndex"
                  class="chemistry-card good-card"
                >
                  <div class="chemistry-header">
                    <span class="chemistry-emoji">{{ match.emoji }}</span>
                    <h4 class="chemistry-name">{{ match.name }}</h4>
                  </div>
                  <p class="chemistry-reason">{{ match.reason }}</p>
                </div>
              </div>
            </div>

            <!-- 노력 필요 -->
            <div class="chemistry-group careful-group">
              <h3 class="chemistry-group-title">
                <span class="chemistry-icon">⚠️</span>
                노력 필요
              </h3>
              <div class="chemistry-grid">
                <div 
                  v-for="(match, matchIndex) in section.chemistry.careful" 
                  :key="matchIndex"
                  class="chemistry-card careful-card"
                >
                  <div class="chemistry-header">
                    <span class="chemistry-emoji">{{ match.emoji }}</span>
                    <h4 class="chemistry-name">{{ match.name }}</h4>
                  </div>
                  <p class="chemistry-reason">{{ match.reason }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 광고 3: 마지막 광고 -->
        <div class="ad-wrapper">
          <AdSense />
        </div>

        <!-- 버튼들 -->
        <div class="buttons">
          <button class="restart-button" @click="restart">
            <span class="button-icon">🔄</span>
            <span>다시 테스트</span>
          </button>
          <button class="share-button" @click="share">
            <span class="button-icon">🔗</span>
            <span>공유 하기</span>
          </button>
        </div>

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
import AdSense from '../components/AdSense.vue'

const router = useRouter()
const route = useRoute()
const hasError = ref(false)

const resultType = computed(() => {
  return route.query.type || 'A'
})

const resultData = computed(() => {
  return results[resultType.value] || results['A']
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
  const shareUrl = `${window.location.origin}/share?type=${resultType.value}`
  const shareText = `🎯 나는 ${resultData.value.name}!\n${resultData.value.hashtags.slice(0, 2).join(' ')}\n\n너의 썸타입은? 👇`
  const fullText = `${shareText}\n\n${shareUrl}`
  
  try {
    // 네이티브 공유 지원 (모바일 브라우저)
    if (navigator.share && navigator.canShare) {
      await navigator.share({
        title: '썸타입 테스트',
        text: shareText,
        url: shareUrl
      })
      return
    }
    
    // 대체: 클립보드 복사 (PC, 카카오톡 인앱)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText)
      alert('링크가 복사되었습니다! 💝\n친구에게 공유해보세요!')
      return
    }
    
    // 최후 대체: execCommand (구형 브라우저)
    fallbackCopy(fullText)
    
  } catch (err) {
    // 사용자가 공유 취소한 경우
    if (err.name === 'AbortError' || err.name === 'NotAllowedError') {
      return
    }
    
    // 에러 발생 시 fallback
    console.error('Share failed:', err)
    fallbackCopy(fullText)
  }
}

// Fallback 복사 함수
const fallbackCopy = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      alert('링크가 복사되었습니다! 💝\n친구에게 공유해보세요!')
    } else {
      alert('공유에 실패했습니다. 😢\n다시 시도해주세요!')
    }
  } catch (err) {
    console.error('Fallback copy failed:', err)
    alert('공유에 실패했습니다. 😢')
  } finally {
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
.result-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  animation: float 6s ease-in-out infinite;
  opacity: 0.4;
}

.deco:nth-child(1) {
  left: 10%;
  top: 10%;
  animation-delay: 0s;
}

.deco:nth-child(2) {
  right: 15%;
  top: 20%;
  animation-delay: 1s;
}

.deco:nth-child(3) {
  left: 15%;
  top: 60%;
  animation-delay: 2s;
}

.deco:nth-child(4) {
  right: 10%;
  bottom: 30%;
  animation-delay: 3s;
}

.deco:nth-child(5) {
  left: 25%;
  bottom: 15%;
  animation-delay: 4s;
}

.deco:nth-child(6) {
  right: 25%;
  top: 50%;
  animation-delay: 5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
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

/* 공통 카드 스타일 */
.result-card {
  background: white;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(255, 181, 216, 0.2);
  margin-bottom: 1.5rem;
  overflow: hidden;
  animation: fadeInCard 0.6s ease backwards;
}

.result-card:nth-child(1) { animation-delay: 0.1s; }
.result-card:nth-child(2) { animation-delay: 0.2s; }
.result-card:nth-child(3) { animation-delay: 0.3s; }
.result-card:nth-child(4) { animation-delay: 0.4s; }
.result-card:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInCard {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 메인 카드 (스크린샷용 - 응원 메시지 포함) */
.screenshot-card {
  padding: 0;
  border: 3px solid #FFB5D8;
}

/* 상단 리본 */
.ribbon {
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  padding: 0.7rem;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

/* 이모지 영역 - 컴팩트 */
.emoji-wrapper {
  padding: 2rem 2rem 1.2rem;
  text-align: center;
}

.emoji-circle {
  display: inline-block;
  width: 130px;
  height: 130px;
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(255, 181, 216, 0.3);
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s backwards;
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
  font-size: 4.5rem;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
}

/* 유형명 - 컴팩트 */
.type-name {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0 1.5rem 0.6rem;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.5;
  margin: 0 1.5rem 1rem;
  font-weight: 600;
  word-break: keep-all;
}

/* 해시태그 - 컴팩트 */
.hashtags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.5rem 1.2rem;
}

.hashtag {
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  color: #C4A5FF;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: -0.3px;
}

/* 응원 메시지 (메인 카드에 통합) */
.encouragement-inline {
  padding: 1.3rem 1.5rem;
  margin: 0 1.5rem 1.8rem;
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  border-radius: 20px;
  border: 2px dashed #FFB5D8;
  text-align: center;
}

.encouragement-inline .encouragement-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.encouragement-inline .encouragement-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.7;
  font-weight: 600;
  word-break: keep-all;
}

/* 기본 설명 카드 (스크롤 후 보임) */
.description-card {
  padding: 1.8rem;
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

.description-content {
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  padding: 1.3rem;
  border-radius: 20px;
  border: 2px solid #FFE5F3;
  white-space: pre-line;
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.8;
  word-break: keep-all;
}

/* 섹션 카드 */
.section-card {
  padding: 2rem;
}

.main-section-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #FFE5F3;
}

.main-section-header h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-primary);
}

/* 아이템 그리드 (매력 포인트 / 조심할 점) */
.items-grid {
  display: grid;
  gap: 1rem;
}

.item-card {
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  padding: 1.3rem;
  border-radius: 15px;
  border-left: 4px solid #FFB5D8;
  transition: all 0.3s ease;
}

.item-card:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.2);
}

.item-subtitle {
  font-size: 1.1rem;
  font-weight: 800;
  color: #FFB5D8;
  margin-bottom: 0.6rem;
}

.item-content {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.7;
  word-break: keep-all;
}

/* 팁 그리드 */
.tips-grid {
  display: grid;
  gap: 1rem;
}

.tip-card {
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  padding: 1.3rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.tip-card:hover {
  border-color: #FFE5F3;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 181, 216, 0.25);
}

.tip-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.7rem;
}

.tip-emoji {
  font-size: 1.5rem;
}

.tip-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
}

.tip-content {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.7;
  word-break: keep-all;
}

/* 궁합 섹션 */
.chemistry-section {
  margin-top: 1.5rem;
}

.chemistry-group {
  margin-bottom: 2rem;
}

.chemistry-group:last-child {
  margin-bottom: 0;
}

.chemistry-group-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.chemistry-icon {
  font-size: 1.3rem;
}

.chemistry-grid {
  display: grid;
  gap: 1rem;
}

.chemistry-card {
  padding: 1.2rem;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.best-card {
  background: linear-gradient(135deg, #FFF0F7 0%, #FFE5F3 100%);
  border: 2px solid #FFB5D8;
}

.best-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 181, 216, 0.3);
}

.good-card {
  background: linear-gradient(135deg, #F0E6FF 0%, #F3E5FF 100%);
  border: 2px solid #C4A5FF;
}

.good-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(196, 165, 255, 0.3);
}

.careful-card {
  background: linear-gradient(135deg, #FFF8F0 0%, #FFF0F7 100%);
  border: 2px solid #FFD4B8;
}

.careful-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 212, 184, 0.3);
}

.chemistry-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.6rem;
}

.chemistry-emoji {
  font-size: 1.8rem;
}

.chemistry-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
}

.chemistry-reason {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.6;
  word-break: keep-all;
}

/* 광고 래퍼 */
.ad-wrapper {
  margin: 2rem 0;
  padding: 0.5rem 0;
  border-top: 1px solid rgba(255, 181, 216, 0.15);
  border-bottom: 1px solid rgba(255, 181, 216, 0.15);
}

/* 중간 광고 (궁합 섹션 내부) */
.ad-middle {
  margin: 2rem 0;
}

/* 버튼들 */
.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeInCard 0.6s ease 0.6s backwards;
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
  animation: fadeInCard 0.6s ease 0.7s backwards;
}

/* 반응형 */
@media (max-width: 768px) {
  .result-container {
    padding: 15px 15px;
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

  .emoji-wrapper {
    padding: 1.8rem 1.5rem 1rem;
  }

  .emoji-circle {
    width: 110px;
    height: 110px;
  }

  .emoji {
    font-size: 4rem;
  }

  .type-name {
    font-size: 1.8rem;
    margin: 0 1.2rem 0.5rem;
  }

  .subtitle {
    font-size: 0.95rem;
    margin: 0 1.2rem 0.8rem;
  }

  .hashtags {
    padding: 0 1.2rem 1rem;
    gap: 0.4rem;
  }

  .hashtag {
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
  }

  .encouragement-inline {
    padding: 1.2rem 1.2rem;
    margin: 0 1.2rem 1.5rem;
  }

  .encouragement-inline .encouragement-icon {
    font-size: 1.8rem;
  }

  .encouragement-inline .encouragement-text {
    font-size: 0.9rem;
  }

  .description-card {
    padding: 1.5rem;
  }

  .description-content {
    padding: 1.2rem;
    font-size: 0.95rem;
  }

  .section-card {
    padding: 1.5rem;
  }

  .main-section-header h2 {
    font-size: 1.2rem;
  }

  .item-subtitle {
    font-size: 1rem;
  }

  .item-content,
  .tip-content,
  .chemistry-reason {
    font-size: 0.95rem;
  }

  .buttons {
    flex-direction: column;
  }

  .deco {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .ribbon {
    font-size: 0.85rem;
    padding: 0.6rem;
  }

  .emoji-wrapper {
    padding: 1.5rem 1.2rem 0.8rem;
  }

  .emoji-circle {
    width: 100px;
    height: 100px;
  }

  .emoji {
    font-size: 3.5rem;
  }

  .type-name {
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .hashtag {
    font-size: 0.7rem;
  }

  .encouragement-inline {
    padding: 1rem;
    margin: 0 1rem 1.3rem;
  }

  .encouragement-inline .encouragement-text {
    font-size: 0.85rem;
  }
}
</style>