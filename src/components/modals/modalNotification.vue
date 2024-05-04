<script setup>
import { useTaskStore } from "../../stores/store.js"
import { defineProps, ref, onMounted, watchEffect } from 'vue'
import { defineEmits } from 'vue'

const emits = defineEmits(['closemodal'])
const props = defineProps({
    errorDelete: { type: Boolean, require: true },
    successDelete: { type: Boolean, require: true }
})
const taskStore = useTaskStore()
const message = ref({ header: "", detail: "" })
// สร้าง ref สำหรับการเก็บค่า successAdd และ errorUpdate ที่มาจาก store
let successAdd = ref(taskStore.successAdd)
let errorUpdate = ref(taskStore.errorUpdate)
let successUpdate = ref(taskStore.successUpdate)

// ใช้ watch สำหรับตรวจสอบการเปลี่ยนแปลงของ errorDelete และ successDelete จาก props
let errorDelete = ref(props.errorDelete)
let successDelete = ref(props.successDelete)
watchEffect(() => {
    errorDelete.value = props.errorDelete;
    successDelete.value = props.successDelete;
    checkEvent();
});

// ใช้ watchEffect เพื่อตรวจสอบการเปลี่ยนแปลงใน taskStore.successAdd และ taskStore.errorUpdate
watchEffect(() => {
    successAdd.value = taskStore.successAdd;
    errorUpdate.value = taskStore.errorUpdate;
    successUpdate.value = taskStore.successUpdate
    checkEvent();
});



function checkEvent() {
    if (successAdd.value) {
        message.value.header = "Success!"
        message.value.detail = "The task has been successfully added."
    } else if (errorUpdate.value) {
        message.value.header = "Error!"
        message.value.detail = "The update was unsuccessful."
    } else if (errorDelete.value) {
        message.value.header = "Error!"
        message.value.detail = "An error occurred while deleting the task."
    } else if (successDelete.value) {
        message.value.header = "Success!"
        message.value.detail = "successfully Delete."
    } else if (successUpdate.value){
        message.value.header = "Success!"
        message.value.detail = "The update was successful."
    }
}

// เรียกใช้งานฟังก์ชัน checkEvent เมื่อคอมโพเนนต์ถูกอัพเดต
onMounted(checkEvent)


</script>
 
<template>
    <div class="fixed modal-box">
            <h3 class="text-lg font-bold">{{ message.header }}</h3>
            <p class="py-4">{{message.detail}}</p>
            <button @click="emits('closemodal')">Close</button>
    </div>
</template>
 
<style scoped>

</style>