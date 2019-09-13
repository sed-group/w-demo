<template>
  <v-card flat>
    <div class="text-center">
      <v-btn @click="fillData()">Randomize</v-btn>
    </div>
    <line-chart :chart-data="datacollection"></line-chart>
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
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
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
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>