<script setup>
import { ref, onMounted } from 'vue'
import { getTask } from '../libs/fetchs.js'
import modalNaja from "../components/taskDetail.vue"

let taskData = ref([])
let modalCheck = ref(false)
let taskId = ref(null)

async function fetchData() {
    taskData.value = await getTask("tasks")
  // console.log(orderListData.value)
}
console.log(taskData.value);
onMounted(fetchData)

function openModal(taskid) {
    modalCheck.value = !modalCheck.value
    taskId.value = taskid
    console.log(taskId.value);

}
</script>

<template>
  <div
    class="bg-[#583d72] flex justify-center items-center h-20 text-24 text-white"
  >
    <h1>IT-Bangmod Kradan Kanban (ITB-KK)</h1>
  </div>
  <div class="flex justify-center">
    <table class="table table-auto table-zebra w-[80%] h-[10%] max-h-10">
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
        @click="openModal(task.id)"
          v-show="taskData.length > 0"
          v-for="(task, index) in taskData"
          :key="index"
        >
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.assignees }}</td>
          <td>{{ task.status }}</td>
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
  <modalNaja :prop_modalCheck="modalCheck" :prop_taskId="taskId" v-show="modalCheck" @close="modalCheck = false">
    
  </modalNaja>

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
 background-image: linear-gradient(to right, #CC2E5D, #FF5858);
 border-radius: 8px;
 
 color: #FFF;
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
