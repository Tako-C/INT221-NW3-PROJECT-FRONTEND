<script setup>
import { ref, onMounted, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "@/stores/store.js"
import { removeById,getData } from "@/libs/fetchs.js"
 
import modalNotification from '@/components/modals/modalNotification.vue'
import modalconfirmed from '@/components/modals/modalConfirmed.vue'

const Store = useStore()
let taskData = ref([])
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
    taskData.value = await getData("tasks")
    Store.tasks.push(...taskData.value)
    statusData.value = await getData("statuses")
    Store.statuss.push(...statusData.value)
    console.log(Store.tasks)
    console.log(Store.statuss)
    
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
 
        let result = await removeById("tasks",taskID.value)
        console.log("result",result)
        if (result.status === 404) {
            console.log("result :", result.status)
            errorDelete.value = true
        }
        Store.tasks = Store.tasks.filter((task) => task.id !== taskID.value)
        successDelete.value = true
        console.log(successDelete.value);
               
}
 
function addModal() {
    // router.push(`/task/add`)
    router.push({ name: 'taskAdd'});
}
function switchToManage() {
    router.push(`/status`)
}
 
function editModal(taskId) {
    router.push(`/task/${taskId}/edit`)
    optionsDropDownIndex.value = null
}
function openModal(taskId) {
    // router.push(`/task/${taskId}`)
    router.push({ name: 'taskDetail', params: { id: taskId } });

    optionsDropDownIndex.value = null
}
 
function closeModalNotification() {
    errorDelete.value = false
    successDelete.value = false
    Store.successUpdateTask = false
    Store.errorUpdateTask = false
    Store.successAddTask = false
    openConfirmed.value = false
    taskTitle.value = ""
    taskID.value = ""
   
}
function openConfirmModal(id,title) {
    openConfirmed.value = true
    taskTitle.value = title
    taskID.value = id
}
function checkVariable() {
    if (Store.successAddTask == true || Store.errorUpdateTask == true 
    || Store.successUpdateTask == true || errorDelete.value === true 
    || successDelete.value === true ) {
        return true
    }
    return false 
}
onMounted(fetchData)

</script>
 
 
<template>
    <modalNotification :errorDelete="errorDelete" :successDelete="successDelete"
     @closemodal="closeModalNotification()"
     v-show="checkVariable()"
     class="z-30"/>
    <modalconfirmed v-show="openConfirmed"
    :taskTitle="taskTitle"
    @closemodal="closeModalNotification()"
    @confirmed="removeTask()"
    class="z-40"
    />
 
    <div class="class name : itbkk- bg-white w-screen h-screen">
        <header
            name="header"
            class="fixed top-0 z-10 w-screen bg-[#797979] flex justify-center items-center h-20 text-24 text-white"
        >
            <h1 class="text-3xl font-bold font-serif pl-[3%] titleShadow">
                IT-Bangmod Kradan Kanban (ITB-KK)
            </h1>
    
        </header>
 
        <!-- The button to open modal -->
 
        <main class="flex flex-col pt-[8%] h-screen ml-[10%] mr-[10%]  hover:overflow-y-auto overflow-hidden">
            <div class="flex mt-2 ml-10 mb-3 text-xl font-serif font-bold justify-end">
                <button class="button-manage" @click="switchToManage()">Status Manage</button>
                <button class="button-add" @click="addModal()">Add Task</button>
            </div>
            <!-- <div class="mt-2 ml-10 mb-3 text-xl font-serif font-bold text-right"><span><a href="http://localhost:5173/task" class="text-blue-500">Home</a></span> > task table</div> -->
            <table class="table table-zebra w-auto bg-white mt-2 mb-28">
                <thead class="bg-[#818080] text-white font-serif h-20 text-2xl titleShadow">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Assignees</th>
                        <th>Status</th>
                        <th class="pr-10 pl-10">Action</th>
                    </tr>
                </thead>
                <tbody class="text-base ">
                    <tr
                    class="itbkk-item hover-table border-[1px] rounded-2xl"
                        v-show="Store.tasks.length > 0"
                        v-for="(task, index) in Store.tasks"
                        :key="index"
                    >
                        <td @click="openModal(task.id)">{{index+1}}</td>
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
                        <td @click="openModal(task.id)" >
                            <p class="itbkk-status rounded-2xl m-1 p-2 font-bold font-serif"
                                :class="{
                                    'bg-gray-200' : task.statusName === 'No Status',
                                    'text-yellow-500': task.statusName === 'To Do',
                                    'text-orange-400': task.statusName === 'Doing',
                                    'text-green-400': task.statusName === 'Done'
                            }">
                            {{ task.statusName }}</p>
                        </td>
                        <td>
                            <div class="itbkk-button-action relative pl-[40%]">
                                <img
                                    src="@/assets/optionIcon.svg"
                                    alt="Options"
                                    @click="toggleDropDown(index)"
                                    class="cursor-pointer"
                                />
                                <div
                                    v-if="optionsDropDownIndex === index"
                                    class="absolute w-32 bg-white border rounded-lg shadow-lg z-50"
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
                <tbody v-show="Store.tasks.length === 0">
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

.titleShadow {
    text-shadow: 5px 5px 3px black;
}


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
 
 
.button-manage {
  border-radius: 4px;
  background-color: black;
  border: none;
  color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 15px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
  position: relative;
}

.button-manage:hover {
  padding-right: 24px;
  padding-left: 8px;
}

.button-manage::after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 15px;
  right: -20px;
  transition: 0.5s;
}

.button-manage:hover::after {
  opacity: 1;
  right: 10px;
}

.button-add {
  border-radius: 4px;
  background-color: black;
  border: none;
  color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 15px;
  width: 170px;
  transition: all 0.5s;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
  position: relative;
}

.button-add:hover {
  padding-right: 24px;
  padding-left: 8px;
}

.button-add::after {
  content: '+';
  position: absolute;
  opacity: 0;
  top: 15px;
  right: -20px;
  transition: 0.5s;
}

.button-add:hover::after {
  opacity: 1;
  right: 10px;
}

.div-class-name {
    height: 50vh;
}
</style>
 