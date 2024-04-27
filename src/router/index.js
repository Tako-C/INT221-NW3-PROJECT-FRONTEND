import { createRouter, createWebHistory } from "vue-router"
import taskTable from "../components/taskTable.vue"
import taskDetail from "../components/taskDetail.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/tasks",
            name: "taskTable",
            component: taskTable, children:[{ path: ":id", component: taskDetail}],
        },
        {
            path: "/",
            redirect: "/tasks",
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/tasks",
        },
    ]
})


export default router
