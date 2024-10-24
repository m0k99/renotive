import { createRouter, createWebHistory } from 'vue-router'
import ProductSList from '../views/ProductSList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ProductSList',
      component: ProductSList
    }
  ]
})

export default router
