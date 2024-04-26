import { createRouter, createWebHistory } from "vue-router"
import taskTable from "../components/taskTable.vue"
import taskDetail from "../components/taskDetail.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/task",
            name: "taskTable",
            // component: taskTable,
            component: taskTable, children:[{ path: ":id", component: taskDetail}],
        },
            // component: taskTable, children:[{ path: ":id", component: taskDetail,props:true }],
    //     {
    //       path: "/task/:taskid",
    //       name: "taskTable",
    //       component: taskTable,
    //       props: true
    //   },
        {
            path: "/",
            redirect: "/task",
        },
        {
            path: "/task:catchAll(.*)",
            redirect: "/task",
        },
    ]
})


export default router
