<template>
  <v-container pa-0>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>


          <v-app-bar
            :color="roles[role].color"
            dark
            flat
            app
          >
            <v-toolbar-title class="headline text-uppercase">
              <span>SE</span>
              <span class="font-weight-light">DESIGN</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="overline">Kayak</span>
            <v-spacer></v-spacer>
            <img src="@/assets/WingquistWhite.png" alt="Wingquist Laboratory" width="110" height="26">
          </v-app-bar>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==0"
          >
            <v-card-title>Select your level</v-card-title>
            <v-card-text>
              <p class="text-left">Please select your kayaking experience level:</p>
              <v-list rounded>
                <v-list-item-group 
                  v-model="role" 
                  color="blue-grey"
                  mandatory
                >
                  <v-list-item
                    v-for="(role, i) in roles"
                    :key="i"
                    :color="roles[i].color"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="role.text"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <span v-text="role.icon"></span>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==1"
          >
            <v-card-title>Customisation options</v-card-title>
            <v-card-text>
              <p class="text-left">Customise your kayak to fit your needs:</p>
              <v-select
                v-model="Location"
                :items="LocationItems"
                label="Where are you kayaking?"
                prepend-icon="mdi-waves"
                v-if="role==0"
              ></v-select>
              <v-select
                v-model="storage"
                :items="storageItems"
                label="How are you using the kayak?"
                prepend-icon="mdi-rowing"
                v-if="role==0"
              ></v-select>
              <v-slider
                v-model="manoeuvrabilityAdvanced"
                prepend-icon="mdi-gesture"
                append-icon="mdi-ruler"
                label="Manoeuvrability"
                max=11
                min=1
                ticks
                v-if="role==1"
              ></v-slider>
              <v-slider
                v-model="Thickness"
                prepend-icon="mdi-feather"
                append-icon="mdi-weight-lifter"
                label="Durability"
                max=6
                min=4
                ticks
                v-if="role==1"
              ></v-slider>
              <v-switch
                class="mt-0"
                v-model="storage"
                label="Back Storage Cabin"
                color="primary"
                v-if="role==1"
              ></v-switch>
              <!-- <v-divider></v-divider> -->
              <v-select
                v-model="LegLength"
                :items="LegLengthItems"
                label="Leg length"
              >
                <v-icon slot="prepend">{{legIcon}}</v-icon>
              </v-select>
              <v-select
                v-model="WaistWidth"
                :items="WaistWidthItems"
                label="Waist width"
                prepend-icon="mdi-arrow-expand-horizontal"
              ></v-select>
              <v-select
                v-model="Delivery"
                :items="DeliveryItems"
                label="Delivery location"
                prepend-icon="mdi-truck-delivery"
              ></v-select>
            </v-card-text>
          </v-card>


          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==2"
          >
            <v-card-title>Design</v-card-title>
            <v-card-text class="pt-0">
              <div class="text-left">Here is your custom kayak:</div>
              <v-row align="center" justify="center">
                <v-img
                  :src="getImgUrl('Final_Array_' + this.variant.number + '_Image.jpg')"
                  lazy-src="@/assets/Images/blur.jpg"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="344"
                  max-height="300"
                >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              </v-row>
              <v-row>
                <v-col>
                  Length: <b>{{(length/1000).toFixed(2)}} m</b>
                </v-col>
                <v-col>
                  Weight: <b>{{weight.toFixed(2)}} kg</b>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-progress-linear
                    color="primary"
                    height="10"
                    :value="lengthPercent"
                    striped
                  ></v-progress-linear>
                </v-col>
                <v-col>
                  <v-progress-linear
                    color="primary"
                    height="10"
                    :value="weightPercent"
                    striped
                  ></v-progress-linear>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==3"
          >
            <v-card-title>Analysis results</v-card-title>
            <v-card-text>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Manufacturing Time: <b>{{(manufacturingTime).toFixed(2)}} h</b></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table dense class="mb-3">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Phase</th>
                            <th class="text-left">Time (h)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-left">Pre-Processing</td>
                            <td class="text-left">{{(preprocessingTime).toFixed(2)}}</td>
                          </tr>
                          <tr>
                            <td class="text-left">Printing</td>
                            <td class="text-left">{{(printingTime).toFixed(2)}}</td>
                          </tr>
                          <tr>
                            <td class="text-left">Post-Processing</td>
                            <td class="text-left">{{(postprocessingTime).toFixed(2)}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <p class="text-left font-italic">Please allow up to {{(deliveryTime / 24).toFixed(0)}} additional days for delivery.</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Price (incl. Delivery): <b>{{(totalPrice).toFixed(2)}} £</b></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table dense class="mb-3">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Phase</th>
                            <th class="text-left">£</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-left">Pre-Processing</td>
                            <td class="text-left">{{(preprocessingCost*1.12).toFixed(2)}}</td>
                          </tr>
                          <tr>
                            <td class="text-left">Printing</td>
                            <td class="text-left">{{(printingCost*1.12).toFixed(2)}}</td>
                          </tr>
                          <tr>
                            <td class="text-left">Post-Processing</td>
                            <td class="text-left">{{(postprocessingCost*1.12).toFixed(2)}}</td>
                          </tr>
                          <tr>
                            <td class="text-left">Delivery</td>
                            <td class="text-left">{{(deliveryPrice).toFixed(0)}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Carbon Footprint: <b>{{(manufacturingCO2).toFixed(2)}} kg CO2</b></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="text-left">It would take 10 trees only <b>{{this.getDaysCO2(10).toFixed(2)}}</b> days to consume the CO2 created in the production of your kayak.</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <!-- <bar-chart :chart-data="datacollectionPrice" :options="options"></bar-chart> -->
              <br>
              <p class="text-left title">Like it? Order it!</p>
              <div class="text-center">
                <v-btn @click="submitDesign" rounded :color="roles[role].color" outlined dark large>Order kayak</v-btn>
              </div>
            </v-card-text>
          </v-card>

      </v-flex>
    </v-layout>
    <v-bottom-navigation
      v-model="activeBtn"
      :color="roles[role].color"
      fixed
      app
      shift
    >
      <v-btn>
        <span>Level</span>
        <v-icon>mdi-chevron-triple-up</v-icon>
      </v-btn>

      <v-btn>
        <span>Options</span>
        <v-icon>mdi-format-list-bulleted-type</v-icon>
      </v-btn>

      <v-btn>
        <span>Design</span>
        <v-icon>mdi-camera</v-icon>
      </v-btn>

      <v-btn>
        <span>Analysis</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>

    </v-bottom-navigation>
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          v-if="uploading"
          :size="70"
          :width="7"
          color="blue-grey"
          indeterminate
        ></v-progress-circular>
        <span v-if="!uploading">Thank you for your order!</span>
        <br>
        <v-btn
          icon
          @click="overlay = false"
          v-if="!uploading"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-overlay>
    </div>
  </v-container>
</template>

<script>
import { db } from '@/main'
//import BarChart from './BarChart.js'
import json from '../assets/database.json'

  export default {
    mixins: [],
    components: {
      //BarChart
    },
    computed: {
      CombinedAL: function () {
        var CombinedAL = ""
        var common = ""
        var beginning = (this.length).toString()
        if (beginning == "5000.00000000000") {
          beginning = "5000"
        }
        if (this.manoeuvrability < 5) {
          common = "4080200250230"
        } else if (this.manoeuvrability < 8) {
          common = "140168183250219"
        } else {
          common = "12015316510050"
        }
        var rocker = 5 * (this.manoeuvrability + 23)
        var storage = this.storage ? 1 : 0;
        var finnish = (rocker).toString() + (this.WaistWidth).toString() + (this.Thickness).toString() + storage.toString() + (this.LegLength).toString()
        CombinedAL = beginning + common + finnish
        return CombinedAL
      },
      legIcon: function () {
        var icon = this.LegLengthItems.find(x => x.value === this.LegLength).icon
        return icon
      },
      variant: function () {
        var item = this.datafile.find(x => x.CombinedAL === this.CombinedAL)
        return item
      },
      weight: function () {
        var weight = this.density * 10**-9 * this.variant.Volume;
        return weight
      },
      cost: function () {
        return Math.floor(50)
      },
      length: function() {
        var length = this.LegLength
        var step = (5000 - 4 * length) / 11
        length = 4 * length + this.manoeuvrability * step
        return length.toFixed(11)
      },
      lengthPercent: function () {
        return this.length / 5000 * 100
      },
      weightPercent: function () {
        return this.weight / 21.4 * 100
      },
      manoeuvrability: function() {
        var manoeuvrability = 7
        if (this.role == '0' & this.Location == '0') {
          manoeuvrability = 7
        } else if (this.role == '0' & this.Location == '1') {
          manoeuvrability = 9
        } else {
          manoeuvrability = this.manoeuvrabilityAdvanced
        }
        return manoeuvrability
      },
      preprocessingTime: function() {
        return this.preparationTime + this.setupTime
      },
      printingTime: function() {
        return (this.variant.Volume/25028)/60
      },
      postprocessingTime: function() {
        if (this.storage) {
          return 6
        } else {
          return 3
        }
      },
      manufacturingTime: function() {
        return this.preprocessingTime + this.printingTime + this.postprocessingTime
      },
      deliveryTime: function() {
        var destination = this.Delivery
        if (destination == 0) {
          return 96
        } else if (destination == 1) {
          return 168
        } else {
          return 240
        }
      },
      preprocessingCost: function() {
        var operatorCost = 20 // £/h
        var pcCost = 10 // £/h
        var preparationTime = this.preparationTime // h
        var quantity = 1
        var preparationCost = (operatorCost + pcCost) * (preparationTime * quantity)
        var machineCost = 15 // £/h
        var setupTime = this.setupTime // h
        var frequencyMaterialChange = 0
        var timeMaterialChange = 200 // h
        var setupCost = (operatorCost + machineCost) * (setupTime + (frequencyMaterialChange * timeMaterialChange))
        return preparationCost + setupCost
      },
      printingCost: function() {
        var operatorCost = 20 // £/h
        var machineCost = 15 // £/h
        var pcCost = 10 // £/h
        var volume = this.variant.Volume / 10**9 // m^3
        var printingTime = this.printingTime // h
        var materialDensity = this.density // kg/m^3
        var materialCost = 5 // £/kg
        var quantity = 1
        return ((printingTime*machineCost)+(volume*materialDensity*materialCost))+(printingTime*((operatorCost+pcCost)/quantity))
      },
      postprocessingCost: function() {
        var operatorCost = 20 // £/h
        var toolingCost = 15 // £/h
        var postprocessingTime = this.postprocessingTime // h
        var quantity = 1
        return (operatorCost + toolingCost) * (postprocessingTime * quantity)
      },
      deliveryPrice: function() {
        var destination = this.Delivery
        if (destination == 0) {
          return 40
        } else if (destination == 1) {
          return 75
        } else {
          return 150
        }
      },
      totalPrice: function() {
        return 1.12 * (this.preprocessingCost + this.printingCost + this.postprocessingCost) + this.deliveryPrice
      },
      preprocessingEnergy: function() {
        var preparationPower = 200 // W
        var setupPower = 200 // W
        var preparationTime = this.preparationTime // h
        var setupTime = this.setupTime // h
        var quantity = 1
        var preparationEnergy = quantity * preparationPower * preparationTime / 1000 // kWh
        var setupEnergy = quantity * setupPower * setupTime / 1000 // kWh
        return preparationEnergy + setupEnergy
      },
      printingEnergy: function() {
        var printingPower = 1200 // W
        var printingTime = this.printingTime // h
        var quantity = 1
        return quantity * (printingTime * printingPower) / 1000 // kWh
      },
      postprocessingEnergy: function() {
        var postprocessingPower = 1200 // W
        var postprocessingTime = this.postprocessingTime // h
        var quantity = 1
        return quantity * (postprocessingTime * postprocessingPower) / 1000 // kWh
      },
      manufacturingEnergy: function() {
        return this.preprocessingEnergy + this.printingEnergy + this.postprocessingEnergy
      },
      manufacturingCO2: function() {
        return this.manufacturingEnergy * 0.212 //kg
      },
    },
    data () {
      return {
        preparationTime: 0.75, // h
        setupTime: 0.5, // h
        density: 750, // kg/m^3
        datafile: json,
        datacollectionTime:  {
          datasets: [
            {
              label: 'Manufacturing Time',
              backgroundColor: '#8BC34A',
              data: [this.getRandomInt()],
              stack: "Time"
            },
            {
              label: 'Printing Time',
              backgroundColor: '#3F51B5',
              data: [this.getRandomInt()],
              stack: "Time"
            },
            {
              label: 'Post-Processing Time',
              backgroundColor: '#FFC107',
              data: [this.getRandomInt()],
              stack: "Time"
            }
          ]
        },
        datacollectionPrice:  {
          labels: ['Pre-Processing Time','Printing Time','Post-Processing Time','Delivery'],
          datasets: [
            {
              label: 'Manufacturing Time',
              backgroundColor: ['#8BC34A','#3F51B5','#FFC107','#1B5E20'],
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom',
          },
        scales: {
            yAxes: [{
                stacked: true
            }]
          },
        },
        uploading: false,
        overlay: false,
        activeBtn: 0,
        role: 0,
        roles: [
          { text: 'Beginner', icon: '🔰', color: 'green' },
          { text: 'Advanced', icon: '🏆', color: 'blue' },
        ],
        Location: 0,
        LocationItems: [
          {
            text: "Flat water",
            value: 0,
          },
          {
            text: "Sea water",
            value: 1,
          },
        ],
        LegLength: 800,
        LegLengthItems: [
          {
            text: "70cm - 80cm",
            value: 800,
            icon: "mdi-seat-legroom-reduced",
          },
          {
            text: "80cm - 90cm",
            value: 900,
            icon: "mdi-seat-legroom-normal",
          },
          {
            text: "90cm - 100cm",
            value: 1000,
            icon: "mdi-seat-legroom-extra",
          },
        ],
        WaistWidth: 210,
        WaistWidthItems: [
          {
            text: "60cm - 70cm",
            value: 210,
          },
          {
            text: "70cm - 90cm",
            value: 220,
          },
          {
            text: "90cm - 110cm",
            value: 230,
          },
        ],
        Delivery: 0,
        DeliveryItems: [
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
        manoeuvrabilityAdvanced: 7,
        Thickness: 4,
        storage: false,
        storageItems: [
          {
            text: "Recreational",
            value: false,
          },
          {
            text: "Touring",
            value: true,
          }
        ],
        error: null,
      }
    },
    methods: {
      submitDesign: function() {
        var design = {
          role: this.role,
          configuration: "something",
          createdOn: new Date(),
        }
        this.overlay = !this.overlay
        this.uploading = true
        db.collection('kayaks').add(design).then((response) => {
          if (response) {
            //console.log(response)
            this.uploading = false
          }
        }).catch((error) => {
          //console.log(error)
          this.error = error
        })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      getImgUrl(pic) {
        var imageUrl = null
        try {
          imageUrl = require('../assets/Images/'+pic)
        } catch (error) {
          imageUrl = 'missing'
        }
        return imageUrl
      },
      getDaysCO2(trees) {
        var days = (this.manufacturingCO2 / 2) * 365 / trees
        return days
      },
    },
    mounted() {
    }
  }
</script>