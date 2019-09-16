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
                        <li v-for="priority in item.priorities">
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
import * as d3 from 'd3'

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
      /* createSvg(){

        let vueComponent = this;

        var data = d3.csv("https://gist.githubusercontent.com/mbostock/b038321e2a8177baf9e6a547195da966/raw/6c8eb7f5c644be0394f7fc384e42de9fab41927f/iris.csv", d3.autoType)

        var columns = data.columns.filter(d => d !== "species")

        var padding = 20;

        var width = 964;

        var size = (width - (columns.length + 1) * padding) / columns.length + padding;

        var x = columns.map(c => d3.scaleLinear()
          .domain(d3.extent(data, d => d[c]))
          .rangeRound([padding / 2, size - padding / 2]));

        var y = x.map(x => x.copy().range([size - padding / 2, padding / 2]));

        var z = d3.scaleOrdinal()
          .domain(data.map(d => d.species))
          .range(d3.schemeCategory10);

        var xAxis = {
          const axis = d3.axisBottom()
              .ticks(6)
              .tickSize(size * columns.length);
          return g => g.selectAll("g").data(x).join("g")
              .attr("transform", (d, i) => `translate(${i * size},0)`)
              .each(function(d) { return d3.select(this).call(axis.scale(d)); })
              .call(g => g.select(".domain").remove())
              .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
        };

        var yAxis = {
          const axis = d3.axisLeft()
              .ticks(6)
              .tickSize(-size * columns.length);
          return g => g.selectAll("g").data(y).join("g")
              .attr("transform", (d, i) => `translate(0,${i * size})`)
              .each(function(d) { return d3.select(this).call(axis.scale(d)); })
              .call(g => g.select(".domain").remove())
              .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
        };

        const svg = d3.select('.canvas')
          .append('svg')
          .attr('width', width + 100)
          .attr('height', height + 100)
          .call(d3.zoom().on("zoom", function () {
                  svg.attr("transform", d3.event.transform)
          }));
        
        function brush(cell, circle) {
          const brush = d3.brush()
              .extent([[padding / 2, padding / 2], [size - padding / 2, size - padding / 2]])
              .on("start", brushstarted)
              .on("brush", brushed)
              .on("end", brushended);

          cell.call(brush);

          let brushCell;

          // Clear the previously-active brush, if any.
          function brushstarted() {
            console.log("brushstarted", brushCell === this);
            if (brushCell !== this) {
              d3.select(brushCell).call(brush.move, null);
              brushCell = this;
            }
          }

          // Highlight the selected circles.
          function brushed([i, j]) {
            if (d3.event.selection === null) return;
            const [[x0, y0], [x1, y1]] = d3.event.selection; 
            circle.classed("hidden", d => {
              return x0 > x[i](d[columns[i]])
                  || x1 < x[i](d[columns[i]])
                  || y0 > y[j](d[columns[j]])
                  || y1 < y[j](d[columns[j]]);
            });
          }

          // If the brush is empty, select all circles.
          function brushended() {
            if (d3.event.selection !== null) return;
            circle.classed("hidden", false);
          }
        }

        const svg = d3.create("svg")
            .attr("viewBox", [-padding, 0, width, width]);

        svg.append("style")
            .text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        const cell = svg.append("g")
          .selectAll("g")
          .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
          .join("g")
            .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

        cell.append("rect")
            .attr("fill", "none")
            .attr("stroke", "#aaa")
            .attr("x", padding / 2 + 0.5)
            .attr("y", padding / 2 + 0.5)
            .attr("width", size - padding)
            .attr("height", size - padding);

        cell.each(function([i, j]) {
          d3.select(this).selectAll("circle")
            .data(data)
            .join("circle")
              .attr("cx", d => x[i](d[columns[i]]))
              .attr("cy", d => y[j](d[columns[j]]));
        });

        const circle = cell.selectAll("circle")
            .attr("r", 3.5)
            .attr("fill-opacity", 0.7)
            .attr("fill", d => z(d.species));

        cell.call(brush, circle);

        svg.append("g")
            .style("font", "bold 10px sans-serif")
            .style("pointer-events", "none")
          .selectAll("text")
          .data(columns)
          .join("text")
            .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
            .attr("x", padding)
            .attr("y", padding)
            .attr("dy", ".71em")
            .text(d => d);

        return svg.node();




      } */
    },
    mounted(){
      //this.createSvg();
      this.displayData()
    },
  }
</script>
