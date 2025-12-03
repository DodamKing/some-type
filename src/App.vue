<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
:root {
  --primary: #FFB5D8;
  --secondary: #C4A5FF;
  --accent: #FFE5B5;
  --bg-gradient-1: #FFF0F7;
  --bg-gradient-2: #F0E6FF;
  --text-primary: #4A3B5C;
  --text-secondary: #8B7BA8;
  --card-bg: #FFFFFF;
  --button-hover: #FFD4E9;
}

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
  background: linear-gradient(135deg, var(--bg-gradient-1) 0%, var(--bg-gradient-2) 100%);
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 스크롤바 커스텀 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-gradient-1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #FF9FCA 0%, #B594F0 100%);
}

/* 선택 영역 색상 */
::selection {
  background: var(--primary);
  color: white;
}

::-moz-selection {
  background: var(--primary);
  color: white;
}

/* 버튼 포커스 */
button:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 3px;
}

button:focus:not(:focus-visible) {
  outline: none;
}

/* 모바일 터치 하이라이트 제거 */
* {
  -webkit-tap-highlight-color: transparent;
}

/* 귀여운 말풍선 모양 */
.bubble {
  background: white;
  border-radius: 25px;
  position: relative;
  box-shadow: 0 8px 30px rgba(255, 181, 216, 0.2);
}

.bubble::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
}

/* 둥근 버튼 스타일 */
.cute-button {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 20px rgba(255, 181, 216, 0.4);
}

.cute-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 30px rgba(255, 181, 216, 0.5);
}

.cute-button:active {
  transform: translateY(-1px) scale(1.02);
}
</style>