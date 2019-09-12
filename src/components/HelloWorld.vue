<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-card flat>
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

          <v-tabs-items v-model="tab">
            <v-tab-item
              value="tab-1"
            >
              <v-card flat>
                <v-card-text class="pt-0">
                  <v-subheader>Cards</v-subheader>
                  <v-btn-toggle
                    v-model="toggle_card"
                    mandatory
                  >
                    <v-btn>
                      <v-icon>mdi-cards-heart</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-cards-diamond</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-cards-club</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-cards-spade</v-icon>
                    </v-btn>
                  </v-btn-toggle>

                  <v-subheader>Cars</v-subheader>
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
                  </v-btn-toggle>
                  
                  <v-subheader>Cards</v-subheader>
                  <v-btn-toggle
                    v-model="toggle_card"
                    mandatory
                  >
                    <v-btn>
                      <v-icon>mdi-cards-heart</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-cards-diamond</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-cards-club</v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon>mdi-cards-spade</v-icon>
                    </v-btn>
                  </v-btn-toggle>

                  <v-subheader>Cars</v-subheader>
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
                  </v-btn-toggle>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card flat>
                <v-card-text>2</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              value="tab-3"
            >
              <v-card flat>
                <v-card-text>3</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        toggle_card: undefined,
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
