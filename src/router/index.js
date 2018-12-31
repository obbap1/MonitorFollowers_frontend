
import Login from '@/pages/login'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes:[
        {
          path: '/',
          name: 'Login',
          component: Login
        }
      ]
})

export default router