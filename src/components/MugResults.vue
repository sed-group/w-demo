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
            <v-card-title>Plot</v-card-title>
            <v-card-text>
              <!-- This is where the d3 svg is loaded -->
              <div class="d3-canvas"></div>
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
                  <tr v-for="item in designs" :key="item.volume">
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
import * as d3 from 'd3'

  export default {
    components: {
    },
    computed: {
    },
    data () {
      return {
        activeBtn: 0,
        designs: [],
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
          console.log(data)

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
