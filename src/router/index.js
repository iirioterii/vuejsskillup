import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import { requireAuth, redirectIfLogged } from '@/services/auth';
import PageContainer from '@/components/PageContainer';
import Articles from '@/components/articles/Articles';
import NotFoundComponent from '@/components/NotFoundComponent';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { path: '/articles' },
      beforeEnter: requireAuth,
      component: PageContainer,
      children: [
        {
          path: '/articles',
          component: Articles,
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: redirectIfLogged,
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
