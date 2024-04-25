<script setup>
import { ref, watch, defineProps } from "vue"
import { getTask } from "../libs/fetchs.js"
const emit = defineEmits(["close"])
let taskData = ref([])
let createTimeInBrowserTimezone = ref(null)
let updateTimeInBrowserTimezone = ref(null)

const props = defineProps({
    prop_modalCheck: Boolean,
    prop_taskId: Number,
})

// console.log(props.prop_modalCheck)
// console.log(props.prop_taskId)

//Option datetime
const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
}

let browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
function convertToBrowserTimezone(utcTime) {
    // สร้าง Date object จากเวลา UTC
    let date = new Date(utcTime)

    // แปลงเวลาให้เป็น timezone ของ browser
    const browserTime = date.toLocaleString("sv-SE", options)
    return browserTime
}

async function fetchData() {
    taskData.value = await getTask(`tasks/${props.prop_taskId}`)

    // เรียกใช้งานฟังก์ชันในการแปลงเวลา
    createTimeInBrowserTimezone = convertToBrowserTimezone(
        taskData.value.create_Time
    )
    updateTimeInBrowserTimezone = convertToBrowserTimezone(
        taskData.value.update_Time
    )

    // console.log("Create Time in Browser Timezone:",createTimeInBrowserTimezone,browserTimeZone)
    // console.log("Update Time in Browser Timezone:", updateTimeInBrowserTimezone,browserTimeZone)
}
watch(
    () => props.prop_modalCheck,
    () => {
        fetchData()
    }
)

// onMounted(fetchData)

// let browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

// let options = {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: false,
//     timeZone: browserTimeZone

// }
</script>
<template>
    <div
        class="fixed w-screen h-screen top-0 left-0 flex justify-center items-center"
    >
        <div
            class="bg-black bg-opacity-50 w-screen h-screen"
            @click="emit('close')"
        ></div>
        <div
            class="fixed bg-white w-[55%] h-[80%] indicator flex flex-col rounded-2xl"
        >
            <h1 class=" itbkk-title border-b">{{ taskData.title }}</h1>
            <div class="flex justify-between">
                <div class="w-1/2">
                    <p class="ml-7">Description</p>

                    <textarea
                        class=" itbkk-description border-2 border-red-700 w-[80%] h-[50%] resize-none ml-7"
                        disabled
                        :style="{
                            color:
                                !taskData.description ||
                                taskData.description.trim() === ''
                                    ? 'grey'
                                    : 'black',
                        }"
                        :value="
                            !taskData.description ||
                            taskData.description.trim() === ''
                                ? 'Description Provided'
                                : taskData.description
                        "
                        >{{ taskData.description }}</textarea
                    >
                </div>
                <div class="w-1/2">
                    <div>Assignees</div>
                    <textarea
                        class="  itbkk-assignees border-2 border-red-700 w-80 h-24 resize-none"
                        disabled
                        >{{ taskData.assignees }}
                    </textarea>
                    <div>Status</div>
                    <!-- <input class="border-2 border-red-700 w-auto h-8" value="`{{taskData.status}}`"> -->
                    <input
                        class="  itbkk-status border-2 border-red-700 w-auto h-8"
                        v-model="taskData.status"
                        disabled
                    />

                    <div>timeZone</div>
                    <p class=" itbkk-timezone border-2 border-red-700 w-80 h-8">
                        {{ browserTimeZone }}
                    </p>
                    <div>Created On</div>
                    <p class=" itbkk-created-on border-2 border-red-700 w-80 h-8">
                        {{ createTimeInBrowserTimezone }}
                    </p>
                    <div>Updated On</div>
                    <p class=" itbkk-updated-on border-2 border-red-700 w-80 h-8">
                        {{ updateTimeInBrowserTimezone }}
                    </p>
                    <div class="flex">
                        <div class="box">
                            <button
                                type="submit"
                                class=" itbkk-button mt-auto self-start p-2 bg-white btn"
                                @click="emit('close')"
                            >
                                close
                            </button>
                        </div>
                        <div class="box">
                            <button
                                type="submit"
                                class=" itbkk-button mt-auto self-start p-2 bg-green-50 btn btn-success"
                                @click="emit('close')"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    color: #e91f1f;
    font-size: 32px;
    font-weight: 900;
    margin-top: 15px;
    margin-left: 25px;
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
