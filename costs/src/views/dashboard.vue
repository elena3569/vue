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
        <PieChart />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PaymentsList from '../components/PaymentsList'
import PaymentForm from '../components/PaymentForm'
import NewCategoryForm from '../components/NewCategoryForm'
import PieChart from '../components/Chart'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsList,
    PaymentForm,
    NewCategoryForm,
    PieChart
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    ...mapActions(['getItems', 'getCategories'])
  },
  beforeMount () {
    this.getItems()
    this.getCategories()
  }
}
</script>
