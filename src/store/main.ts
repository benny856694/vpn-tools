import { defineStore } from 'pinia'
import { Id } from 'convex/_generated/dataModel'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      counter: 0,
      selectedSourceId: null as Id<'sources'> | null
    }
  },
  getters: {
    count: ({ counter }) => counter,
  },
  actions: {
    incrementCounter(count: number) {
      this.counter += count
    }
  },
  persist: true
})
