<template>
  <v-card flat>
    <div class="text-center ma-3">
      <v-btn @click="fillData()">Randomize</v-btn>
      <v-btn @click="getData()">Refresh</v-btn>
    </div>
    <bubble-chart :chart-data="datacollection" :options="options"></bubble-chart>
                    <v-row>
                      <v-slider
                        v-model="valueA"
                        label="A"
                      ></v-slider>
                    </v-row>
                    <v-row>
                      <v-slider
                        v-model="valueB"
                        label="B"
                      ></v-slider>
                    </v-row>
  </v-card>
</template>

<script>
  import BubbleChart from './BubbleChart.js'

  export default {
    components: {
      BubbleChart
    },
    data () {
      return {
        valueA: this.getRandomInt(),
        valueB: this.getRandomInt(),
        datacollection: null,
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                }
            }],
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                }
            }]
          },
        },
      }
    },
    mounted () {
      this.fillData()
    },
    props: [
    ],
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['A','B'],
          datasets: [
            {
              label: 'Data One',
              borderColor: '#f87979',
              fill: 'false',
              data: [
                {
                  x: this.valueA,
                  y: this.valueB,
                  r: (this.valueA + this.valueB) / 2,
                }
              ]
            },
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (100))
      }
    }
  }
</script>

<style>
</style>