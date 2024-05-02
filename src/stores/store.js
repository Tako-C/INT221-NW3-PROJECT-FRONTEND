// store.js
import { defineStore } from 'pinia'
// import { getTask } from '../libs/fetchs.js'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
})
