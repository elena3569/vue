<template>
  <div id="app">
    <header class="header">
      My personal costs
    </header>
    <main>
      <ButtonAdd @show="onShowForm"/>
      <PaymentForm v-if="show" @add='onDataAdded'/>
      <PaymentsList />
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
      show: false
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
