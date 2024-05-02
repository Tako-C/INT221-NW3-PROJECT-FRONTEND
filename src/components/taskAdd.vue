<script setup>
import { ref, onMounted } from "vue"
import { addTask } from "../libs/fetchs.js"
import { useRoute, useRouter } from "vue-router"
import { useTaskStore } from '../stores/store.js'

const route = useRoute()
const router = useRouter()
let taskData = ref({})
const taskStore = useTaskStore()



function closeModal() {
    router.push("/task")
    
    taskStore.tasks = taskStore.tasks.filter(task => task.id !== taskId)
    taskStore.tasks.push(taskData.value)
    console.log(taskStore.task);
}

function addtostore() {
    const lastTaskId = taskStore.tasks[taskStore.tasks.length - 1].id
    console.log(lastTaskId);
    taskData.value.id = lastTaskId +1
    taskStore.tasks.push(taskData.value)

}
async function save() {
    
    if(taskData.value.status === "No Status"){
        taskData.value.status = "NO_STATUS"
        console.log(taskData.value)
        addTask(taskData.value)
        addtostore()
        closeModal()
    }
    if(taskData.value.status === "To Do"){
        taskData.value.status = "TO_DO"
         addTask(taskData.value)
         closeModal()
    }
    if(taskData.value.status === "Doing"){
        taskData.value.status = "DOING"
         addTask(taskData.value)
         closeModal()
    }
    if(taskData.value.status === "Done"){
        taskData.value.status = "DONE"
         addTask(taskData.value)
         closeModal()
    }
}
//เรียกใช้function fetchdata
// onMounted(fetchData)
</script>
<template>
    <div
        class="class name : itbkk-* fixed w-screen h-screen top-0 left-0 flex justify-center items-center"
    >
        <div
            class="bg-black bg-opacity-50 w-screen h-screen"
            @click="closeModal()"

        >
        </div>
        <div
            class="fixed bg-white w-[35%] h-[70%] indicator flex flex-col rounded-2xl"
        >
            <div class=" bg-gradient-to-b from-violet-300 rounded-2xl">
                <h1 class="itbkk-title break-words w-[79%]">
                    New Task
                    <!-- {{ taskData.title }} -->
            </h1>
            <p class="border-b mt-2"></p>
            </div>

            <div class="mt-3 mb-20 ml-7">

                    <div class="font-bold">Title</div>
                    <input v-model="taskData.title" class="w-[80%] h-8 resize-none italic bg-slate-400 bg-opacity-15 rounded-lg border-2 pl-2"></input>

                    <div class="font-bold">Description</div>
                    <textarea v-model="taskData.description" class="itbkk-description w-[80%] h-[80%] resize-none bg-gray-400 bg-opacity-15 rounded-lg pl-2 overflow-hidden hover:overflow-y-scroll border-2"></textarea>

                    <div class="font-bold">Assignees</div>
                    <textarea v-model="taskData.assignees" class="itbkk-assignees w-[80%] h-[30%] resize-none bg-gray-400 bg-opacity-15 rounded-lg pl-3 border-2"></textarea>

                    <div class="font-bold">Status</div>
                        <select v-model="taskData.status" class="itbkk-status w-[25%] h-8 bg-gray-400 bg-opacity-15 rounded-lg pl-2 pr-2 border-2">
                            <option>No Status</option>
                            <option>To Do</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>

            </div>


                <div class="boxButton m-3">
                    <button
                        type="submit"
                        class="itbkk-button button buttonClose btn"
                        @click="closeModal()"
                    >
                    CANCLE
                    </button>
                    <button type="submit"class="itbkk-button button buttonOK btn"
                        @click="save()">
                    SAVE
                    </button>
                </div>

            </div>
    </div>
</template>
<style scoped>
.boxButton {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    margin-right: 25px;
}
.button {
    margin-top: auto;
    background-color: #04aa6d;
    border: none;
    color: white;
    padding: 10px 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.buttonClose {
    background-color: white;
    color: black;
    border: 2px solid red;
}
.buttonClose:hover {
    background-color: red;
    color: white;
}
.buttonOK {
    background-color: white;
    color: black;
    border: 2px solid #04aa6d;
}
.buttonOK:hover {
    background-color: #04aa6d;
    color: white;
}

.box {
    margin-right: auto;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
}

h1 {

    color: black;
    font-size: 32px;
    font-weight: 900;
    margin-top: 15px;
    margin-left: 25px;
    font-family: sans-serif;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;

    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 16px;

    padding: 25px;
}
</style>
