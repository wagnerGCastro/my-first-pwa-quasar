/* eslint-disable */
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '',           name: 'home',     component: () =>import('pages/Index.vue')},
      {path: '/login',     name: 'login',    component: () => import('pages/Login.vue')}
    ]
  },

  {path: '*',     name: 'login',    component: () => import('pages/Error404.vue')}
]

export default routes
