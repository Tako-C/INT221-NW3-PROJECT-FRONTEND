<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store.js";
import { removeById, getData, removeAndTransfer } from "@/libs/fetchs.js";

import modalNotification from "@/components/modals/modalNotification.vue";
import modalstatusDelete from "@/components/statuses/statusDelete.vue";
import modalTransfer from "@/components/modals/modalTransfer.vue";

const route = useRoute();
const Store = useStore();
let statusData = ref([]);
const router = useRouter();
const optionsDropDownIndex = ref(null);
const successDeleteStatus = ref(false);
const openConfirmed = ref(false);
const statusNameDelete = ref("");
const statusID = ref("");
const taskData = ref([]);
const transferModal = ref(false);
const errorDeleteStatus = ref(false);
console.log(Store.tasks);
console.log(Store.statuss);

async function fetchData() {
  if (Store.tasks.length === 0 || Store.statuss.length === 0) {
    taskData.value = await getData("tasks");
    Store.tasks.push(...taskData.value);
    statusData.value = await getData("statuses");
    Store.statuss.push(...statusData.value);
    console.log(Store.tasks);
    console.log(Store.statuss);
  }
}

function toggleDropDown(index) {
  optionsDropDownIndex.value =
    optionsDropDownIndex.value === index ? null : index;
}

async function removeStatus() {
  optionsDropDownIndex.value = null;
  openConfirmed.value = false;
  console.log(statusID.value);

  console.log(Store.tasks);
  const checkTaskUseStatus = Store.tasks.filter(
    (task) => task.statusName == statusNameDelete.value
  );
  console.warn(checkTaskUseStatus.length);
  
  if (checkTaskUseStatus.length == 0) {
    Store.statuss = Store.statuss.filter(
      (status) => status.id !== statusID.value
    );
    let result = await removeById("statuses", statusID.value);
    console.log("result", result);
    if (result.status === 404) {
      console.log("result :", result.status);
      errorDeleteStatus.value = true;
    }
    else{
        successDeleteStatus.value = true;
        console.log(successDeleteStatus.value);
    }
    
  } else {
    // window.alert("Have task is use status")
    transferModal.value = true;

  }
  
  openConfirmed.value = false;
  
}

async function removeStatusTransfer(data) {
  const { removeStatus, transferStatus } = data;
  // หา id จาก statusname ที่รับมา
  const removeStatusId = Store.statuss.find(
    (status) => status.name === removeStatus).id;
  const transferStatusId = Store.statuss.find(
    (status) => status.name === transferStatus).id;

  let removedStatus = await removeAndTransfer(
    "statuses",
    removeStatusId,
    transferStatusId
  );
  const tasksToTransfer = Store.tasks.filter(
    (task) => task.statusName === removeStatus
  );
  if (tasksToTransfer.length > 0) {
    for (const task of tasksToTransfer) {
      task.statusName = transferStatusId;
    }
    // console.log('Tasks status transferred successfully.')
  }
  // not good na
  Store.statuss = Store.statuss.filter(
    (status) => status.id !== removeStatusId
  );
  transferModal.value = false;
}

function addModal_Status() {
  router.push({ name: "StatusAdd" });
}

function editModal_Status(status_Id) {
  router.push(`/status/${status_Id}/edit`);
  optionsDropDownIndex.value = null;
}

function closeModalNotification() {
  Store.successAddStatus = false;
  Store.successUpdateStatus = false;
  Store.errorUpdateStatus = false;
  openConfirmed.value = false;
  transferModal.value = false;
  successDeleteStatus.value = false;
  errorDeleteStatus.value = false;
  statusNameDelete.value = "";
  statusID.value = "";
}

function openConfirmModal(id, name) {
  if (name === "No Status") {
    window.alert("You can not delete this Status.");
  } else {
    openConfirmed.value = true;
    statusNameDelete.value = name;
    console.log(statusNameDelete);
    statusID.value = id;
  }
}

function checkVariable() {
  if (
    Store.successAddStatus == true ||
    Store.successUpdateStatus == true ||
    Store.errorUpdateStatus == true ||
    successDeleteStatus.value === true ||
    errorDeleteStatus.value === true 
  ) {
    return true;
  }
  return false;
}

onMounted(fetchData);
</script>

<template>
  <modalNotification
    :successDeleteStatus="successDeleteStatus"
    :errorDeleteStatus="errorDeleteStatus"
    @closemodal="closeModalNotification()"
    v-show="checkVariable()"
    class="z-30"
  />
  <modalstatusDelete
    v-show="openConfirmed"
    :statusName="statusNameDelete"
    @closemodal="closeModalNotification()"
    @confirmed="removeStatus()"
    class="z-40"
  />
  <modalTransfer
    :statusName="statusNameDelete"
    v-show="transferModal"
    @closemodal="closeModalNotification()"
    @confirmed="removeStatusTransfer($event),successDeleteStatus = true"
  ></modalTransfer>

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

    <main
      class="flex flex-col pt-[7%] h-screen pl-[20%] pr-[20%] hover:overflow-y-auto overflow-hidden"
    >
      <div
        class="flex text-2xl font-serif font-bold justify-between items-center"
      >
        <div>
          <span
            ><a href="router.push({name: 'taskTable'}" class="itbkk-button-home text-blue-500"
              >Home</a
            ></span
          >
          > Status Manage
        </div>
        <div>
          <button class="itbkk-button-add button-add mb-2" @click="addModal_Status()">
            Add Status
          </button>
        </div>
      </div>
      <table class="table table-zebra w-auto bg-white mt-2 mb-28">
        <thead
          class="bg-[#818080] text-white font-serif h-20 text-2xl titleShadow"
        >
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
            <!-- <div class="itbkk-button-add add-Button h-16 flex items-center justify-center">
                            <img class="itbkk-button-add add-Button" src="@/assets/plus.svg" @click="addModal_Status()" />
                        </div> -->
          </tr>
        </thead>
        <tbody class="text-base">
          <tr
            class="itbkk-item hover-table border-[1px] rounded-2xl"
            v-show="Store.statuss.length > 0"
            v-for="(status, index) in Store.statuss"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td class="itbkk-status-name">
              {{ status.name }}
            </td>

            <td>
              <p class="itbkk-status-description rounded-2xl m-1 p-2">
                {{ status.description }}
              </p>
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
                  <ul class="itbkk-button-edit divide-y divide-gray-200">
                    <li>
                      <a
                        href="#"
                        @click="editModal_Status(status.id)"
                        class="itbkk-button-edit block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        @click="openConfirmModal(status.id, status.name)"
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
        <tbody v-show="Store.statuss.length === 0">
          <tr>
            <td class="text-center" colspan="4">Don't Have status ??</td>
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

/* .add-Button {
    opacity: 30%;
    width: 40px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
        /* background-color: #cc2e5d; */
/* opacity: 100%;
        transition: 0.5s;
    } */
/* } */

.button-add {
  border-radius: 4px;
  background-color: black;
  border: none;
  color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  width: 150px;
  transition: all 0.5s;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  position: relative;
}

.button-add:hover {
  padding-right: 24px;
  padding-left: 8px;
}

.button-add::after {
  content: "+";
  position: absolute;
  opacity: 0;
  top: 10px;
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
