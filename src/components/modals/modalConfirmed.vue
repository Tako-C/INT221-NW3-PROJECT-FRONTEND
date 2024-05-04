<script setup>
import { defineEmits } from 'vue'
import { defineProps, ref } from 'vue'

const emits = defineEmits(['closemodal','confirmed'])
const props = defineProps({
    taskTitle: { type: String }
})

</script>
 
<template>
    <div class="fixed modal-box">
        <h3 class="text-lg font-bold">Delete a Task</h3>
        <p class="py-4">Do you want to delete the task "{{ props.taskTitle }}"</p>
        <button @click="emits('closemodal')">Cancel</button>
        <button @click="emits('confirmed')">Confirm</button>
    </div>
</template>

<style scoped>

</style>
