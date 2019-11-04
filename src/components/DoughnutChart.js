import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options'],
  methods: {
    textCenter(val) {
      Chart.pluginService.register({
        beforeDraw: function(chart) {
          var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val + "%",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
        }
      });
    },
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
    this.textCenter(3);
  }
};