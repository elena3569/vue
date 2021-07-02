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
          backgroundColor: ['#4BF7A9', '#3E72F8', '#38C7E0', '#45E038', '#DFFF3B',
            '#F8898C', '#27B3C4', '#7C63F7', '#F74D31', '#F7E13E']
        }]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
