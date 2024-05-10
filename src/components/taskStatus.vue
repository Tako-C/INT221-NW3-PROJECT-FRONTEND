<script setup>
import { ref, onMounted, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getData } from "../libs/fetchs.js"
import { useStore } from "../stores/store.js"
import { removeTaskById } from "@/libs/fetchs.js"

import modalNotification from '../components/modals/modalNotification.vue'
import modalconfirmed from '../components/modals/modalConfirmed.vue'

const taskStore = useStore()
let statusData = ref([])
const router = useRouter()
const route = useRoute()
const optionsDropDownIndex = ref(null)
const errorDelete = ref(false)
const successDelete = ref(false)
const openConfirmed= ref(false)
const taskTitle = ref("")
const taskID = ref("")


async function fetchData() {
    statusData.value = await getData("statuses")
    taskStore.statuss.push(...statusData.value)
    console.log(...taskStore.statuss)

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

    <div class="class name : itbkk- bg-gradient-to-b from-[#fff2d3] from-40% to-pink-500 w-screen h-screen">
        <header
            name="header"
            class="fixed top-0 z-10 w-screen bg-[#628765] flex justify-center items-center h-20 text-24 text-white"
        >
            <h1 class="text-3xl font-bold font-serif">
                IT-Bangmod Kradan Kanban (ITB-KK)
            </h1>
        </header>

        <!-- The button to open modal -->

        <main class="flex flex-col justify-center h-screen ml-[20%] hover:overflow-y-auto overflow-hidden">
            <div class="mt-28 ml-10 mb-5"><span><a href="http://localhost:5173/task">Home</a></span> > task table</div>
            <table class="table w-auto bg-white mb-28">
                <thead class="text-xl font-serif h-20">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                        <div class="itbkk-button-add add-Button h-16 flex items-center justify-center">
                            <img class="itbkk-button-add add-Button" src="@/assets/plus.svg" @click="addModal()" />
                        </div>
                    </tr>
                </thead>
                <tbody class="text-base ">
                    <tr
                        class="itbkk-item hover-table"
                        v-show="taskStore.statuss.length > 0"
                        v-for="(status, index) in taskStore.statuss"
                        :key="index"
                    >
                        <td @click="openModal(status.id)">{{ status.id }}</td>
                        <td @click="openModal(status.id)" class="itbkk-title">
                            {{ status.statusName }}
                        </td>
                        
                        <td @click="openModal(status.id)" >
                            <p class="itbkk-status rounded-2xl m-1 p-2"  
                            >
                            {{ status.statusDescription }}</p>
                            
                        </td>
                        <td>
                            <div class="itbkk-button-action relative">
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
                                                class="itbkk-button-edit block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg"
                                            >
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                @click="openConfirmModal(task.id,task.title)"
                                                class="itbkk-button-delete block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg"
                                            >
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-show="taskStore.statuss.length === 0">
                    <tr>
                        <td class="text-center" colspan="4">
                            Don't Have status ??
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
    <router-view />
</template>

<style scoped>
.hover-font-table {
    opacity: 30%;
    
    &:hover {
        opacity: 100%;
        transition: 0.3s;
        color: blue;
    }
    
}

.hover-table:hover {
    background-color: rgba(207, 207, 207, 0.5);
    transition: 0.3s;
}

.add-Button {
    opacity: 30%;
    width: 40px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
        /* background-color: #cc2e5d; */
        opacity: 100%;
        transition: 0.5s;
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
