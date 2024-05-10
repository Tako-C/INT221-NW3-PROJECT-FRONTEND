// store.js
import { defineStore } from 'pinia'
// import { getTask } from '../libs/fetchs.js'

export const useStore = defineStore('task', {
  state: () => ({
    tasks: [],
    statuss:[],
    successAddTask:false,
    successUpdateTask:false,
    errorUpdateTask:false,
    successUpdateStatus:false,
    successAddStatus:false,
    errorUpdateStatus:false

  }),
})
