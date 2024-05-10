// store.js
import { defineStore } from 'pinia'
// import { getTask } from '../libs/fetchs.js'

export const useStore = defineStore('task', {
  state: () => ({
    tasks: [],
    statuss:[],
    successAdd:false,
    errorUpdate:false,
    successUpdate:false
  }),
})
