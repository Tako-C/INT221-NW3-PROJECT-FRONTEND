<script setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['closemodal'])

</script>
 
<template>
<div class="modal-box">
            <h3 class="text-lg font-bold">Error!</h3>
            <p class="py-4">An error has occurred, the task does not exist.</p>
            <button @click="emits('closemodal')">Close</button>
        </div>
</template>
 
<style scoped>

</style>