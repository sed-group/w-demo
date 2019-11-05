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
          <span class="overline">Kayak Orders</span>
          <v-spacer></v-spacer>
          <img src="@/assets/WingquistWhite.png" alt="Wingquist Laboratory" width="110" height="26">
        </v-app-bar>

        <v-card
          max-width="1280"
          class="mx-auto my-3"
          v-if="activeBtn==0"
        >
          <v-card-title>Collected results</v-card-title>
          <v-card-text>
            <!-- This is where the d3 svg is loaded -->
            <div class="canvas"></div>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Client</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Delivery</th>
                  <th class="text-left">Length (mm)</th>
                  <th class="text-left">Total manufacturing time (h)</th>
                  <th class="text-left">Total price (£)</th>
                  <th class="text-left">Manufacturing CO2 (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in designs" :key="item.role">
                  <td class="text-left">{{ item.client }}</td>
                  <td class="text-left">{{ roles[item.role].icon }} {{ roles[item.role].text }}</td>
                  <td class="text-left">{{ DeliveryOptions[item.delivery].text }}</td>
                  <td class="text-left">{{ parseFloat(item.variant.Length).toFixed(2) }}</td>
                  <td class="text-left">{{ parseFloat(item.time.manufacturing).toFixed(2) }}</td>
                  <td class="text-left">{{ parseFloat(item.price.total).toFixed(2) }}</td>
                  <td class="text-left">{{ parseFloat(item.energy.manufacturing * 0.212).toFixed(2) }}</td>
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

  export default {
    components: {
    },
    computed: {
    },
    data () {
      return {
        activeBtn: 0,
        designs: [],
        roles: [
          { text: 'Beginner', icon: '🔰', color: 'green' },
          { text: 'Advanced', icon: '🏆', color: 'blue' },
        ],
        DeliveryOptions: [
          {
            text: "Sweden",
            value: 0,
          },
          {
            text: "Europe",
            value: 1,
          },
          {
            text: "Rest of the world",
            value: 2,
          },
        ],
      }
    },
    methods: {
      displayData() {
        
        // data & firebase hook-up
        var data = [];

        db.collection('kayaks').onSnapshot(res=> {

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
    mounted(){
      this.displayData()
    },
  }
</script>
