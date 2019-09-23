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
        <span class="overline">Home</span>
        <v-spacer></v-spacer>
        <img src="@/assets/WingquistWhite.png" alt="Wingquist Laboratory" width="110" height="26">
      </v-app-bar>

      <v-col>
        <v-row no-gutters>
          <v-col xs="6" v-if="activeBtn==0">
            <v-card
              class="mx-3 my-3"
            >
              <v-card-title>Select demo</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item-group v-model="demo">
                    <v-list-item
                      v-for="(demo, i) in demos"
                      :key="i"
                      :to="demo.text"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="demo.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="demo.text"></v-list-item-title>
                        <v-list-item-subtitle v-text="demo.description"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
            <v-card
              class="mx-3 my-3"
            >
              <v-card-title>Areas</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item-group v-model="areas">
                    <v-list-item
                      v-for="(area, i) in areas"
                      :key="i"
                      :to="area.url"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="area.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="area.text"></v-list-item-title>
                        <v-list-item-subtitle v-text="area.description"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
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
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

    </v-bottom-navigation>

  </v-container>
</template>

<script>

  export default {
    components: {
    },
    data () {
      return {
        activeBtn: 0,
        demo: null,
        demos: [
          {
            text: 'Mug',
            description: 'Parametric container of liquids',
            icon: 'mdi-coffee',
          },
          {
            text: 'Bike',
            description: 'Configurator and value information draft example',
            icon: 'mdi-bike',
          },
          // {
          //   text: 'Results',
          //   description: 'The designs submitted via the Bike demo.',
          //   icon: 'mdi-chart-bar',
          // },
        ],
        areas: [
          {
            text: 'Value management',
            description: 'How to maximize the benefit of all stakeholders?',
            icon: 'mdi-cash-usd-outline',
            url: '/',
          },
          {
            text: 'Function modelling',
            description: 'How to represent the functions of a system?',
            icon: 'mdi-sitemap',
            url: '/',
          },
          {
            text: 'CAD/CAE',
            description: 'How to virtually build a testable system?',
            icon: 'mdi-file-cad-box',
            url: '/',
          },
          {
            text: 'Additive manufacturing',
            description: 'How build physical parts?',
            icon: 'mdi-printer-3d-nozzle',
            url: '/',
          },
        ],
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
