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
            <v-card-title>Collected results</v-card-title>
            <v-card-text>
              <!-- This is where the d3 svg is loaded -->
              <div class="canvas"></div>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Role</th>
                    <th class="text-left">Priorities</th>
                    <th class="text-left">Saddle</th>
                    <th class="text-left">Drivetrain</th>
                    <th class="text-left">Brakes</th>
                    <th class="text-left">Handlebars</th>
                    <th class="text-left">Wheels</th>
                    <th class="text-left">Frame</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in designs" :key="item.role">
                    <td>{{ roles[item.role].icon }} {{ roles[item.role].text }}</td>
                    <td>
                      <ol id="example-1">
                        <li :v-for="priority in item.priorities">
                          {{ priority.text }}
                        </li>
                      </ol>
                    </td>
                    <td>{{ item.saddle }}</td>
                    <td>{{ item.drivetrain }}</td>
                    <td>{{ item.brakes }}</td>
                    <td>{{ item.handlebars }}</td>
                    <td>{{ item.wheels }}</td>
                    <td>{{ item.frame }}</td>
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
          { text: 'User', icon: '👩‍🚀', color: 'red' },
          { text: 'Designer', icon: '👩‍💻', color: 'blue' },
          { text: 'Production engineer', icon: '👨‍🏭', color: 'green' },
          { text: 'Maintenance engineer', icon: '👩‍🔧', color: '#FFC107' },
        ],
      }
    },
    methods: {
      displayData() {
        
        // data & firebase hook-up
        var data = [];

        db.collection('designs').onSnapshot(res=> {

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
