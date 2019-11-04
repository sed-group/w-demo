import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'
import Bike from './components/Bike.vue'
import Mug from './components/Mug.vue'
import Results from './components/Results.vue'
import MugResults from './components/MugResults.vue'
import Kayak from './components/Kayak.vue'

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
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/bike',
      name: 'Bike',
      component: Bike,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/mug',
      name: 'Mug',
      component: Mug,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/results',
      name: 'Results',
      component: Results,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/mugresults',
      name: 'MugResults',
      component: MugResults,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/kayak',
      name: 'Kayak',
      component: Kayak,
      meta: {
        requiresAuth: false
      }
    },
  ]
})


export default router