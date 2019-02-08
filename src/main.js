import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'
import 'bootstrap'

// import 'bootstrap/dist/js/bootstrap'

// import plugins individually - require exports-loader
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/scss/bootstrap.scss'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import * as firebase from 'firebase'

import vueMoment from 'vue-moment'
import store from './store'
import router from './router'
import App from './App.vue'

Vue.use(VueMaterial)
const config = {
  apiKey: 'AIzaSyAeBDVgFf35IpZhlaCytMldLXVNgCEOS8Y',
  authDomain: 'kkbox-project.firebaseapp.com',
  databaseURL: 'https://kkbox-project.firebaseio.com',
  projectId: 'kkbox-project',
  storageBucket: 'kkbox-project.appspot.com',
  messagingSenderId: '646013785232'
}
firebase.initializeApp(config)

Vue.prototype.$firebase = firebase
Vue.use(vueMoment)
// jquery
global.$ = $
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
