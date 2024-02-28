import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/dishes',
      name: 'dishes',
      props: true,
      children: [
        {
          path: '',
          name: 'list',
          props: true,
          component: () => import('../views/DishesPage.vue')
        },
        {
          path: 'new',
          name: 'newdish',
          props: true,
          component: () => import('@/components/NewDishForm.vue')
        },
        {
          path: ':id',
          name: 'viewdish',
          props: true,
          component: () => import('@/components/ViewDish.vue')
        },
        {
          path: ':id/edit',
          name: 'editdish',
          props: true,
          component: () => import('@/components/EditDishForm.vue')
        }
      ]
    }
  ]
})

export default router
