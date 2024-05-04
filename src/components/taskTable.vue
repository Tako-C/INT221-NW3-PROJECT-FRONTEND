<script setup>
import { ref, onMounted, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getTask } from "../libs/fetchs.js"
import { useTaskStore } from "../stores/store.js"
import { removeTaskById } from "@/libs/fetchs.js"

import modalNotification from '../components/modals/modalNotification.vue'
import modalconfirmed from '../components/modals/modalConfirmed.vue'

const taskStore = useTaskStore()
let taskData = ref([])
const router = useRouter()
const route = useRoute()
const optionsDropDownIndex = ref(null)
const errorDelete = ref(false)
const successDelete = ref(false)
const openConfirmed= ref(false)
const taskTitle = ref("")
const taskID = ref("")

const status = {
    TO_DO: "To Do",
    NO_STATUS: "No Status",
    DONE: "Done",
    DOING: "Doing",
}

async function fetchData() {
    taskData.value = await getTask("tasks")
    taskStore.tasks.push(...taskData.value)
    // console.log(...taskStore.tasks)
}

function toggleDropDown(index) {
    optionsDropDownIndex.value =
        optionsDropDownIndex.value === index ? null : index
}

async function removeTask() {
    optionsDropDownIndex.value = null
    openConfirmed.value = false
    console.log(taskID.value);
    // const confirmed = window.confirm(`Are you sure to delete task?${taskTitle}`)

        let result = await removeTaskById(taskID.value)
        console.log("result",result)
        if (result.status === 404) {
            console.log("result :", result.status)
            errorDelete.value = true
        }
        taskStore.tasks = taskStore.tasks.filter((task) => task.id !== taskID.value) 
        successDelete.value = true
        console.log(successDelete.value);
                
}

function addModal() {
    router.push(`/task/add`)
}

function editModal(taskId) {
    router.push(`/task/${taskId}/edit`)
    optionsDropDownIndex.value = null
}
function openModal(taskId) {
    router.push(`/task/${taskId}`)
    optionsDropDownIndex.value = null
}

function closeModalNotification() {
    errorDelete.value = false
    successDelete.value = false
    taskStore.successUpdate =false
    taskStore.errorUpdate = false
    taskStore.errorUpdate = false
    taskStore.successAdd = false
    openConfirmed.value = false
    taskTitle.value = ""
    taskID.value = ""
    
}
function openConfirmModal(id,title) {
    openConfirmed.value = true
    taskTitle.value = title
    taskID.value = id
}
onMounted(fetchData)

// ส่วนที่เกี่ยวข้องกับการแสดงmodal หลังจาก add remove update
// watchEffect(() => {
//     if (taskStore.successModalVisible === true) {
//         setTimeout(() => {
//             taskStore.successModalVisible = false
//         }, 3000)
//     }
// })
</script>

<template>
    <modalNotification :errorDelete="errorDelete" :successDelete="successDelete"
     @closemodal="closeModalNotification()"
     v-show="taskStore.successAdd === true || taskStore.errorUpdate === true || taskStore.successUpdate === true || errorDelete === true || successDelete === true"
     class="z-30"/>
     
    <modalconfirmed v-show="openConfirmed"
    :taskTitle="taskTitle"
    @closemodal="closeModalNotification()"
    @confirmed="removeTask()"
    class="z-40"
    />

    <div class="class name : itbkk- bg-[#fff2d3] w-full h-auto">
        <header
            name="header"
            class="fixed top-0 z-10 w-screen bg-[#6a746b] flex justify-center items-center h-20 text-24 text-white"
        >
            <h1 class="text-3xl font-bold font-serif">
                IT-Bangmod Kradan Kanban (ITB-KK)
            </h1>
        </header>

        <!-- The button to open modal -->

        <main class="flex justify-center pb-[20%]">
            <table class="table w-[80%] bg-white mt-28">
                <thead class="text-xl font-serif h-20">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Assignees</th>
                        <th>Status</th>
                        <div class="add-Button">
                            <img src="@/assets/plus.svg" @click="addModal()" />
                        </div>
                    </tr>
                </thead>
                <tbody class="text-base">
                    <tr
                        class="itbkk-item hover-table"
                        v-show="taskStore.tasks.length > 0"
                        v-for="(task, index) in taskStore.tasks"
                        :key="index"
                    >
                        <td @click="openModal(task.id)">{{ task.id }}</td>
                        <td @click="openModal(task.id)" class="itbkk-title">
                            {{ task.title }}
                        </td>
                        <td @click="openModal(task.id)">
                            <span
                                class=""
                                :class="{
                                    'italic text-gray-400': !task.assignees,
                                    'itbkk-assignees': !route.params.id,
                                }"
                            >
                                {{
                                    !task.assignees
                                        ? "Unassigned"
                                        : task.assignees
                                }}</span
                            >
                        </td>
                        <td @click="openModal(task.id)" class="itbkk-status">
                            {{ status[task.status] }}
                        </td>
                        <td>
                            <div class="relative">
                                <img
                                    src="@/assets/optionIcon.svg"
                                    alt="Options"
                                    @click="toggleDropDown(index)"
                                    class="cursor-pointer"
                                />
                                <div
                                    v-if="optionsDropDownIndex === index"
                                    class="absolute w-32 bg-white border rounded-lg shadow-lg z-10"
                                >
                                    <ul class="divide-y divide-gray-200">
                                        <li>
                                            <a
                                                href="#"
                                                @click="editModal(task.id)"
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg"
                                            >
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                @click="openConfirmModal(task.id,task.title)"
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg"
                                            >
                                                Remove
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-show="taskStore.tasks.length === 0">
                    <tr>
                        <td class="text-center" colspan="4">
                            Don't Have Task ??
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
    <router-view />
</template>

<style scoped>
.itbkk-status {
    color: #ff5858;
}

.hover-table:hover {
    background-color: rgba(207, 207, 207, 0.5);
    transition: 0.3s;
    color: blue;
}

.add-Button {
    width: 40px;
    margin-top: 5px;
    margin-left: 5px;
    cursor: pointer;

    &:hover {
        background-color: #cc2e5d;
    }
}

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
.div-class-name {
    height: 50vh;
}
</style>
