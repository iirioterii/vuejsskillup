import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Router from 'vue-router';
import Notifications from 'vue-notification';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
// import auth from '@/services/auth';

// Check the users auth status when the app starts
// auth.checkAuth();

Vue.use(VeeValidate);
Vue.use(Router);
Vue.use(Notifications);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: HelloWorld,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
