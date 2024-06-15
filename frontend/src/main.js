import Vue from 'vue'
import App from './App'
import store from './store';
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { initializeToken } from './services/apiService';

Vue.config.productionTip = false
initializeToken()

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
