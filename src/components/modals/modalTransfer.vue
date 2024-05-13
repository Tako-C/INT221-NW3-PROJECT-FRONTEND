<script setup>
import { defineEmits, onMounted, onUpdated } from 'vue'
import {  ref, defineProps } from 'vue'
import { useStore } from '@/stores/store.js'
const emits = defineEmits(['closemodal','confirmed'])
const Store = useStore()
const transterId = ref("")
const props = defineProps({
    statusName: { type: String }

})
const statusData = ref([])

function transfer() {
    for (let i = 0; i < Store.statuss.length; i++) {
        if (Store.statuss[i].statusName == props.statusName) {
           statusData.value.push( Store.statuss[i])
        }
    }
    console.log(statusData.value);
}

onMounted(()=> transfer())
</script>
 
<template>
    <div class="fixed modal-box z-40">
        <h3 class="text-lg font-bold">Transter a Status</h3>
        <p class="border-b mt-2"></p>{{ props.statusName , statusData.value }}
        <p class="itbkk-message py-4"> There is some task asscociated with the Doing status.</p>
        <p class="itbkk-message py-4"> Transfer to   
            <select
                        
                        class="itbkk-status w-[30%] h-8 bg-gray-400 bg-opacity-15 rounded-lg pl-2 pr-2 border-2"
                    >
                        <option
                            v-for="(status ,index) in statusData.value"
                            :key="index"
                        >{{status.statusName}}
                    </option>
                    </select>
        </p>
       
        <div class="boxButton">        
            <button @click="emits('closemodal')" class="itbkk-button-cancel button buttonCancel">Cancel</button>
            <button @click="emits('confirmed')" class="itbkk-button-confirm button buttonConfirm">Confirm</button>
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
    margin: 15px 4px;
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

.buttonConfirm {
    background-color: white;
    color: black;
    border: 2px solid #04aa6d;
    
    &:hover {
    background-color: #04aa6d;
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