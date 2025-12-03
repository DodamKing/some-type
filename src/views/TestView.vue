<template>
  <div class="test-container">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
    
    <div class="progress-text">{{ currentQuestion + 1 }} / 20</div>

    <div class="question-wrapper">
      <transition name="fade" mode="out-in">
        <div :key="currentQuestion" class="question-card">
          <h2 class="question-text">{{ currentQuestionData.text }}</h2>
          
          <div class="options">
            <button
                v-for="(option, index) in currentQuestionData.options"
                :key="index"
                :class="['option-button', { selected: isSelected(index) }]"
                @click="selectOption(option.scores, index)"
            >
                <span class="option-text">{{ option.label }}</span>
                <span v-if="isSelected(index)" class="check-mark">✓</span>
            </button>
        </div>

          <!-- 뒤로가기 버튼 (첫 질문이 아닐 때만 표시) -->
          <button 
            v-if="currentQuestion > 0"
            class="back-button"
            @click="goBack"
          >
            ← 이전 질문
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
const answerHistory = ref([]) // 답변 기록 저장
const selectedOptions = ref([]) // 각 질문별 선택한 옵션 인덱스 저장
const showLoading = ref(false)

const currentQuestionData = computed(() => {
  return questions[currentQuestion.value]
})

const progressPercent = computed(() => {
  return ((currentQuestion.value + 1) / 20) * 100
})

// 현재 질문에서 선택된 옵션 인덱스
const currentSelectedOption = computed(() => {
  return selectedOptions.value[currentQuestion.value]
})

const selectOption = (scores, optionIndex) => {
  // 답변 기록 저장
  answerHistory.value[currentQuestion.value] = scores
  selectedOptions.value[currentQuestion.value] = optionIndex
  
  // 이미 점수가 있으면 초기화 후 다시 계산 (수정된 답변 대응)
  calculator.reset()
  answerHistory.value.forEach(answer => {
    if (answer) {
      calculator.addScore(answer)
    }
  })
  
  // 0.5초 딜레이 후 다음 질문으로 (체크 효과 보여주기)
  setTimeout(() => {
    // 마지막 질문이면 로딩 화면 표시 후 결과로 이동
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
      // 다음 질문으로
      currentQuestion.value++
    }
  }, 500)
}

const goBack = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

// 옵션이 선택되었는지 확인
const isSelected = (optionIndex) => {
  return currentSelectedOption.value === optionIndex
}
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
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

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.progress-text {
  text-align: center;
  color: white;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
}

.question-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-card {
  background: white;
  border-radius: 25px;
  padding: 3rem 2.5rem;
  max-width: 650px;
  width: 100%;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
}

.question-text {
  font-size: 1.6rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.option-button {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 2.5px solid #e9ecef;
  padding: 1.4rem 1.8rem;
  border-radius: 18px;
  font-size: 1.05rem;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  line-height: 1.6;
  position: relative;
  overflow: hidden;
  font-weight: 500;
}

.option-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.option-button:hover::before {
  left: 100%;
}

.option-button:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.option-button:active {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 페이드 애니메이션 */
.fade-enter-active {
  animation: fadeInScale 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  animation: fadeOutScale 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOutScale {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@media (max-width: 768px) {
  .question-card {
    padding: 2.5rem 1.8rem;
  }

  .question-text {
    font-size: 1.4rem;
  }

  .option-button {
    padding: 1.2rem 1.4rem;
    font-size: 1rem;
  }
}

.back-button {
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.9rem;
  background: transparent;
  border: 2px solid #e9ecef;
  color: #718096;
  border-radius: 15px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.back-button:hover {
  background: #f8f9fa;
  border-color: #cbd5e0;
  color: #4a5568;
  transform: translateX(-3px);
}

.back-button:active {
  transform: translateX(-1px);
}

.option-button {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-button.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.option-text {
  flex: 1;
  text-align: left;
}

.check-mark {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
  animation: checkPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkPop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>