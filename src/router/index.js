import { createRouter, createWebHistory } from 'vue-router'
import taskTable from "../components/taskTable.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/task',
      name: 'taskTable',
      component: taskTable
    },
    {
      path: '/',
      redirect: "/task"
    }
    ,
  {
    path: "/:catchAll(.*)",
    redirect: "/task"
  }
  ]
})

export default router
