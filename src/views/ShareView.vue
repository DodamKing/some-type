<template>
  <div class="share-container">
    <div class="share-card">
      <!-- 이모지 -->
      <div class="emoji-big">{{ shareInfo.emoji }}</div>
      
      <!-- 타입명 -->
      <h1 class="type-title">{{ shareInfo.title }}</h1>
      
      <!-- 한줄 요약 -->
      <p class="one-liner">{{ shareInfo.oneLiner }}</p>
      
      <!-- 핵심 특징 -->
      <div class="key-points">
        <div 
          v-for="(point, index) in shareInfo.keyPoints" 
          :key="index"
          class="point-item"
        >
          {{ point }}
        </div>
      </div>
      
      <!-- 찰떡 궁합 -->
      <div class="best-match">
        <span class="match-label">찰떡 궁합</span>
        <span class="match-name">{{ shareInfo.bestMatch }}</span>
      </div>
      
      <!-- 해시태그 -->
      <div class="hashtags">
        <span 
          v-for="(tag, index) in shareInfo.hashtags" 
          :key="index"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- CTA 버튼들 -->
      <div class="cta-buttons">
        <button class="full-result-btn" @click="viewFullResult">
          <span>📊</span>
          <span>전체 결과 보기</span>
        </button>
        <button class="test-btn" @click="startTest">
          <span>✨</span>
          <span>나도 테스트하기</span>
        </button>
      </div>
      
      <!-- 공유하기 -->
      <button class="share-btn" @click="shareAgain">
        <span>🔗</span>
        <span>친구에게 공유하기</span>
      </button>
    </div>
    
    <!-- 하단 로고 -->
    <p class="bottom-text">썸타입 테스트</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { shareData } from '../data/shareData'

const router = useRouter()
const route = useRoute()

const shareType = computed(() => {
  return route.query.type || 'A'
})

const shareInfo = computed(() => {
  return shareData[shareType.value] || shareData['A']
})

// OG 태그 동적 업데이트 (가능하면)
onMounted(() => {
  document.title = `${shareInfo.value.title} - 썸타입 테스트`
})

const viewFullResult = () => {
  router.push(`/result?type=${shareType.value}`)
}

const startTest = () => {
  router.push('/')
}

const shareAgain = async () => {
  const shareUrl = window.location.href
  const shareText = `
🎯 나의 썸타입: ${shareInfo.value.title}

${shareInfo.value.keyPoints.join('\n')}

찰떡궁합: ${shareInfo.value.bestMatch}

나는 ${shareInfo.value.title}! 너의 썸타입은? 👇
  `.trim()
  
  try {
    if (navigator.share) {
      await navigator.share({
        title: `썸타입 테스트 - ${shareInfo.value.title}`,
        text: shareText,
        url: shareUrl
      })
    } else {
      await navigator.clipboard.writeText(shareUrl)
      alert('링크가 복사되었습니다! 💝')
    }
  } catch (err) {
    if (err.name === 'AbortError') return
    
    const textArea = document.createElement('textarea')
    textArea.value = shareUrl
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    
    try {
      document.execCommand('copy')
      alert('링크가 복사되었습니다! 💝')
    } catch {
      alert('공유에 실패했습니다.')
    }
    
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
.share-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.share-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 30px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(255, 181, 216, 0.3);
  text-align: center;
  animation: slideUp 0.6s ease;
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

.emoji-big {
  font-size: 6rem;
  margin-bottom: 1.5rem;
  animation: bounce 1s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.type-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.one-liner {
  font-size: 1.2rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.6;
  word-break: keep-all;
}

.key-points {
  background: linear-gradient(135deg, #FFF8FC 0%, #F8F5FF 100%);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.point-item {
  font-size: 1.05rem;
  color: #333;
  font-weight: 600;
  margin: 0.8rem 0;
  text-align: left;
  line-height: 1.6;
}

.best-match {
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  border-radius: 15px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.match-label {
  font-size: 0.95rem;
  color: #C4A5FF;
  font-weight: 700;
}

.match-name {
  font-size: 1.1rem;
  color: #FFB5D8;
  font-weight: 800;
}

.hashtags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.tag {
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  color: #C4A5FF;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.cta-buttons {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.full-result-btn,
.test-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.full-result-btn {
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  color: white;
}

.test-btn {
  background: white;
  color: #FFB5D8;
  border: 2px solid #FFB5D8;
}

.full-result-btn:hover,
.test-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 181, 216, 0.3);
}

.share-btn {
  width: 100%;
  padding: 1rem;
  border: 2px solid #FFE5F3;
  border-radius: 15px;
  background: white;
  color: #C4A5FF;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: #FFF8FC;
  transform: translateY(-2px);
}

.bottom-text {
  margin-top: 2rem;
  color: #999;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .share-card {
    padding: 2.5rem 1.5rem;
  }
  
  .emoji-big {
    font-size: 5rem;
  }
  
  .type-title {
    font-size: 2rem;
  }
  
  .one-liner {
    font-size: 1.1rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
}
</style>