<template>
  <v-container pa-0>
    <v-row
      text-center
      no-gutters
    >
      
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
        <span class="overline">Mug Demo</span>
        <v-spacer></v-spacer>
        <img src="@/assets/WingquistWhite.png" alt="Wingquist Laboratory" width="110" height="26">
      </v-app-bar>

      <v-col>
        <v-row no-gutters>
          <v-col xs="6" v-if="activeBtn==0">
            <v-card
              class="mx-3 mt-3"
            >
              <v-card-title>Mug</v-card-title>
              <v-card-text class="py-0">
                <svg 
                  :height="height+130" 
                  width="312"
                  style="display:block;margin:auto;"
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="6" v-if="activeBtn==0">
            <v-card
              class="mx-3 mt-3"
            >
              <v-card-text>
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
          </v-col>
          <v-col xs="6" v-if="activeBtn==1">
            <v-card
              class="mx-3 mt-3"
            >
              <v-card-title>Analysis</v-card-title>
              <v-card-text class="py-0 text-center">
                <p>Beep boop analysing...</p>
                <br>
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="blue-grey"
                  indeterminate
                ></v-progress-circular>
                <br>
                <br>
                <br>
                <br>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="6" v-if="activeBtn==1">
            <v-card
              class="mx-3 mt-3"
            >
              <v-card-text>
                <p class="text-left">Good enough? Submit it!</p>
                <div class="text-center">
                  <v-btn @click="submitDesign" rounded color="primary" outlined dark large>Submit</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-bottom-navigation
      v-model="activeBtn"
      color="blue-grey"
      fixed
      app
      shift
    >

      <v-btn>
        <span>Mug</span>
        <v-icon>mdi-coffee</v-icon>
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
import { db } from '@/main'

  export default {
    components: {
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
        var endY = (100 + this.height - 40).toString()
        var d = ""
        if (this.selectedHandle == 'Rounded') {
          d = "m " + x + ",100 q " + this.handleSeparation + " 0 " + this.handleSeparation + " " + i + " T " + x + "," + endY;
        } else if (this.selectedHandle == 'Rectangular') {
          d = "m " + x + ",100 h " + this.handleSeparation + " V " + endY + " h -" + this.handleSeparation;
        } else if (this.selectedHandle == 'Open') {
          var endX = (parseInt(x) + this.handleSeparation).toString()
          // if (this.height >= 80) {
          //   var midY = 40
          // } else {
            var midY = (this.height - 40) / 4
          // }
          d = "m " + x + ",100 q " + this.handleSeparation + " 0 " + this.handleSeparation + " " + midY + " T " + endX + "," + endY;
        }
        return d
      },
      mugVolume() {
        return (Math.PI * (this.height - this.mugThickness) * (((this.diameterTop-2*this.mugThickness)+(this.diameterBottom-2*this.mugThickness))/4)**2/1000).toFixed(2)
      },
      mugWeight() {
        var v1 = (Math.PI * this.height * ((this.diameterTop+this.diameterBottom)/4)**2/1000).toFixed(2)
        var v2 = this.mugVolume
        var lHandle = 2 * this.handleSeparation + this.height;
        if (this.selectedHandle == 'Rounded') {
          lHandle = lHandle * 0.7
        } else if (this.selectedHandle == 'Rectangular') {
          lHandle = lHandle * 1
        } else if (this.selectedHandle == 'Open') {
          lHandle = lHandle * 0.55
        }
        var vHandle = (this.handleThickness/2)**2*Math.PI*lHandle;
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        return ((v1-v2+vHandle)*material['density']).toFixed(2)
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
        var mug = {
          material: this.selectedMaterial,
          handle: this.selectedHandle,
          height: this.height,
          diameterTop: this.diameterTop,
          diameterBottom: this.diameterBottom,
          mugThickness: this.mugThickness,
          handleThickness: this.handleThickness,
          handleSeparation: this.handleSeparation,
          volume: this.mugVolume,
          weight: this.mugWeight,
        }
        this.overlay = !this.overlay
        this.uploading = true
        db.collection('mugs').add(mug).then((response) => {
          if (response) {
            //console.log(response)
            this.uploading = false
          }
        }).catch((error) => {
          //console.log(error)
          this.error = error
        })
      },
    }
  }
</script>
