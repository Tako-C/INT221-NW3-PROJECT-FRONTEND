<script setup>
import { ref, onMounted } from "vue"
import { getTask } from "../libs/fetchs.js"
import modalNaja from "../components/taskDetail.vue"

let taskData = ref([])
let modalCheck = ref(false)
let taskId = ref(null)

async function fetchData() {
    taskData.value = await getTask("tasks")
    // console.log(orderListData.value)
}
console.log(taskData.value)
onMounted(fetchData)

function openModal(taskid) {
    modalCheck.value = !modalCheck.value
    taskId.value = taskid
    console.log(taskId.value)
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
                class="table table-auto table-zebra w-[80%] h-[10%] max-h-10"
            >
                <thead class="text-xl">
                    <tr>
                        <th>ID</th>
                        <th>TItle</th>
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
                            <span class="itbkk-assignees"
                                v-if="task.assignees === null"
                                style="font-style: italic; color: grey"
                                >Unassigned</span
                            >
                            <span v-else class="itbkk-assignees">{{ task.assignees }}</span>
                        </td>
                        <td class="itbkk-status">{{ task.status }}</td>
                    </tr>
                </tbody>
                <tbody v-show="taskData.length == 0" class="w-screen">
                    <tr>
                        <td>Don't Have Task ??</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- <button type="submit" class="button" @click="modalCheck = !modalCheck">Submit Naja</button> -->
        <modalNaja
            :prop_modalCheck="modalCheck"
            :prop_taskId="taskId"
            v-show="modalCheck"
            @close="modalCheck = false"
        >
        </modalNaja>
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
