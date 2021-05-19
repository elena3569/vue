<template>
  <div id="app">
    <header class="header">
      My personal costs
    </header>
    <main>
      <ButtonAdd @show="onShowForm"/>
      <PaymentForm v-if="show" @add='onDataAdded'/>
      <PaymentsList :items="paymentsList" />
    </main>
  </div>
</template>

<script>
import PaymentsList from './components/PaymentsList'
import PaymentForm from './components/PaymentForm'
import ButtonAdd from './components/ButtonAdd'
export default {
  name: 'App',
  components: {
    PaymentsList,
    PaymentForm,
    ButtonAdd
  },
  data () {
    return {
      show: false,
      paymentsList: [
        {
          date: '13.05.2021',
          category: 'Education',
          price: 123
        },
        {
          date: '12.05.2021',
          category: 'Education',
          price: 456
        },
        {
          date: '11.05.2021',
          category: 'Education',
          price: 789
        },
        {
          date: '10.05.2021',
          category: 'Education',
          price: 0
        }
      ]
    }
  },
  methods: {
    onDataAdded (data) {
      this.paymentsList.push(data)
      this.show = false
    },
    onShowForm () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" module>
.header {
  color: red;
}
</style>
