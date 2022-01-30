import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  createWebHashHistory,
  RouteLocationNormalized
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: import('../views/Home.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: import('../views/Game.vue')
  },
  {
    path:"/user",
    name:"User",
    component: import('../views/Profile.vue')
  },
  {
    path:"/notification",
    name:"Notification",
    component: import('../views/Notification.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const user = localStorage.getItem('user')
    if (to.meta.type === 'login' && user) {
      next({ name: 'home' })
      return
    }

    if (to.meta.type === 'home' && !user) {
      next({ name: 'login' })
      return
    }

    next()
  }
)

export default router