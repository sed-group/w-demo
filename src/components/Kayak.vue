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

        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1" editable :color="roles[role].color">
            Select your level
            <small>Please select your kayaking experience level</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-card
              class="mx-auto my-3"
              flat
            >
              <v-card-text>
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
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2" editable :color="roles[role].color">
            Customization options
            <small>Customise your kayak to fit your needs</small>
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card
              class="mx-auto my-3"
              flat
            >
              <v-card-text>
                <v-select
                  v-model="Location"
                  :items="LocationOptions"
                  label="Where are you kayaking?"
                  prepend-icon="mdi-waves"
                  v-if="role==0"
                ></v-select>
                <v-select
                  v-model="storage"
                  :items="storageOptions"
                  label="How are you using the kayak?"
                  prepend-icon="mdi-rowing"
                  v-if="role==0"
                ></v-select>
                <v-select
                  v-model="manoeuvrabilityAdvanced"
                  :items="manoeuvrabilityOptions"
                  label="Manoeuvrability vs tracking"
                  prepend-icon="mdi-gesture"
                  v-if="role==1"
                ></v-select>
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
                  :items="LegLengthOptions"
                  label="Leg length"
                >
                  <v-icon slot="prepend">{{legIcon}}</v-icon>
                </v-select>
                <v-select
                  v-model="WaistWidth"
                  :items="WaistWidthOptions"
                  label="Waist width"
                  prepend-icon="mdi-arrow-expand-horizontal"
                ></v-select>
                <v-select
                  v-model="Delivery"
                  :items="DeliveryOptions"
                  label="Delivery location"
                  prepend-icon="mdi-truck-delivery"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3" editable :color="roles[role].color">
            Design
            <small>Overview of your kayak</small>
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card
              class="mx-auto my-3"
              flat
            >
              <v-card-text class="pt-0">
                <v-row align="center" justify="center">
                  <v-img
                    :src="getImgUrl('Final_Array_' + this.variant.number + '_Image.jpg')"
                    lazy-src="@/assets/Images/blur.jpg"
                    width="300"
                    min-width="100"
                    contain
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
                      :color="roles[role].color"
                      height="10"
                      :value="lengthPercent"
                      striped
                    ></v-progress-linear>
                  </v-col>
                  <v-col>
                    <v-progress-linear
                      :color="roles[role].color"
                      height="10"
                      :value="weightPercent"
                      striped
                    ></v-progress-linear>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 4" step="4" editable :color="roles[role].color">
            Analysis results
            <small>Breakdown of time, price and carbon footprint</small>
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card
              class="mx-auto"
              flat
            >
              <v-card-text>
                <p class="subtitle-1 text-left">Manufacturing Time: <b>{{(manufacturingTime).toFixed(2)}} h</b></p>
                <v-simple-table dense class="mb-3">
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td class="text-left">Pre-Processing</td>
                        <td class="text-left">{{(preprocessingTime).toFixed(2)}} h</td>
                      </tr>
                      <tr>
                        <td class="text-left">Printing</td>
                        <td class="text-left">{{(printingTime).toFixed(2)}} h</td>
                      </tr>
                      <tr>
                        <td class="text-left">Post-Processing</td>
                        <td class="text-left">{{(postprocessingTime).toFixed(2)}} h</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <p class="text-left font-italic">Please allow up to {{(deliveryTime / 24).toFixed(0)}} additional days for delivery to {{DeliveryOptions[Delivery].text}}.</p>
                      
                <p class="subtitle-1 text-left">Price (incl. Delivery): <b>{{(totalPrice).toFixed(2)}} £</b></p>
                <v-simple-table dense class="mb-3">
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td class="text-left">Pre-Processing</td>
                        <td class="text-left">{{(preprocessingCost*1.12).toFixed(2)}} £</td>
                      </tr>
                      <tr>
                        <td class="text-left">Printing</td>
                        <td class="text-left">{{(printingCost*1.12).toFixed(2)}} £</td>
                      </tr>
                      <tr>
                        <td class="text-left">Post-Processing</td>
                        <td class="text-left">{{(postprocessingCost*1.12).toFixed(2)}} £</td>
                      </tr>
                      <tr>
                        <td class="text-left">Delivery</td>
                        <td class="text-left">{{(deliveryPrice).toFixed(0)}} £</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                      
                <p class="subtitle-1 text-left">Carbon Footprint: <b>{{(manufacturingCO2).toFixed(2)}} kg CO2</b></p>
                <img v-for="index in parseInt(this.getTreesCO2(30))" :key="index" alt="Tree" src="../assets/tree.svg" width="20">
                <p class="text-left">It would take only <b>{{this.getTreesCO2(30).toFixed(0)}}</b> trees one month to consume the CO2 created in the production of your kayak.</p>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-step step="5" editable :color="roles[role].color">
            Order
            <small>Like it? Order it!</small>
          </v-stepper-step>
          <v-stepper-content step="5">
            <v-card
              class="mx-auto my-3"
              flat
            >
              <v-card-text>
                <div class="text-center">
                  <v-btn
                    @click="submitDesign"
                    :color="roles[role].color"
                    rounded
                    outlined
                    dark
                    large
                    :disabled="!valid"
                  >
                    Order kayak
                  </v-btn>
                </div>
                <v-form
                  v-model="valid"
                  @submit.prevent
                >
                  <v-text-field
                    v-model="client"
                    :rules="nameRules"
                    label="Your name"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-stepper-content>

        </v-stepper>

      </v-flex>
    </v-layout>

    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          v-if="uploading"
          :size="70"
          :width="7"
          color="blue-grey"
          indeterminate
        ></v-progress-circular>
        <span v-if="!uploading">Thank you for your order, {{this.client}}!</span>
        <br>
        <v-btn
          icon
          @click="overlay = false; e6 = 1"
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
import Filter from 'bad-words'

let filter = new Filter()

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
        var icon = this.LegLengthOptions.find(x => x.value === this.LegLength).icon
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
      time: function() {
        var time = {
          preparation: this.preparationTime,
          setup: this.setupTime,
          preprocessing: this.preprocessingTime,
          printing: this.printingTime,
          postprocessing: this.postprocessingTime,
          manufacturing: this.manufacturingTime,
          delivery: this.deliveryTime,
          total: this.manufacturingTime + this.deliveryTime
        }
        return time
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
      manufacturingCost: function() {
        return this.preprocessingCost + this.printingCost + this.postprocessingCost
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
      price: function() {
        var markup = 1.12
        var price = {
          preprocessing: this.preprocessingCost * markup,
          printing: this.printingCost * markup,
          postprocessing: this.postprocessingCost * markup,
          manufacturing: this.manufacturingCost * markup,
          delivery: this.deliveryPrice,
          total: this.manufacturingCost * markup + this.deliveryPrice
        }
        return price
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
      energy: function() {
        var energy = {
          preprocessing: this.preprocessingEnergy,
          printing: this.printingEnergy,
          postprocessing: this.postprocessingEnergy,
          manufacturing: this.manufacturingEnergy,
          total: this.manufacturingEnergy
        }
        return energy
      },
      manufacturingCO2: function() {
        return this.manufacturingEnergy * 0.212 //kgCo2
      },
    },
    data () {
      return {
        client: "",
        nameRules: [
          v => !!v || 'Name is required',
        ],
        valid: true,
        e6: 1,
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
        LocationOptions: [
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
        LegLengthOptions: [
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
        WaistWidthOptions: [
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
        manoeuvrabilityAdvanced: 7,
        manoeuvrabilityOptions: [
          {
            text: "1 - Maximum manoeuvrability",
            value: 1,
          },
          {
            text: "2",
            value: 2,
          },
          {
            text: "3",
            value: 3,
          },
          {
            text: "4",
            value: 4,
          },
          {
            text: "5",
            value: 5,
          },
          {
            text: "6",
            value: 6,
          },
          {
            text: "7 - Beginner in flat water",
            value: 7,
          },
          {
            text: "8",
            value: 8,
          },
          {
            text: "9 - Beginner in sea water",
            value: 9,
          },
          {
            text: "10",
            value: 10,
          },
          {
            text: "11 - Maximum tracking",
            value: 11,
          },
        ],
        Thickness: 4,
        storage: false,
        storageOptions: [
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
        this.client = filter.clean(this.client)
        var design = {
          client: this.client,
          delivery: this.Delivery,
          role: this.role,
          variant: this.variant,
          createdOn: new Date(),
          time: this.time,
          price: this.price,
          energy: this.energy
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
      getTreesCO2(days) {
        var trees = (this.manufacturingCO2 / 2) * 365 / days
        return trees
      },
    },
    mounted() {
    }
  }
</script>