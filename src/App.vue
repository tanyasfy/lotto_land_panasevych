<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from '@/components/NavComponent.vue'
import { resultsQuery } from '@/queries/resultsQuery'
import { fetchDrawResults } from '@/service/fetchGraph'
import { onMounted, ref } from 'vue'
import { useResultsStore } from '@/stores/results'
import { storeToRefs } from 'pinia'

const fetchingResultsStore = useResultsStore()
const loading = ref(true)
const error = ref<string | undefined>(undefined)
const { results } = storeToRefs(fetchingResultsStore)

onMounted(async () => {
  try {
    results.value = await fetchDrawResults(resultsQuery)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <header>
      <NavComponent />
    </header>

    <RouterView />
  </div>
</template>
