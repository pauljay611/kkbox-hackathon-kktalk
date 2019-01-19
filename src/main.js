import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import $ from 'jquery'
import 'bootstrap'


// import 'bootstrap/dist/js/bootstrap'
import 'bootstrap';

// import plugins individually - require exports-loader
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/scss/bootstrap.scss'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAeBDVgFf35IpZhlaCytMldLXVNgCEOS8Y",
  authDomain: "kkbox-project.firebaseapp.com",
  databaseURL: "https://kkbox-project.firebaseio.com",
  projectId: "kkbox-project",
  storageBucket: "kkbox-project.appspot.com",
  messagingSenderId: "646013785232"
};
firebase.initializeApp(config);

Vue.prototype.$firebase = firebase;

import vueMoment from 'vue-moment';
Vue.use(vueMoment);
// jquery
global.$ = $
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
