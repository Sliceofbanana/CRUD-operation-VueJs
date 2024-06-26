import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/View.vue'
import ProductsCreate from '../views/Products/Create.vue'
import ProductsEdit from '../views/Products/Update.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView,
    },
    {
      path: '/products/create',
      name: 'product',
      component: ProductsCreate,
    },
    {
      path: '/products/:id/edit',
      name: 'productEdit',
      component: ProductsEdit,
    },
  ]
})

export default router
