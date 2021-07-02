<template>
  <div>
    <div class='text-h5 text-md-h3 my-8'>
      My personal costs
    </div>
    <v-dialog
    v-model="showFormPayment" max-width='600px'>
      <template v-slot:activator='{ on }'>
        <v-btn
          class='mr-4'
          v-on='on'
          small
          dark
          color='teal'>
          Add new cost <v-icon dark> mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title >
          <span class='text-h5'>Payment form</span>
        </v-card-title>
        <PaymentForm v-bind:CurItem="CurItem" @save-item='showFormPayment = false'/>
      </v-card>
    </v-dialog>

    <v-dialog
    v-model="showFormCategory" max-width='600px'>
      <template v-slot:activator='{ on }'>
        <v-btn
          v-on='on'
          small
          dark
          color='teal'>
          New category <v-icon dark> mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class='text-h5'>New Category</span>
        </v-card-title>
        <NewCategoryForm @save-category='showFormCategory = false'/>
      </v-card>
    </v-dialog>
    <v-row class='mt-6'>
      <v-col col='8'>
        <PaymentsList @change-item='showFormPayment = true'/>
      </v-col>
      <v-col col='4'>
        <canvas ref="canvas"></canvas>
        <!-- <line-chart :chartdata="chartData" :options="chartOptions"/> -->
        <!-- <Chart v-bind:chartdata='{ labels, datasets }'/> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PaymentsList from '../components/PaymentsList'
import PaymentForm from '../components/PaymentForm'
import NewCategoryForm from '../components/NewCategoryForm'
// import LineChart from '../components/Chart.vue'
import { mapActions, mapGetters } from 'vuex'
import { Pie } from 'vue-chartjs'

export default {
  name: 'App',
  extends: Pie,
  components: {
    PaymentsList,
    PaymentForm,
    NewCategoryForm
    // LineChart
  },
  data () {
    return {
      CurItem: {
        date: '',
        category: '',
        value: 0
      },
      showFormPayment: false,
      showFormCategory: false,
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
        datasets: this.paymentsList.map(function (item) {
          return {
            label: item.date,
            data: item.value
          }
        })
      }
    }
    // datasets () {
    //   const data = this.paymentsList.map(function (item) {
    //     return {
    //       label: item.date,
    //       data: item.value
    //     }
    //   })
    //   return data
    // }
  },
  methods: {
    ...mapActions(['getItems', 'getCategories'])
  },
  beforeMount () {
    this.getItems()
    this.getCategories()
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style lang="scss" module>
.header {
  color: red;
}
.btn {
  display: block;
  margin: 0 10px;
}
</style>
