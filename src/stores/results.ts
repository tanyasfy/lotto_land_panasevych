import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type FetchingResult } from '@/types/fetchingResult'

export const useResultsStore = defineStore('results', {
  state: () => {
    const results = ref<FetchingResult[]>()

    return { results }
  }
})
