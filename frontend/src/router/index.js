import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../pages/signin.vue'
import ConfigManagement from '../pages/ConfigManagement.vue'

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
