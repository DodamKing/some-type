import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: () => import('../views/IntroView.vue'),
      meta: { title: '썸타입 - 나의 연애 성향 테스트' },
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
      meta: { title: '테스트 진행 중 - 썸타입' },
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue'),
      meta: { title: '결과 확인 - 썸타입' },
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('../views/ShareView.vue'),
      meta: { title: '결과 공유 - 썸타입' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: '페이지를 찾을 수 없습니다 - 썸타입' },
    },
  ],
})

// 페이지 이동 시 타이틀 변경
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '썸타입'
  next()
})

export default router
