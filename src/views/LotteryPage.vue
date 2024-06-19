<script setup lang="ts">
import { useResultsStore } from '@/stores/results'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getDateFromString } from '@/utils/getDate'
import ResultsComponent from '@/components/ResultsComponent.vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 40,
        padding: 10,
        font: {
          size: 16
        }
      }
    }
  }
}

const fetchingResultsStore = useResultsStore()
const { results } = storeToRefs(fetchingResultsStore)

const date = computed(() => results.value?.map((item) => item.date))

const selectedDatum = ref<string | undefined>(undefined)

const jackpot = ref<string>()
const frequency = ref({})

const labels = ref<string[]>([])
const dataChart = ref<number[]>([])

const gewinnzahlen = computed(() => {
  if (results.value && !!selectedDatum.value) {
    const result = results.value.find(item => item.date === selectedDatum.value)
    if (result) {
      const numbers = Object.values(result.numbers)
      const date = getDateFromString(result.date)
      const formattedJackpot = new Intl.NumberFormat('de-DE').format(result.jackpot)
      const addNumbers = result.additionalNumbers
      return { numbers, date, addNumbers, formattedJackpot }
    }
    
  }
  return undefined
})

watch(gewinnzahlen, (value) => {
  if (value) {
    jackpot.value = value.formattedJackpot
  }
})

const getDataForCharts = computed(() => {
  if (results.value) {
    results.value.forEach(item => {
      Object.values(item.numbers).forEach(num => {
        const number = Number(num)
        if (frequency[number]) {
          frequency[number]++
        } else {
          frequency[number] = 1
        }
      })
    })

    const sortedFrequencies = Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    sortedFrequencies.forEach(([number, count]) => {
      labels.value.push(`${number} trifft ${count} mal`)
      dataChart.value.push(count)
    })

    return labels.value.length > 0 && dataChart.value.length > 0
  }
  return false
})

const data = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      backgroundColor: [
        'rgba(218, 157, 255, 1)',
        'rgba(199, 157, 255, 1)',
        'rgba(172, 157, 255, 1)',
        'rgba(194, 255, 157, 1)',
        'rgba(156, 255, 157, 1)'
      ],
      data: dataChart.value
    }
  ]
}))
</script>

<template>
  <div>
  <div class="results-page" v-if="results">
    <div>
      <b-form-select v-model="selectedDatum" :options="date" class="select-date mb-3">
        <template #first>
          <b-form-select-option :value="undefined" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>
      <div class="results" v-if="selectedDatum">
        <ResultsComponent :gewinnzahlen="gewinnzahlen" />
      </div>
    </div>
    <div class="jackpot" v-if="selectedDatum">
      <h2>Jackpot: {{ jackpot }}</h2>
    </div>
    <div class="charts" v-if="getDataForCharts">
      <h2>Nach Häufigkeit</h2>
      <h3>Gemessen an der Häufigkeit der Ziehung.</h3>

      <Doughnut :data="data" :options="options" />
    </div>
  </div>
  <div v-else>
    <h4>Etwas ist schiff gelaufen. Versuchen Sie es noch später</h4>
  </div>
</div>
</template>

<style scoped>
.results-page {
  padding: 4rem;
  display: flex;
  justify-content: space-between;
}

.select-date {
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  padding: 5px;
  width: 100%;
  height: 3rem;
  font-size: 1.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.charts {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.charts canvas {
  margin: 3rem auto;
  width: 400px;
  height: auto;
}

.jackpot {
  display: flex;
  text-align: center;
  width: 30%;
  position: absolute;
  top: 70%;
  left: 15%;
  transform: rotate(-15deg);
}

@media (max-width: 400px) {
  .results-page {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .charts {
    margin: 1rem auto;
    align-content: center;
    width: 90%;
  }

  h3 {
    text-align: center;
    font-size: 1rem;
  }

  .charts canvas {
    margin: 3rem auto;
    width: 100%;
    height: auto;
  }

  .jackpot {
    top: 30%;
    left: 55%;
  }
}
</style>
