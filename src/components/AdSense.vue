<template>
  <div class="adsense-container">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-7892198097991803"
         data-ad-slot="5668698995"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, nextTick } from 'vue'

let adPushed = false

onMounted(async () => {
  // DOM 완전히 렌더링될 때까지 대기
  await nextTick()
  
  // 추가 지연 (레이아웃 안정화)
  setTimeout(() => {
    try {
      if (!adPushed && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        adPushed = true
      }
    } catch (e) {
      console.error('❌ AdSense error:', e)
    }
  }, 300)
})

onBeforeUnmount(() => {
  adPushed = false
})
</script>

<style scoped>
.adsense-container {
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  display: block;
}

/* ins 태그 너비 강제 */
.adsbygoogle {
  display: block !important;
  width: 100% !important;
}
</style>