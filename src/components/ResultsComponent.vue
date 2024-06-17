<script setup lang="ts">
import { PropType } from 'vue'
import { type Gewinnzahlen } from '@/types/fetchingResults'

defineProps({
  gewinnzahlen: { type: Object as PropType<Gewinnzahlen>, required: true }
})
</script>

<template>
  <div class="results-wrapper">
    <h1>EUROJACKPOT</h1>
    <div>
      <h2>Gewinnzahlen</h2>
      <p>{{ gewinnzahlen?.date }}</p>
      <div class="zahlen-wrapper">
        <div class="numbers">
          <span class="gewinnzahl" v-for="(item, idx) in gewinnzahlen?.numbers" :key="idx">{{
            item
          }}</span>
        </div>

        <div class="add-numbers">
          <div class="numbers">
            <span class="gewinnzahl" v-for="(item, idx) in gewinnzahlen?.addNumbers" :key="idx">{{
              item
            }}</span>
          </div>
          <span class="title-add-numbers">Eurozahlen</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 600;
}

.results-wrapper {
  width: 60%;
  margin-top: 2rem;
}

.zahlen-wrapper {
  display: flex;
  margin-top: 2rem;
}

.numbers {
  display: flex;
  flex-direction: row;
}

.numbers:first-of-type {
  margin-right: 3rem;
}

.add-numbers {
  display: flex;
  flex-direction: column;
}

.gewinnzahl {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f7d15f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-right: 10px;
  box-shadow:
    inset 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
}

@media (max-width: 400px) {
  .zahlen-wrapper {
    display: flex;
    flex-direction: column;
  }

  .results-wrapper {
    width: 90%;
    margin-top: 2rem;
  }

  .numbers {
    display: flex;
    margin-top: 1.5rem;
    width: 100%;
  }

  .add-numbers {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title-add-numbers {
    margin-top: 1.5rem;
  }
}
</style>
