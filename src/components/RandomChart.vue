<template>
  <v-card flat>
    <div class="text-center ma-3">
      <v-btn @click="fillData()">Randomize</v-btn>
      <v-btn @click="getData()">Refresh</v-btn>
    </div>
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </v-card>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                drawBorder: false,
              },
            }]
          },
        },
      }
    },
    mounted () {
      this.getData()
    },
    props: [
      'toggle_saddle',
      'toggle_drivetrain',
      'toggle_brakes',
      'toggle_handlebars',
      'toggle_wheels',
      'toggle_frame',
    ],
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Saddle','Drivetrain','Brakes','Handlebars','Wheels','Frame'],
          datasets: [
            {
              label: 'Data One',
              borderColor: '#f87979',
              fill: 'false',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data Two',
              borderColor: '#79f879',
              fill: 'false',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getData () {
        this.datacollection = {
          labels: ['Saddle','Drivetrain','Brakes','Handlebars','Wheels','Frame'],
          datasets: [
            {
              label: 'Product configuration',
              borderColor: '#f87979',
              fill: 'false',
              tension: 0.0,
              data: [this.toggle_saddle, this.toggle_drivetrain, this.toggle_brakes, this.toggle_handlebars, this.toggle_wheels, this.toggle_frame]
            },
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
</style>