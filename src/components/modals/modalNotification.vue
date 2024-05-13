<script setup>
import { useStore } from "../../stores/store.js"
import { defineProps, ref, onMounted, watchEffect } from 'vue'
import { defineEmits } from 'vue'

const emits = defineEmits(['closemodal'])
const props = defineProps({
    errorDelete: { type: Boolean},
    successDelete: { type: Boolean},
    successDeleteStatus: {type: Boolean},
    errorDeleteStatus: {type: Boolean}
})
const Store = useStore()
const message = ref({ header: "", detail: "" })
let successAddTask = ref(Store.successAddTask)
let errorUpdateTask = ref(Store.errorUpdateTask)
let successUpdateTask = ref(Store.successUpdateTask)
let errorDelete = ref(props.errorDelete)
let successDelete = ref(props.successDelete)
let successAddStatus = ref(Store.successAddStatus)
let successUpdateStatus = ref(Store.successUpdateStatus)
let errorUpdateStatus = ref(Store.errorUpdateStatus)
let successDeleteStatus = ref(props.successDeleteStatus)
let errorDeleteStatus = ref(props.errorDeleteStatus)
// watchEffect(() => {
//     errorDelete.value = props.errorDelete;
//     successDelete.value = props.successDelete;
//     checkEvent();
// });

// ใช้ watchEffect เพื่อตรวจสอบการเปลี่ยนแปลงใน Store.successAdd และ Store.errorUpdate
watchEffect(() => {
    errorDelete.value = props.errorDelete;
    successDelete.value = props.successDelete;
    successAddTask.value = Store.successAddTask
    errorUpdateTask.value = Store.errorUpdateTask
    successUpdateTask.value = Store.successUpdateTask
    successAddStatus.value = Store.successAddStatus
    successUpdateStatus.value = Store.successUpdateStatus
    errorUpdateStatus.value = Store.errorUpdateStatus
    successDeleteStatus.value = props.successDeleteStatus
    errorDeleteStatus.value = props.errorDeleteStatus
    checkEvent();
});



function checkEvent() {
        //Task
    if (successAddTask.value) {
        message.value.header = "Success!"
        message.value.detail = "The task has been successfully added."
    } else if (errorUpdateTask.value) {
        message.value.header = "Error!"
        message.value.detail = "The task does not exist."
    } else if (errorDelete.value) {
        message.value.header = "Error!"
        message.value.detail = "An error occurred while deleting the task."
    } else if (successDelete.value) {
        message.value.header = "Success!"
        message.value.detail = "successfully Delete."
    } else if (successUpdateTask.value){
        message.value.header = "Success!"
        message.value.detail = "The update was successful."

        //Status
    } else if(successAddStatus.value){
        message.value.header = "Success!"
        message.value.detail = "The status has been added."
    } else if(successUpdateStatus.value){
        message.value.header = "Success!"
        message.value.detail = "The status has been updated"
    }
    else if (errorUpdateStatus.value) {
        message.value.header = "Error!"
        message.value.detail = "An error has occurred, the status does not exist."
    }
    else if(successDeleteStatus.value){
        message.value.header = "Success"
        message.value.detail = "The status has been deleted."
    }
    else if(errorDeleteStatus.value){
        message.value.header = "Error!"
        message.value.detail = "An error has occurred, the status does not exist."
    }
}

// เรียกใช้งานฟังก์ชัน checkEvent เมื่อคอมโพเนนต์ถูกอัพเดต
onMounted(checkEvent)


</script>
 
<template>
    <div class="fixed modal-box" :class="{
        'bg-green-100 border-green-600 border-2': message.header === 'Success!',
        'bg-red-100 border-red-600 border-2': message.header === 'Error!'
    }">
            <h3 class="text-lg font-bold">{{ message.header }}</h3>
            <p class="border-b mt-2"></p>
            <p class="itbkk-message py-4">{{ message.detail }}</p>
            <div class="boxButton">
                <button @click="emits('closemodal')" class="button buttonCancel">Close</button>
            </div>
            
    </div>
</template>
 
<style scoped>
.boxButton {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

}
.button {
    margin-top: auto;
    background-color: #04aa6d;
    border: none;
    color: white;
    padding: 10px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    
    transition-duration: 0.4s;
    cursor: pointer;
}
.buttonCancel {
    background-color: white;
    color: black;
    border: 2px solid red;

    &:hover {
    background-color: red;
    color: white;
    }
}

.modal-box {
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
}



</style>