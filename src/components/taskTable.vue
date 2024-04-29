<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter} from "vue-router"
import { getTask } from "../libs/fetchs.js"
import taskDetail from '../components/taskDetail.vue'
let taskData = ref([])
let taskId = ref(null)
//let modalCheck = ref(false)
const router = useRouter()
const route = useRoute()
const status = {
    TO_DO : "To Do",
    NO_STATUS : "No Status",
    DONE : "Done",
    DOING : "Doing"
}
async function fetchData() {
    taskData.value = await getTask("tasks")
}
onMounted(fetchData)
function openModal(taskId) {
    router.push(`/task/${taskId}`) 
}


</script>

<template>
    <div class="class name : itbkk-">
        <div
            class="bg-[#583d72] flex justify-center items-center h-20 text-24 text-white"
        >
            <h1>IT-Bangmod Kradan Kanban (ITB-KK)</h1>
        </div>
        <div class="flex justify-center">
            <table
                class="table table-auto table-zebra w-[80%] h-[10%] max-h-10 mt-2"
            >
                <thead class="text-xl">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Assignees</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody class="text-base">
                    <tr
                        class="itbkk-item"
                        @click="openModal(task.id)"
                        v-show="taskData.length > 0"
                        v-for="(task, index) in taskData"
                        :key="index"
                    >
                        <td>{{ task.id }}</td>
                        <td class="itbkk-title">{{ task.title }}</td>
                        <td>
                            <span class="" :class="{ 'italic text-gray-400' : !task.assignees ,'itbkk-assignees' : !route.params.id }"
                                > {{ !task.assignees ? "Unassigned" : task.assignees }}</span
                            >
                           
                        </td>
                        <td class="itbkk-status">{{ status[task.status] }}</td>
                    </tr>
                </tbody>
                <tbody v-show="taskData.length === 0" class="w-screen">
                    <tr>
                        <td>Don't Have Task ??</td>
                    </tr>
                </tbody>
            </table>
        </div>

    <router-view/>
    </div>
</template>

<style scoped>
.button {
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;

    display: inline-block;
    padding: 15px 25px;
    background-image: linear-gradient(to right, #cc2e5d, #ff5858);
    border-radius: 8px;

    color: #fff;
    font-size: 15px;
    font-weight: 700;

    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    transition: 0.4s ease-out;

    &:hover {
        background-image: linear-gradient(to top, #008000, #5863ff);
        box-shadow: 6px 6px rgba(253, 5, 199, 0.6);
    }
}
</style>
