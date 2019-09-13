<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>

        <v-card flat>

          <v-toolbar
            color="blue-grey"
            dark
            flat
          >
            <v-toolbar-title class="headline text-uppercase">
              <span>SED</span>
              <span class="font-weight-light">DEMO</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="overline blue-grey--text text--lighten-3">
              user-id
            </span>

            <template v-slot:extension>
              <v-tabs
                v-model="tab"
                background-color="blue-grey"
                show-arrows
                dark
                centered
                icons-and-text
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-1">
                  Configure
                  <v-icon>mdi-tune</v-icon>
                </v-tab>

                <v-tab href="#tab-2">
                  Model
                  <v-icon>mdi-ufo</v-icon>
                </v-tab>

                <v-tab href="#tab-3">
                  Analysis
                  <v-icon>mdi-flask</v-icon>
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item
              value="tab-1"
            >
              <v-card flat>
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

<!--                   <v-subheader>Cars</v-subheader>
                  <v-btn-toggle
                    v-model="toggle_car"
                    mandatory
                  >
                    <v-btn>
                      <v-icon>mdi-car-sports</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-car-convertible</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-car-side</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-car-hatchback</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-car-pickup</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-car-estate</v-icon>
                    </v-btn>
                  </v-btn-toggle> -->
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card flat>
                <v-card-text>
                  Saddle: {{ toggle_saddle }}
                  Drivetrain: {{ toggle_drivetrain }}
                  Brakes: {{ toggle_brakes }}
                  Handlebars: {{ toggle_handlebars }}
                  Wheels: {{ toggle_wheels }}
                  Frame: {{ toggle_frame }}
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              value="tab-3"
            >
              <v-card flat>
                <v-card-text>
                  <RandomChart/>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RandomChart from './RandomChart';

  export default {
    components: {
      RandomChart,
    },
    data () {
      return {
        toggle_saddle: undefined,
        toggle_drivetrain: undefined,
        toggle_brakes: undefined,
        toggle_handlebars: undefined,
        toggle_wheels: undefined,
        toggle_frame: undefined,
        toggle_car: undefined,
        value: 30,
        rules: [
          v => v <= 40 || 'Only 40 in stock',
        ],
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
