import { createRouter, createWebHistory } from 'vue-router'
import taskTable from "../components/taskTable.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'taskTable',
      component: taskTable
    }
  ]
})

export default router
