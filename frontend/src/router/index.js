import Vue from 'vue'
import Router from 'vue-router'
import ConfigManagement from '../pages/ConfigManagement.vue'
import SignIn from '../pages/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/',
      name: 'ConfigManagement',
      component: ConfigManagement
    }
  ]
})
