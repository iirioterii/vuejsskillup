import Vue from 'vue';
import Router from 'vue-router';
import { requireAuth, redirectIfLogged } from './../services/auth';
import PageContainer from './../components/PageContainer';
import Articles from './../components/articles/Articles';
import NotFoundComponent from './../components/NotFoundComponent';
import Login from './../components/Login';
import Profile from './../components/Profile';

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
        {
          path: '/profile',
          component: Profile,
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
      component: Login,
    },
    {
      path: '*',
      component: NotFoundComponent,
    },
  ],
});
