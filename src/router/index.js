import Vue from 'vue';
import Router from 'vue-router';
import PIoNY from '@/components/PIoNY';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PIoNY',
      component: PIoNY,
    },
  ],
});
