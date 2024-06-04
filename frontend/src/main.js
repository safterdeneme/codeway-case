import Vue from 'vue'
import App from './App'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { initializeToken } from './services/apiService';

Vue.config.productionTip = false
//
initializeToken()

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
