import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../pages/SignIn'
import ConfigManagement from '../pages/ConfigManagement'

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
