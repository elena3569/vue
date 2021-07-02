import { Pie } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  extends: Pie,
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    ...mapGetters(['categories', 'paymentsList']),
    chartdata () {
      return {
        labels: this.categories,
        datasets: [{
          label: 'Costs',
          data: this.categories.map(c => {
            return this.paymentsList.reduce((total, item) => {
              if (c === item.category) {
                total += item.value
              }
              return total
            }, 0)
          }),
          backgroundColor: ['000']
        }]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
