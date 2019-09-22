import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/parallel'
Vue.component('chart', ECharts)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBTpCK30dTuxtWThfcPVstHZ2znu7qTo5s",
  authDomain: "wdemo19.firebaseapp.com",
  databaseURL: "https://wdemo19.firebaseio.com",
  projectId: "wdemo19",
  storageBucket: "",
  messagingSenderId: "938365317826",
  appId: "1:938365317826:web:d9b4bdeadc3e1d5bde015b"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
