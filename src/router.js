import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Tests from './components/Tests.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Tests',
      component: Tests,
      meta: {
        requiresAuth: false
      }
    },
  ]
})


export default router