import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Router from 'vue-router';
import Notifications from 'vue-notification';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
// import auth from '@/services/auth';
import Home from '@/components/Home';
import ArticleList from '@/components/ArticleList';
import NotFoundComponent from '@/components/NotFoundComponent';

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
      component: Home,
      sidebar: true,
    },
    {
      path: '/articles',
      component: ArticleList,
      sidebar: false,
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
      component: NotFoundComponent,
    },
  ],
});
