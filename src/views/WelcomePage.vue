<script setup lang="ts">
import { useResultsStore } from '@/stores/results'
import { storeToRefs } from 'pinia'
import { computed, ComputedRef } from 'vue'
import ResultsComponent from '@/components/ResultsComponent.vue'
import { getDateFromString } from '@/utils/getDate'

const fetchingResultsStore = useResultsStore()
const { results } = storeToRefs(fetchingResultsStore)

const jackpot: ComputedRef<string | undefined> = computed(() => {
  if (results.value) {
    return new Intl.NumberFormat('de-DE').format(results.value[0].jackpot)
  }
  return undefined
})

const gewinnzahlen = computed(() => {
  if (results.value) {
    const numbers = Object.values(results.value[0].numbers)
    const date = getDateFromString(results.value[0].date)

    const addNumbers = results.value[0].additionalNumbers
    return { numbers, date, addNumbers }
  }
  return undefined
})
</script>

<template>
  <main>
    <img src="../assets/main_img.jpg" alt="" />
    <div class="main-content">
      <ResultsComponent :gewinnzahlen="gewinnzahlen" />

      <div class="new-date">
        <h4>Nächste Gewinnchance am</h4>
        <h2>Dienstag, 18. Juni 2024</h2>
      </div>
    </div>
    <div class="jackpot" v-if="jackpot">
      <img src="../assets/jackpot.png" alt="" id="jackpot-img" />
      <span id="jackpot-zahl">{{ jackpot }}</span>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}

img {
  width: 80%;
  display: block;
  border-radius: 10%;
  margin: 0 auto;
}

.main-content {
  display: flex;
}

.new-date {
  box-sizing: border-box;
  margin-top: 5rem;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 0.75rem;
  border-radius: 3%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  height: max-content;
}

h1 {
  font-size: 2rem;
}

.jackpot {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 30%;
  position: absolute;
  top: 20%;
  right: 5%;
  transform: rotate(-15deg);
}

#jackpot-img {
  width: 100%;
  margin-bottom: 0;
}

#jackpot-zahl {
  font-size: 2rem;
  background-color: rgb(245, 223, 135, 0.8);
  margin-top: -4.7rem;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

@media (max-width: 400px) {
  main {
    max-width: 90%;
    margin: 0 auto;
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  .jackpot {
    top: 40%;
    right: 15%;
  }

  #jackpot-zahl {
    font-size: 1.25rem;
    margin-top: -1.7rem;
  }

  .new-date {
    margin-top: 2rem;
  }
}
</style>
