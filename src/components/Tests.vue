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
              <span>SED</span>
              <span class="font-weight-light">DEMO tests</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="overline blue-grey--text text--lighten-3">
              user-id
            </span>
          </v-app-bar>

          <v-card
            max-width="344"
            class="mx-auto my-3"
            v-if="activeBtn==0"
          >
            <v-card-title>Select your role</v-card-title>
            <v-card-text>
<!--               <v-btn color="error" fab x-large dark>
                👨‍🏭
              </v-btn>
              <v-btn color="primary" fab x-large dark>
                👩‍💻
              </v-btn>
              <v-btn color="success" fab x-large dark>
                👩‍🚀
              </v-btn>
              <v-btn color="warning" fab x-large dark>
                👩‍🔧
              </v-btn> -->

              <v-list rounded>
                <v-list-item-group 
                  v-model="role" 
                  color="blue-grey"
                  mandatory
                >
                  <v-list-item
                    v-for="(role, i) in roles"
                    :key="i"
                    :color="role.color"
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
            <v-card-title>Prioritize these attributes</v-card-title>
            <v-card-text>
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
            <v-card-text class="pt-0">
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
                  Rim
                </v-btn>
                <v-btn>
                  Disc
                </v-btn>
                <v-btn>
                  Drum
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
            <v-card-text>
              <!-- <OtherChart></OtherChart> -->
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
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import OtherChart from './OtherChart'

  export default {
    components: {
      draggable,
      OtherChart,
    },
    data () {
      return {
        activeBtn: 0,
        role: 0,
        roles: [
          { text: 'User', icon: '👩‍🚀', color: 'red' },
          { text: 'Design', icon: '👩‍💻', color: 'blue' },
          { text: 'Production', icon: '👨‍🏭', color: 'green' },
          { text: 'Maintenance', icon: '👩‍🔧', color: 'amber' },
        ],
        attribute: null,
        attributes: [
          { text: 'Low cost', icon: '💰', order: '1' },
          { text: 'High performance', icon: '🏅', order: '2' },
          { text: 'High reliability', icon: '🐢', order: '3' },
          { text: 'High maintainability', icon: '🛠️', order: '4' },
        ],
        valueA: undefined,
        toggle_saddle: undefined,
        toggle_drivetrain: undefined,
        toggle_brakes: undefined,
        toggle_handlebars: undefined,
        toggle_wheels: undefined,
        toggle_frame: undefined,
      }
    },
    methods: {
        updateAttributeOrder: function() {
            var attributes = this.attributes.map(function(attribute, index) {
                return { text: attribute.text, icon: attribute.icon, order: index+1 }
            })

            this.attributes = attributes
        }
    }
  }
</script>
