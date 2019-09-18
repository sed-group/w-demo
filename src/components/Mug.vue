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
            <span class="overline" v-text="roles[role].text"></span>
            <v-spacer></v-spacer>
            <img src="@/assets/WingquistWhite.png" alt="Wingquist Laboratory" width="110" height="26">
          </v-app-bar>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==0"
          >
            <v-card-title>Select your role</v-card-title>
            <v-card-text>
              <p class="text-left">Select the role you want to play in this product development demonstration:</p>
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
            <v-card-title>What are your priorities?</v-card-title>
            <v-card-text>
              <p class="text-left">Drag and drop the following attributes to rank them so the ones you value the most in your role as <span :style="{color:roles[role].color}">{{ roles[role].text.toLowerCase() }}</span> are at the top:</p>
              <v-list flat>
                
                <v-list-item-group v-model="attribute" color="blue-grey">
                  <draggable v-model="attributes" group="attributes" @end="updateAttributeOrder">
                    <v-list-item
                      v-for="(attribute, i) in attributes"
                      :key="i"
                    >
                      <v-list-item-icon>
                        <span v-text="attribute.order"></span>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="attribute.text"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <span v-text="attribute.icon"></span>
                      </v-list-item-icon>
                    </v-list-item>
                  </draggable>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>


          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==2"
          >
            <v-card-title>Design the product</v-card-title>
            <v-card-text class="pt-0">
              <div class="text-left">Configure the product, paying attention to how the different alternatives affect the overall weight and cost:</div>
              <v-row>
                <v-col>
                  <span>Weight</span>
                  <v-progress-linear
                    color="cyan"
                    height="10"
                    :value="weight"
                    striped
                  ></v-progress-linear>
                </v-col>
                <v-col>
                  <span>Cost</span>
                  <v-progress-linear
                    color="teal"
                    height="10"
                    :value="cost"
                    striped
                  ></v-progress-linear>
                </v-col>
              </v-row>
              <v-subheader>Saddle</v-subheader>
              <v-btn-toggle
                v-model="toggle_saddle"
                mandatory
              >
                <v-btn>
                  Cruise
                </v-btn>
                <v-btn>
                  Comfort
                </v-btn>
                <v-btn>
                  Racing
                </v-btn>
              </v-btn-toggle>
              <v-subheader>Drivetrain (speeds)</v-subheader>
              <v-btn-toggle
                v-model="toggle_drivetrain"
                mandatory
              >
                <v-btn>
                  1
                </v-btn>
                <v-btn>
                  3
                </v-btn>
                <v-btn>
                  5
                </v-btn>
                <v-btn>
                  7
                </v-btn>
                <v-btn>
                  11
                </v-btn>
              </v-btn-toggle>
              <v-subheader>Brakes</v-subheader>
              <v-btn-toggle
                v-model="toggle_brakes"
                mandatory
              >
                <v-btn>
                  Drum
                </v-btn>
                <v-btn>
                  Rim
                </v-btn>
                <v-btn>
                  Disc
                </v-btn>
              </v-btn-toggle>
              <v-subheader>Handlebars</v-subheader>
              <v-btn-toggle
                v-model="toggle_handlebars"
                mandatory
              >
                <v-btn>
                  Straight
                </v-btn>
                <v-btn>
                  Track
                </v-btn>
                <v-btn>
                  Ergo
                </v-btn>
              </v-btn-toggle>
              <v-subheader>Wheels</v-subheader>
              <v-btn-toggle
                v-model="toggle_wheels"
                mandatory
              >
                <v-btn>
                  20"
                </v-btn>
                <v-btn>
                  24"
                </v-btn>
                <v-btn>
                  26"
                </v-btn>
                <v-btn>
                  28"
                </v-btn>
              </v-btn-toggle>
              <v-subheader>Frame</v-subheader>
              <v-btn-toggle
                v-model="toggle_frame"
                mandatory
              >
                <v-btn>
                  Steel
                </v-btn>
                <v-btn>
                  Al
                </v-btn>
                <v-btn>
                  Carbon
                </v-btn>
              </v-btn-toggle>

            </v-card-text>
          </v-card>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==3"
          >
            <v-card-title>Analysis results</v-card-title>
            <v-card-text>
              <p class="text-left">The overall value of your design regarding your expressed priorities for your role as <span :style="{color:roles[role].color}">{{ roles[role].text.toLowerCase() }}</span> is represented in the following figure:</p>
              <!-- <OtherChart></OtherChart> -->
              <div class="text-center">
                <v-progress-circular
                  :rotate="-90"
                  :size="100"
                  :width="15"
                  :value="valueTotal"
                  color="light-blue"
                >
                  {{ valueTotal }}
                </v-progress-circular>
              </div>
              <br>
              <p class="text-left">Good enough? Submit it!</p>
              <div class="text-center">
                <v-btn @click="submitDesign" rounded :color="roles[role].color" outlined dark large>Submit</v-btn>
              </div>
              <br>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Peek under the model...</v-expansion-panel-header>
                  <v-expansion-panel-content>
                        <span>Sale Price</span>
                        <v-progress-linear
                          color="red"
                          height="10"
                          :value="valueSalePrice"
                          striped
                        ></v-progress-linear>
                        <br>
                        <span>Performance</span>
                        <v-progress-linear
                          color="indigo"
                          height="10"
                          :value="valuePerformance"
                          striped
                        ></v-progress-linear>
                        <br>
                        <span>Reliability</span>
                        <v-progress-linear
                          color="lime"
                          height="10"
                          :value="valueReliability"
                          striped
                        ></v-progress-linear>
                        <br>
                        <span>Maintainability</span>
                        <v-progress-linear
                          color="orange"
                          height="10"
                          :value="valueMaintainability"
                          striped
                        ></v-progress-linear>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==4"
          >
            <v-card-title>Coffe Mug</v-card-title>
            <v-card-text>
              <svg 
                :height="height+130" 
                width="312"
              >
                <text :x="cx" y="15" text-anchor="middle" fill="#03A9F4">{{ mugVolume }} ml</text>
                <text :x="cx" y="30" text-anchor="middle" fill="#FF5722">{{ mugWeight }} g</text>
                <ellipse 
                  id="mugBottom" 
                  :cx="cx" 
                  :cy="80+this.height" 
                  :rx="diameterBottom/2" 
                  :ry="diameterBottom/4" 
                  :style="lightStyle" 
                />
                <path
                  v-if="this.diameterTop>this.diameterBottom"
                  id="mugHandle1"
                  :style="handleStyle"
                  :d="handle"
                />
                <path 
                  id="mugBody" 
                  :style="lightStyle" 
                  :d="mugBody"
                />
                <path
                  v-if="this.diameterTop<=this.diameterBottom"
                  id="mugHandle2"
                  :style="handleStyle"
                  :d="handle"
                />
                <ellipse 
                  id="mugTop" 
                  :cx="cx" 
                  cy="80" 
                  :rx="diameterTop/2" 
                  :ry="diameterTop/4" 
                  :style="mediumStyle" 
                />
                <ellipse 
                  id="mugTopHole" 
                  :cx="cx" 
                  cy="80" 
                  :rx="diameterTop/2-mugThickness" 
                  :ry="diameterTop/4-mugThickness/2" 
                  :style="darkStyle" 
                />
                Sorry, your browser does not support inline SVG.  
              </svg>
              <v-container fluid class="py-0">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-row>
                      <v-col cols="6" class="pt-0">
                        <v-select
                          v-model="selectedMaterial"
                          :items="mugMaterials"
                          label="Material"
                          :menu-props="{ top: true, offsetY: true }"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="6" class="pt-0">
                        <v-select
                          v-model="selectedHandle"
                          :items="handleTypes"
                          label="Handle"
                          :menu-props="{ top: true, offsetY: true }"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-slider
                      v-model="height"
                      thumb-size="24"
                      thumb-label="always"
                      min="40"
                      max="200"
                      label="H1"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="decrementHeight"
                        >
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          @click="incrementHeight"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                    <v-slider
                      v-model="diameterTop"
                      thumb-size="24"
                      thumb-label="always"
                      min="40"
                      max="160"
                      label="D1"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="decrementDiameterTop"
                        >
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          @click="incrementDiameterTop"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                    <v-slider
                      v-model="diameterBottom"
                      thumb-size="24"
                      thumb-label="always"
                      min="40"
                      max="160"
                      label="D2"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="decrementDiameterBottom"
                        >
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          @click="incrementDiameterBottom"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                    <v-slider
                      v-model="mugThickness"
                      thumb-size="24"
                      thumb-label="always"
                      min="1"
                      max="10"
                      step="0.5"
                      label="T1"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="decrementMugThickness"
                        >
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          @click="incrementMugThickness"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                    <v-slider
                      v-model="handleThickness"
                      thumb-size="24"
                      thumb-label="always"
                      min="1"
                      max="30"
                      step="0.5"
                      label="T2"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="decrementHandleThickness"
                        >
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          @click="incrementHandleThickness"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                    <v-slider
                      v-model="handleSeparation"
                      thumb-size="24"
                      thumb-label="always"
                      min="10"
                      max="50"
                      step="1"
                      label="S1"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="decrementHandleSeparation"
                        >
                          mdi-minus
                        </v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          @click="incrementHandleSeparation"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
              </v-container>
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
        <span>Role</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn>
        <span>Priorities</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Design</span>
        <v-icon>mdi-sitemap</v-icon>
      </v-btn>

      <v-btn>
        <span>Analysis</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>

      <v-btn>
        <span>Mug</span>
        <v-icon>mdi-coffee</v-icon>
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
        <span v-if="!uploading">Design uploaded!</span>
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
import draggable from 'vuedraggable'
//import OtherChart from './OtherChart'
import { db } from '@/main'

  export default {
    components: {
      draggable,
      //OtherChart,
    },
    data () {
      return {
        selectedMaterial: 'C',
        mugMaterials: [
          {
            text:'Ceramic',
            value: 'C',
            density: 0.004, // g/mm3
            colorLight: '#BCAAA4',
            colorMedium: '#8D6E63',
            colorDark: '#3E2723',
            thermalExpansion: 10, // *10^-6/K
            thermalConductivity: 32, // W/m*K
            toughness: 0.01, // kJ/m^2
            strenght: 100, // MPa
          },
          {
            text:'Steel',
            value: 'S',
            density: 0.008, // g/mm3
            colorLight: '#B0BEC5',
            colorMedium: '#546E7A',
            colorDark: '#263238',
            thermalExpansion: 18, // *10^-6/K
            thermalConductivity: 41, // W/m*K
            toughness: 3, // kJ/m^2
            strenght: 3000, // MPa
          },
          {
            text:'Aluminium',
            value: 'Al',
            density: 0.0027, // g/mm3
            colorLight: '#E0E0E0',
            colorMedium: '#BDBDBD',
            colorDark: '#616161',
            thermalExpansion: 18, // *10^-6/K
            thermalConductivity: 41, // W/m*K
            toughness: 10, // kJ/m^2
            strenght: 300, // MPa
          },
          {
            text:'Polypropylene',
            value: 'PP',
            density: 0.00085, // g/mm3
            colorLight: '#EF9A9A',
            colorMedium: '#E53935',
            colorDark: '#B71C1C',
            thermalExpansion: 80, // *10^-6/K
            thermalConductivity: 0.11, // W/m*K
            toughness: 0.1, // kJ/m^2
            strenght: 40, // MPa
          },
        ],
        selectedHandle: 'Rounded',
        handleTypes: ['Rounded', 'Rectangular', 'Open'],
        cardWidth: 312,
        height: 120,
        diameterTop: 100,
        diameterBottom: 100,
        mugThickness: 5.5,
        handleThickness: 15.5,
        handleSeparation: 30,
        mugDensity: 0.004, // g/mm3
        uploading: false,
        overlay: false,
        activeBtn: 0,
        role: 0,
        roles: [
          { text: 'User', icon: '👩‍🚀', color: 'red' },
          { text: 'Designer', icon: '👩‍💻', color: 'blue' },
          { text: 'Production engineer', icon: '👨‍🏭', color: 'green' },
          { text: 'Maintenance engineer', icon: '👩‍🔧', color: '#FFC107' },
        ],
        attribute: null,
        attributes: [
          { text: 'Low sale price', icon: '💰', order: '1' },
          { text: 'High performance', icon: '🏅', order: '2' },
          { text: 'High reliability', icon: '🐢', order: '3' },
          { text: 'High maintainability', icon: '🛠️', order: '4' },
        ],
        toggle_saddle: 0,
        toggle_drivetrain: 0,
        toggle_brakes: 0,
        toggle_handlebars: 0,
        toggle_wheels: 0,
        toggle_frame: 0,
        error: null,
      }
    },
    computed: {
      lightStyle() { 
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        return "fill:" + material['colorLight'] + ";stroke:none;" 
      },
      mediumStyle() { 
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        return "fill:" + material['colorMedium'] + ";stroke:none;" 
      },
      darkStyle() { 
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        return "fill:" + material['colorDark'] + ";stroke:none;" 
      },
      handleStyle() {
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        var style = "fill:none;stroke:" + material['colorMedium'] + ";stroke-width:" + this.handleThickness + ";stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        return style
      },
      cx() { return (this.cardWidth / 2); },
      mugBody() {
        var topLeft = (this.cx - this.diameterTop/2).toString()
        var topRight = (this.cx + this.diameterTop/2).toString()
        var bottomLeft = (this.cx - this.diameterBottom/2).toString()
        var bottomRight = (this.cx + this.diameterBottom/2).toString()
        var d = "M " + topLeft + ",80 H " + topRight + " L " + bottomRight + "," + (80+this.height).toString() + " H " + bottomLeft + " Z"
        return d;
      },
      handle() {
        var x
        if (this.diameterTop < this.diameterBottom) {
          x = (this.cx + this.diameterTop/2).toString()
        } else {
          x = (this.cx + this.diameterBottom/2).toString()
        }
        var i = ((this.height - 40)/2).toString()
        var h = (100 + this.height - 40).toString()
        var d ="m " + x + ",100 q " + this.handleSeparation + " 0 " + this.handleSeparation + " " + i + " T " + x + "," + h;
        return d
      },
      mugVolume() {
        return (Math.PI * (this.height - this.mugThickness) * (((this.diameterTop-2*this.mugThickness)+(this.diameterBottom-2*this.mugThickness))/4)**2/1000).toFixed(2)
      },
      mugWeight() {
        var v1 = (Math.PI * this.height * ((this.diameterTop+this.diameterBottom)/4)**2/1000).toFixed(2)
        var v2 = this.mugVolume
        var lHandle = this.handleSeparation + this.height;
        var vHandle = (this.handleThickness/2)**2*Math.PI*lHandle;
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        return ((v1-v2+vHandle)*material['density']).toFixed(2)
      },
      weight: function () {
        return Math.floor(50 + (- this.toggle_saddle + this.toggle_drivetrain - this.toggle_brakes + this.toggle_handlebars + this.toggle_wheels - this.toggle_frame) * 50 / 9)
      },
      cost: function () {
        return Math.floor(50 + (this.toggle_saddle + this.toggle_drivetrain + this.toggle_brakes + this.toggle_handlebars + this.toggle_wheels + this.toggle_frame) * 50 / 15)
      },
      valueSalePrice: function () {
        return this.cost
      },
      valuePerformance: function () {
        var saddlePerformance = - this.toggle_saddle * 6
        var drivetrainPerformance = this.toggle_drivetrain * 3
        var brakesPerformance = this.toggle_brakes * 8
        var handlebarsPerformance = this.toggle_handlebars * 10
        var wheelsPerformance = this.toggle_wheels * 4
        var framePerformance = this.toggle_frame * 10
        return 32 + saddlePerformance + drivetrainPerformance + brakesPerformance + handlebarsPerformance + wheelsPerformance + framePerformance
      },
      valueReliability: function () {
        var saddleReliability = 10
        var drivetrainReliability = - this.toggle_drivetrain * 10
        var brakesReliability = this.toggle_brakes * 8
        var handlebarsReliability = - this.toggle_handlebars
        var wheelsReliability = - this.toggle_wheels * 2
        var frameReliability = - this.toggle_frame * 10
        return 74 + saddleReliability + drivetrainReliability + brakesReliability + handlebarsReliability + wheelsReliability + frameReliability
      },
      valueMaintainability: function () {
        var saddleMaintainability = this.toggle_saddle * 5
        var drivetrainMaintainability = - this.toggle_drivetrain * 5
        var brakesMaintainability = this.toggle_brakes * 7
        var handlebarsMaintainability = - this.toggle_handlebars * 7
        var wheelsMaintainability = this.toggle_wheels * 5
        var frameMaintainability = - this.toggle_frame * 15
        return 61 + saddleMaintainability + drivetrainMaintainability + brakesMaintainability + handlebarsMaintainability + wheelsMaintainability + frameMaintainability
      },
      valueTotal: function () {
        var priceValue = (5 - this.attributes.filter(obj => {
          return obj.text === "Low sale price"
        })[0].order) / 10 * this.valueSalePrice
        var performanceValue = (5 - this.attributes.filter(obj => {
          return obj.text === "High performance"
        })[0].order) / 10 * this.valuePerformance
        var reliabilityValue = (5 - this.attributes.filter(obj => {
          return obj.text === "High reliability"
        })[0].order) / 10 * this.valueReliability
        var maintainabilityValue = (5 - this.attributes.filter(obj => {
          return obj.text === "High maintainability"
        })[0].order) / 10 * this.valueMaintainability
        return Math.floor((100 - priceValue + performanceValue + reliabilityValue + maintainabilityValue) / 1.5)
      },
    },
    methods: {
      decrementHeight () {
        this.height--
      },
      incrementHeight () {
        this.height++
      },
      decrementDiameterTop () {
        this.diameterTop--
      },
      incrementDiameterTop () {
        this.diameterTop++
      },
      decrementDiameterBottom () {
        this.diameterBottom--
      },
      incrementDiameterBottom () {
        this.diameterBottom++
      },
      decrementMugThickness () {
        this.mugThickness--
      },
      incrementMugThickness () {
        this.mugThickness++
      },
      decrementHandleThickness () {
        this.handleThickness--
      },
      incrementHandleThickness () {
        this.handleThickness++
      },
      decrementHandleSeparation () {
        this.handleSeparation--
      },
      incrementHandleSeparation () {
        this.handleSeparation++
      },
      submitDesign: function() {
        var design = {
          role: this.role,
          priorities: this.attributes,
          saddle: this.toggle_saddle,
          drivetrain: this.toggle_drivetrain,
          brakes: this.toggle_brakes,
          handlebars: this.toggle_handlebars,
          wheels: this.toggle_wheels,
          frame: this.toggle_frame,
          cost: this.cost,
          weight: this.weight,
          price: this.valueSalePrice,
          performance: this.valuePerformance,
          reliability: this.valueReliability,
          maintainability: this.valueMaintainability,
        }
        this.overlay = !this.overlay
        this.uploading = true
        db.collection('designs').add(design).then((response) => {
          if (response) {
            //console.log(response)
            this.uploading = false
          }
        }).catch((error) => {
          //console.log(error)
          this.error = error
        })
      },
      updateAttributeOrder: function() {
        var attributes = this.attributes.map(function(attribute, index) {
          return { text: attribute.text, icon: attribute.icon, order: index+1 }
        })
        this.attributes = attributes
      }
    }
  }
</script>
