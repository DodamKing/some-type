<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 스크롤바 커스텀 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5568d3 0%, #65398e 100%);
}

/* 선택 영역 색상 */
::selection {
  background: #667eea;
  color: white;
}

::-moz-selection {
  background: #667eea;
  color: white;
}

/* 버튼 포커스 아웃라인 제거 (접근성 유지하면서) */
button:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 3px;
}

button:focus:not(:focus-visible) {
  outline: none;
}

/* 전역 애니메이션 */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* 로딩 상태 (나중에 사용 가능) */
.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* 모바일 터치 하이라이트 제거 */
* {
  -webkit-tap-highlight-color: transparent;
}
</style>