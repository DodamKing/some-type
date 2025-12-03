<template>
  <div class="result-container">
    <div class="result-content">
      <div class="result-card">
        <div class="emoji">{{ resultData.emoji }}</div>
        <h1 class="type-name">{{ resultData.name }}</h1>
        <p class="subtitle">{{ resultData.subtitle }}</p>
        
        <div class="description">
          <h3>연애 스타일</h3>
          <p>{{ resultData.description }}</p>
        </div>

        <div class="success-rate">
          <h3>썸 성공률</h3>
          <div class="rate-number">⭐ {{ resultData.successRate }}%</div>
          <p class="rate-comment">{{ resultData.comment }}</p>
        </div>

        <div class="buttons">
          <button class="restart-button" @click="restart">
            다시 테스트
          </button>
          <button class="share-button" @click="share">
            링크 복사
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { results } from '../data/results'

const router = useRouter()
const route = useRoute()

const resultType = computed(() => {
  return route.query.type || 'A'
})

const resultData = computed(() => {
  return results[resultType.value]
})

const restart = () => {
  router.push('/')
}

const share = async () => {
//   const shareText = `나는 ${resultData.value.emoji} ${resultData.value.name}! 썸 성공률 ${resultData.value.successRate}%! 너는 어때?\n${window.location.origin}`
  const shareUrl = window.location.origin
  
  try {
    // await navigator.clipboard.writeText(shareText)
    await navigator.clipboard.writeText(shareUrl)
    alert('링크가 복사되었습니다!')
  } catch {
    alert('링크 복사에 실패했습니다.')
  }
}
</script>

<style scoped>
.result-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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

.result-content {
  width: 100%;
  max-width: 650px;
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card {
  background: white;
  border-radius: 25px;
  padding: 3.5rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.emoji {
  font-size: 6rem;
  margin-bottom: 1.5rem;
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s backwards;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.type-name {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.8rem;
  animation: fadeIn 0.6s ease 0.4s backwards;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.15rem;
  color: #718096;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  animation: fadeIn 0.6s ease 0.5s backwards;
  font-weight: 400;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.description {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 18px;
  padding: 2rem;
  margin-bottom: 1.8rem;
  text-align: left;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  animation: fadeInUp 0.6s ease 0.6s backwards;
  transition: transform 0.3s ease;
}

.description:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
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

.description h3 {
  font-size: 1.15rem;
  color: #667eea;
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.description h3::before {
  content: '💝';
  font-size: 1.2rem;
}

.description p {
  font-size: 1.05rem;
  color: #2d3748;
  line-height: 1.8;
  font-weight: 400;
}

.success-rate {
  background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
  border-radius: 18px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  text-align: left;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #fed7d7;
  animation: fadeInUp 0.6s ease 0.7s backwards;
  transition: transform 0.3s ease;
}

.success-rate:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.success-rate h3 {
  font-size: 1.15rem;
  color: #667eea;
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.success-rate h3::before {
  content: '📊';
  font-size: 1.2rem;
}

.rate-number {
  font-size: 2.2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  animation: scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s backwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.rate-comment {
  font-size: 1.05rem;
  color: #2d3748;
  line-height: 1.8;
  font-weight: 400;
}

.buttons {
  display: flex;
  gap: 1.2rem;
  animation: fadeIn 0.6s ease 0.9s backwards;
}

.restart-button,
.share-button {
  flex: 1;
  padding: 1.2rem;
  border: none;
  border-radius: 18px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.restart-button::before,
.share-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.restart-button:hover::before,
.share-button:hover::before {
  width: 300px;
  height: 300px;
}

.restart-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.restart-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

.share-button {
  background: white;
  color: #667eea;
  border: 2.5px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.share-button:hover {
  background: #667eea;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.restart-button:active,
.share-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .result-card {
    padding: 3rem 2rem;
  }

  .emoji {
    font-size: 5rem;
  }

  .type-name {
    font-size: 1.9rem;
  }

  .subtitle {
    font-size: 1.05rem;
  }

  .rate-number {
    font-size: 2rem;
  }

  .buttons {
    flex-direction: column;
  }
}
</style>