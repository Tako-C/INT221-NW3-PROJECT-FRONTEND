import { createRouter, createWebHistory } from 'vue-router'
import taskTable from '../components/taskTable.vue'
import taskDetail from '../components/taskDetail.vue'
import taskAdd from '@/components/taskAdd.vue'
import taskEdit from '@/components/taskUpdate.vue'
import taskStatus from '@/components/taskStatus.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/task',
      name: 'taskTable',
      component: taskTable,
      children: [
        { path: ':id', component: taskDetail },
        {
          path: 'add',
          component: taskAdd,
        },
        {
          path: ':id/edit',
          component: taskEdit,
        },
      ],
    },
    {
      path: '/status/manage',
      name: 'taskStatus',
      component: taskStatus,
    },
    // {
    //     path: "/",
    //     redirect: "/task",
    // },
    {
      path: '/:catchAll(.*)',
      redirect: '/task',
    },
  ],
})

export default router
