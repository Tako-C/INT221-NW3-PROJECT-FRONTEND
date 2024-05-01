// store.js
import { defineStore } from 'pinia'
// import { getTask } from '../libs/fetchs.js'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  // actions: {
  //   async fetchTasks() {
  //     try {
  //       this.tasks = await getTask("tasks")
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error)
  //       throw error
  //     }
  //   }
  // },
})
