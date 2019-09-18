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
    mixins: [],
    components: {
      draggable,
      //OtherChart,
    },
    computed: {
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
    data () {
      return {
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
    methods: {
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
        db.collection('bikes').add(design).then((response) => {
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
