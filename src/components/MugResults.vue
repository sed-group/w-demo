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
          >
            <v-card-title>echarts</v-card-title>
            <v-card-text>
              <chart ref="chart1" :options="option" :auto-resize="true"></chart>
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

export default {
  components: {
  },
  computed: {
    series() { // made for apexchart
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
    GRID_WIDTH() {
      return (100 - this.BASE_LEFT - this.GAP) / this.CATEGORY_DIM_COUNT - this.GAP
    },
    GRID_HEIGHT() {
      return (100 - this.BASE_TOP - this.GAP) / this.CATEGORY_DIM_COUNT - this.GAP
    },
    option() {
      var option = {
        animation: true,
        brush: {
          brushLink: 'all',
          xAxisIndex: [],
          yAxisIndex: [],
          inBrush: {
            opacity: 1
          }
        },
        visualMap: {
          type: 'piecewise',
          categories: ["Beijing", "Shanghai", "Guangzhou"],
          dimension: this.CATEGORY_DIM,
          orient: 'horizontal',
          top: 0,
          left: 'center',
          inRange: {
            color: ['#c23531','#2f4554', '#61a0a8']
          },
          outOfRange: {
            color: '#ddd'
          },
          seriesIndex: [0]
        },
        tooltip: {
          trigger: 'item'
        },
        parallelAxis: [
          {dim: 0, name: this.schema[0].text},
          {dim: 1, name: this.schema[1].text},
          {dim: 2, name: this.schema[2].text},
          {dim: 3, name: this.schema[3].text},
          {dim: 4, name: this.schema[4].text},
          {dim: 5, name: this.schema[5].text},
          {dim: 6, name: this.schema[6].text,
            type: 'category', data: ['excellent', 'good', 'mild', 'moderate', 'heavy', 'serious']
          }
        ],
        parallel: {
          bottom: '5%',
          left: '5%',
          height: '31%',
          width: '55%',
          parallelAxisDefault: {
            type: 'value',
            name: 'AQIindex',
            nameLocation: 'end',
            nameGap: 20,
            splitNumber: 3,
            nameTextStyle: {
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#555'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#555'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#555'
              }
            }
          }
        },
        grid: [],
        xAxis: [],
        yAxis: [],
        series: [
          {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.3
              }
            },
            data: this.rawData
          }
        ]
      }
      return option
    },
  },
  data () {
    return {
      activeBtn: 0,
      designs: [],
      schema:[
        {name: 'AQIindex', index: 1, text: 'AQI'},
        {name: 'PM25', index: 2, text: 'PM 2.5'},
        {name: 'PM10', index: 3, text: 'PM 10'},
        {name: 'CO', index: 4, text: 'CO'},
        {name: 'NO2', index: 5, text: 'NO₂'},
        {name: 'SO2', index: 6, text: 'SO₂'},
        {name: 'grade', index: 7, text: 'grade'}
      ],
      rawData: [
        [55,9,56,0.46,18,6,"good", "Beijing"],
        [25,11,21,0.65,34,9,"excellent", "Beijing"],
        [56,7,63,0.3,14,5,"good", "Beijing"],
        [33,7,29,0.33,16,6,"excellent", "Beijing"],
        [42,24,44,0.76,40,16,"excellent", "Beijing"],
        [82,58,90,1.77,68,33,"good", "Beijing"],
        [74,49,77,1.46,48,27,"good", "Beijing"],
        [78,55,80,1.29,59,29,"good", "Beijing"],
        [267,216,280,4.8,108,64,"heavy", "Beijing"],
        [185,127,216,2.52,61,27,"moderate", "Beijing"],
        [39,19,38,0.57,31,15,"excellent", "Beijing"],
        [41,11,40,0.43,21,7,"excellent", "Beijing"],
        [64,38,74,1.04,46,22,"good", "Beijing"],
        [108,79,120,1.7,75,41,"mild", "Beijing"],
        [108,63,116,1.48,44,26,"mild", "Beijing"],
        [33,6,29,0.34,13,5,"excellent", "Beijing"],
        [94,66,110,1.54,62,31,"good", "Beijing"],
        [186,142,192,3.88,93,79,"moderate", "Beijing"],
        [57,31,54,0.96,32,14,"good", "Beijing"],
        [22,8,17,0.48,23,10,"excellent", "Beijing"],
        [39,15,36,0.61,29,13,"excellent", "Beijing"],
        [94,69,114,2.08,73,39,"good", "Beijing"],
        [99,73,110,2.43,76,48,"good", "Beijing"],
        [31,12,30,0.5,32,16,"excellent", "Beijing"],
        [42,27,43,1,53,22,"excellent", "Beijing"],
        [154,117,157,3.05,92,58,"moderate", "Beijing"],
        [234,185,230,4.09,123,69,"heavy", "Beijing"],
        [160,120,186,2.77,91,50,"moderate", "Beijing"],
        [134,96,165,2.76,83,41,"mild", "Beijing"],
        [52,24,60,1.03,50,21,"good", "Beijing"],
        [46,5,49,0.28,10,6,"excellent", "Beijing"],

        [26,37,27,1.163,27,13,"excellent", "Guangzhou"],
        [85,62,71,1.195,60,8,"good", "Guangzhou"],
        [78,38,74,1.363,37,7,"good", "Guangzhou"],
        [21,21,36,0.634,40,9,"excellent", "Guangzhou"],
        [41,42,46,0.915,81,13,"excellent", "Guangzhou"],
        [56,52,69,1.067,92,16,"good", "Guangzhou"],
        [64,30,28,0.924,51,2,"good", "Guangzhou"],
        [55,48,74,1.236,75,26,"good", "Guangzhou"],
        [76,85,113,1.237,114,27,"good", "Guangzhou"],
        [91,81,104,1.041,56,40,"good", "Guangzhou"],
        [84,39,60,0.964,25,11,"good", "Guangzhou"],
        [64,51,101,0.862,58,23,"good", "Guangzhou"],
        [70,69,120,1.198,65,36,"good", "Guangzhou"],
        [77,105,178,2.549,64,16,"good", "Guangzhou"],
        [109,68,87,0.996,74,29,"mild", "Guangzhou"],
        [73,68,97,0.905,51,34,"good", "Guangzhou"],
        [54,27,47,0.592,53,12,"good", "Guangzhou"],
        [51,61,97,0.811,65,19,"good", "Guangzhou"],
        [91,71,121,1.374,43,18,"good", "Guangzhou"],
        [73,102,182,2.787,44,19,"good", "Guangzhou"],
        [73,50,76,0.717,31,20,"good", "Guangzhou"],
        [84,94,140,2.238,68,18,"good", "Guangzhou"],
        [93,77,104,1.165,53,7,"good", "Guangzhou"],
        [99,130,227,3.97,55,15,"good", "Guangzhou"],
        [146,84,139,1.094,40,17,"mild", "Guangzhou"],
        [113,108,137,1.481,48,15,"mild", "Guangzhou"],
        [81,48,62,1.619,26,3,"good", "Guangzhou"],
        [56,48,68,1.336,37,9,"good", "Guangzhou"],
        [82,92,174,3.29,0,13,"good", "Guangzhou"],
        [106,116,188,3.628,101,16,"mild", "Guangzhou"],
        [118,50,0,1.383,76,11,"mild", "Guangzhou"],

        [91,45,125,0.82,34,23,"good", "Shanghai"],
        [65,27,78,0.86,45,29,"good", "Shanghai"],
        [83,60,84,1.09,73,27,"good", "Shanghai"],
        [109,81,121,1.28,68,51,"mild", "Shanghai"],
        [106,77,114,1.07,55,51,"mild", "Shanghai"],
        [109,81,121,1.28,68,51,"mild", "Shanghai"],
        [106,77,114,1.07,55,51,"mild", "Shanghai"],
        [89,65,78,0.86,51,26,"good", "Shanghai"],
        [53,33,47,0.64,50,17,"good", "Shanghai"],
        [80,55,80,1.01,75,24,"good", "Shanghai"],
        [117,81,124,1.03,45,24,"mild", "Shanghai"],
        [99,71,142,1.1,62,42,"good", "Shanghai"],
        [95,69,130,1.28,74,50,"good", "Shanghai"],
        [116,87,131,1.47,84,40,"mild", "Shanghai"],
        [108,80,121,1.3,85,37,"mild", "Shanghai"],
        [134,83,167,1.16,57,43,"mild", "Shanghai"],
        [79,43,107,1.05,59,37,"good", "Shanghai"],
        [71,46,89,0.86,64,25,"good", "Shanghai"],
        [97,71,113,1.17,88,31,"good", "Shanghai"],
        [84,57,91,0.85,55,31,"good", "Shanghai"],
        [87,63,101,0.9,56,41,"good", "Shanghai"],
        [104,77,119,1.09,73,48,"mild", "Shanghai"],
        [87,62,100,1,72,28,"good", "Shanghai"],
        [168,128,172,1.49,97,56,"moderate", "Shanghai"],
        [65,45,51,0.74,39,17,"good", "Shanghai"],
        [39,24,38,0.61,47,17,"excellent", "Shanghai"],
        [39,24,39,0.59,50,19,"excellent", "Shanghai"],
        [93,68,96,1.05,79,29,"good", "Shanghai"],
        [188,143,197,1.66,99,51,"moderate", "Shanghai"],
        [174,131,174,1.55,108,50,"moderate", "Shanghai"],
        [187,143,201,1.39,89,53,"moderate", "Shanghai"]
      ],
      CATEGORY_DIM_COUNT: 6,
      GAP: 1,
      BASE_LEFT: 5,
      BASE_TOP: 10,
      CATEGORY_DIM: 7,
      SYMBOL_SIZE: 3,
    }
  },
  methods: {
    retrieveScatterData(data, dimX, dimY) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var item = [data[i][dimX], data[i][dimY]];
        item[this.CATEGORY_DIM] = data[i][this.CATEGORY_DIM];
        result.push(item);
      }
      return result;
    },
    generateGrids() {
      var index = 0;

      for (var i = 0; i < this.CATEGORY_DIM_COUNT; i++) {
        for (var j = 0; j < this.CATEGORY_DIM_COUNT; j++) {
          if (this.CATEGORY_DIM_COUNT - i + j >= this.CATEGORY_DIM_COUNT) {
            continue;
          }

          this.option.grid.push({
            left: this.BASE_LEFT + i * (this.GRID_WIDTH + this.GAP) + '%',
            top: this.BASE_TOP + j * (this.GRID_HEIGHT + this.GAP) + '%',
            width: this.GRID_WIDTH + '%',
            height: this.GRID_HEIGHT + '%'
          });

          this.option.brush.xAxisIndex && this.option.brush.xAxisIndex.push(index);
          this.option.brush.yAxisIndex && this.option.brush.yAxisIndex.push(index);

          this.option.xAxis.push({
            splitNumber: 3,
            position: 'top',
            axisLine: {
              show: j === 0,
              onZero: false
            },
            axisTick: {
              show: j === 0,
              inside: true
            },
            axisLabel: {
              show: j === 0
            },
            type: 'value',
            gridIndex: index,
            scale: true
          });

          this.option.yAxis.push({
            splitNumber: 3,
            position: 'right',
            axisLine: {
              show: i === this.CATEGORY_DIM_COUNT - 1,
              onZero: false
            },
            axisTick: {
              show: i === this.CATEGORY_DIM_COUNT - 1,
              inside: true
            },
            axisLabel: {
              show: i === this.CATEGORY_DIM_COUNT - 1
            },
            type: 'value',
            gridIndex: index,
            scale: true
          });

          this.option.series.push({
            type: 'scatter',
            symbolSize: this.SYMBOL_SIZE,
            xAxisIndex: index,
            yAxisIndex: index,
            data: this.retrieveScatterData(this.rawData, i, j)
          });

          this.option.visualMap.seriesIndex.push(this.option.series.length - 1);

          index++;
        }
      }
    },
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
  },
  created(){
    this.generateGrids();
  },
  mounted(){
    this.fetchData();
  },
}
</script>