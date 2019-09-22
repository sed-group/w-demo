<template>
  <v-container pa-0>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>

          <v-app-bar
            color="blue-grey"
            dark
            flat
            app
          >
            <v-toolbar-title class="headline text-uppercase">
              <span>SE</span>
              <span class="font-weight-light">DESIGN</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <img src="@/assets/WingquistWhite.png" alt="Wingquist Laboratory" width="110" height="26">
          </v-app-bar>

          <v-card
            max-width="1280"
            class="mx-auto my-3"
            v-if="activeBtn==0"
          >
            <v-card-title>echarts</v-card-title>
            <v-card-text>
              <v-chart :options="scatter"/>
            </v-card-text>
          </v-card>

          <v-card
            max-width="1280"
            class="mx-auto my-3"
            v-if="activeBtn==0"
          >
            <v-card-title>Plot</v-card-title>
            <v-card-text>
              <!-- This is where the d3 svg is loaded -->
              <div class="d3-canvas"></div>
              <apexchart type=scatter height=350 :options="chartOptions" :series="series" />
            </v-card-text>
          </v-card>

          <v-card
            max-width="1280"
            class="mx-auto my-3"
            v-if="activeBtn==0"
          >
            <v-card-title>Collected results</v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <!-- <th class="text-center">H1</th>
                    <th class="text-center">D1</th>
                    <th class="text-center">D2</th>
                    <th class="text-center">T1</th>
                    <th class="text-center">T2</th>
                    <th class="text-center">S1</th> -->
                    <th class="text-center">Handle</th>
                    <th class="text-center">Material</th>
                    <th class="text-center">Volume</th>
                    <th class="text-center">Weight</th>
                    <th class="text-center">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in designs" :key="item.uuid">
                    <!-- <td>{{ item.height }}</td>
                    <td>{{ item.diameterTop }}</td>
                    <td>{{ item.diameterBottom }}</td>
                    <td>{{ item.mugThickness }}</td>
                    <td>{{ item.handleThickness }}</td>
                    <td>{{ item.handleSeparation }}</td> -->
                    <td>{{ item.handle }}</td>
                    <td>{{ item.material }}</td>
                    <td>{{ item.volume }}</td>
                    <td>{{ item.weight }}</td>
                    <td>{{ item.createdOn.seconds }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>

      </v-flex>
    </v-layout>
    <v-bottom-navigation
      v-model="activeBtn"
      color="blue-grey"
      fixed
      app
      shift
    >
      <v-btn>
        <span>Results</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>

    </v-bottom-navigation>
  </v-container>
</template>

<script>
import { db } from '@/main'
//import * as d3 from 'd3'
import VueApexCharts from 'vue-apexcharts'

import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/scatter'

export default {
  components: {
    apexchart: VueApexCharts,
    'v-chart': ECharts,
  },
  computed: {
    series() {
      var series = []
      for (let i = 0; i < this.materials.length; i++) {
        const material = this.materials[i];
        series.push({name: material, data: []})
        for (let j = 0; j < this.designs.length; j++) {
          const element = this.designs[j];
          if (element.material == material) {
            series[i]['data'].push([parseFloat(element['volume']),parseFloat(element['weight'])])
          }
        }
      }
      return series
    },
    materials() {
      const materials = [...new Set(this.designs.map(item => item.material))];
      return materials
    },
  },
  data () {
    return {
      scatter: {
          xAxis: {},
          yAxis: {},
          series: [{
              symbolSize: 10,
              data: [
                  [10.0, 8.04],
                  [8.0, 6.95],
                  [13.0, 7.58],
                  [9.0, 8.81],
                  [11.0, 8.33],
                  [14.0, 9.96],
                  [6.0, 7.24],
                  [4.0, 4.26],
                  [12.0, 10.84],
                  [7.0, 4.82],
                  [5.0, 5.68]
              ],
              type: 'scatter'
          }]
      },
      activeBtn: 0,
      designs: [],
      chartOptions: {
        chart: {
          zoom: {
            enabled: false,
            type: 'xy'
          }
        },
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1)
            }
          },
          title: {
            text: 'Volume (ml)',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              cssClass: 'apexcharts-xaxis-title',
            },
          },
        },
        yaxis: {
          tickAmount: 7,
            title: {
              text: 'Weight (g)',
              offsetX: 0,
              offsetY: 0,
              style: {
                color: undefined,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-title',
              },
            },
        }
      },
    }
  },
  methods: {
    fetchData() {
      
      // data & firebase hook-up
      var data = [];

      db.collection('mugs').onSnapshot(res=> {

        res.docChanges().forEach(change => {

          const doc = change.doc.data();

          switch (change.type) {
            case 'added':
              data.push(doc);
              break;
            case 'modified': {
              const index = data.findIndex(item => item.id == doc.id);
              data[index] = doc;
              break;
            }
            case 'removed':
              data = data.filter(item => item.id !== doc.id);
              break;
            default:
              break;
          }

        });

        this.designs = data;

      });
    },
    createSvg() {
    },
  },
  mounted(){
    this.fetchData();
    this.createSvg();
  },
}
</script>
