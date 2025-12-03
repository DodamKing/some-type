<template>
  <div class="test-container">
    <!-- 상단 고정 영역 -->
    <div class="header-fixed">
      <div class="progress-wrapper">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-text">
          <span class="current">{{ currentQuestion + 1}}</span>
          <span class="divider">/</span>
          <span class="total">20</span>
        </div>
      </div>
    </div>

    <!-- 질문 영역 -->
    <div class="question-wrapper">
      <!-- 고정 배경 (항상 보임) -->
      <div class="question-placeholder">
        <div class="placeholder-bubble"></div>
        <div class="placeholder-options">
          <div class="placeholder-option"></div>
          <div class="placeholder-option"></div>
          <div class="placeholder-option"></div>
        </div>
      </div>

      <!-- 실제 질문 내용 (위에 올라감) -->
      <transition name="fade" mode="out-in">
        <div :key="currentQuestion" class="question-content">
          <!-- 질문 말풍선 -->
          <div class="question-bubble">
            <div class="bubble-emoji">💭</div>
            <h2 class="question-text">{{ currentQuestionData.text }}</h2>
          </div>

          <!-- 선택지들 -->
          <div class="options">
            <button
              v-for="(option, index) in currentQuestionData.options"
              :key="index"
              :class="['option-bubble', { selected: isSelected(index) }]"
              @click="selectOption(option.scores, index)"
            >
              <span class="option-number">{{ String.fromCharCode(65 + index) }}</span>
              <span class="option-text">{{ option.label }}</span>
              <span v-if="isSelected(index)" class="check-mark">✓</span>
            </button>
          </div>

          <!-- 뒤로가기 버튼 -->
          <button 
            v-if="currentQuestion > 0"
            class="back-button"
            @click="goBack"
          >
            <span class="back-arrow">←</span>
            <span>이전 질문</span>
          </button>
        </div>
      </transition>
    </div>

    <!-- 로딩 화면 -->
    <transition name="fade">
      <LoadingView v-if="showLoading" />
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { questions } from '../data/questions'
import { ScoreCalculator } from '../utils/scoreCalculator'
import LoadingView from '../components/LoadingView.vue'

const router = useRouter()
const calculator = new ScoreCalculator()

const currentQuestion = ref(0)
const answerHistory = ref([])
const selectedOptions = ref([])
const showLoading = ref(false)

const currentQuestionData = computed(() => {
  return questions[currentQuestion.value]
})

const progressPercent = computed(() => {
  return ((currentQuestion.value + 1) / 20) * 100
})

const currentSelectedOption = computed(() => {
  return selectedOptions.value[currentQuestion.value]
})

const selectOption = (scores, optionIndex) => {
  answerHistory.value[currentQuestion.value] = scores
  selectedOptions.value[currentQuestion.value] = optionIndex
  
  calculator.reset()
  answerHistory.value.forEach(answer => {
    if (answer) {
      calculator.addScore(answer)
    }
  })
  
  setTimeout(() => {
    if (currentQuestion.value === 19) {
      showLoading.value = true
      
      setTimeout(() => {
        const finalType = calculator.getFinalType()
        router.push({
          path: '/result',
          query: { type: finalType }
        })
      }, 2500)
    } else {
      currentQuestion.value++
    }
  }, 500)
}

const goBack = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

const isSelected = (optionIndex) => {
  return currentSelectedOption.value === optionIndex
}
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF0F7 0%, #F0E6FF 100%);
  padding-bottom: 40px;
  position: relative;
}

/* 상단 고정 영역 */
.header-fixed {
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #FFF0F7 0%, rgba(255, 240, 247, 0.95) 100%);
  backdrop-filter: blur(10px);
  padding: 20px;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(255, 181, 216, 0.1);
}

.progress-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(255, 181, 216, 0.2);
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFB5D8 0%, #C4A5FF 100%);
  border-radius: 20px;
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.current {
  color: #FFB5D8;
  font-size: 1.2rem;
}

.divider {
  color: var(--text-secondary);
  margin: 0 0.3rem;
}

.total {
  color: var(--text-secondary);
}

/* 질문 영역 */
.question-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 고정 배경 플레이스홀더 (깜박임 방지) */
.question-placeholder {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 650px;
  width: calc(100% - 40px);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
}

.placeholder-bubble {
  background: white;
  border-radius: 30px;
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  min-height: 200px;
  box-shadow: 0 8px 30px rgba(255, 181, 216, 0.2);
}

.placeholder-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.placeholder-option {
  background: white;
  border-radius: 25px;
  padding: 1.5rem 1.8rem;
  min-height: 80px;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.15);
}

/* 실제 질문 내용 */
.question-content {
  max-width: 650px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* 질문 말풍선 */
.question-bubble {
  background: white;
  border-radius: 30px;
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 30px rgba(255, 181, 216, 0.2);
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.question-bubble::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
}

.bubble-emoji {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.6;
  text-align: center;
  word-break: keep-all;
}

/* 선택지들 */
.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-bubble {
  background: white;
  border: 3px solid transparent;
  border-radius: 25px;
  padding: 1.5rem 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.15);
  position: relative;
  overflow: hidden;
  min-height: 80px;
}

.option-bubble::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #FFB5D8 0%, #C4A5FF 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.option-bubble > * {
  position: relative;
  z-index: 1;
}

.option-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  background: linear-gradient(135deg, #FFE5F3 0%, #F3E5FF 100%);
  border-radius: 50%;
  font-weight: 800;
  font-size: 1rem;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.option-text {
  flex: 1;
  text-align: left;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
  word-break: keep-all;
  transition: color 0.3s ease;
}

.check-mark {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.option-bubble:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(255, 181, 216, 0.3);
  border-color: #FFB5D8;
}

.option-bubble.selected {
  border-color: #FFB5D8;
}

.option-bubble.selected::before {
  opacity: 1;
}

.option-bubble.selected .option-number {
  background: white;
  color: #FFB5D8;
}

.option-bubble.selected .option-text {
  color: white;
}

/* 뒤로가기 버튼 */
.back-button {
  width: 100%;
  padding: 1rem;
  background: white;
  border: 2px solid #FFE5F3;
  color: var(--text-secondary);
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 181, 216, 0.1);
}

.back-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.back-button:hover {
  background: #FFF5FA;
  border-color: #FFB5D8;
  color: var(--text-primary);
  transform: translateY(-2px);
}

.back-button:hover .back-arrow {
  transform: translateX(-5px);
}

.back-button:active {
  transform: translateY(0);
}

/* 페이드 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .header-fixed {
    padding: 15px;
  }

  .question-bubble {
    padding: 2rem 1.5rem;
    min-height: 180px;
  }

  .bubble-emoji {
    font-size: 2rem;
  }

  .question-text {
    font-size: 1.3rem;
  }

  .option-bubble {
    padding: 1.3rem 1.5rem;
  }

  .option-text {
    font-size: 1rem;
  }
}
</style>