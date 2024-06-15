import Vue from 'vue';
import Router from 'vue-router';
import ConfigManagement from '../pages/ConfigManagement.vue';
import SignIn from '../pages/Login.vue';
import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/',
      name: 'ConfigManagement',
      component: ConfigManagement,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated;
    if (!isAuthenticated) {
      next({
        path: '/sign-in',
        query: { redirect: to.fullPath }
      });
      store.dispatch('showToast', { type: 'error', message: 'Please log in to access this page.' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
