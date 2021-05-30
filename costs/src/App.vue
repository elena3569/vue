<template>
  <div id="app">
    <header class="header">
      My personal costs
    </header>
    <main>
      <router-link id='link' to='/add/payment/Food?value=200'> + Food 200</router-link>
      <br>
      <router-link id='link' to='/add/payment/Clothes'> + Clothes</router-link>
      <ButtonAdd @show="onShowForm"/>
      <PaymentForm v-show='show' @add='onDataAdded'/>
      <PaymentsList />
    </main>
  </div>
</template>

<script>
import PaymentsList from './components/PaymentsList'
import PaymentForm from './components/PaymentForm'
import ButtonAdd from './components/ButtonAdd'
import { mapActions } from 'vuex'

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
      onClick: false
    }
  },
  methods: {
    ...mapActions(['getItems']),
    onDataAdded () {
      this.show = false
    },
    onShowForm () {
      this.show = !this.show
    }
  },
  mounted () {
    if (Object.keys(this.$route.params).length !== 0 || Object.keys(this.$route.query).length !== 0) {
      this.show = true
    }
    const links = document.querySelectorAll('#link')
    links.forEach(link => link.addEventListener('click', () => {
      this.show = true
      this.onClick = true
    }))
  },
  beforeMount () {
    this.getItems()
  }
}
</script>

<style lang="scss" module>
.header {
  color: red;
}
</style>
