<script setup>
import { ref, onMounted } from 'vue'
import { getTask } from '../libs/fetchs.js'
let taskData = ref([])
// let taskData = ref([
//     { id: 1, title: "task1", assignees: "Takoo", status: "Doing" },{ id: 1, title: "task1", assignees: "Takoo", status: "Doing" }
// ])

async function fetchData() {
  taskData.value = await getTask()
  // console.log(orderListData.value)
}
onMounted(fetchData)
console.log(taskData)
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
</template>

<style scoped></style>
