<template>
  <div>
    <router-link id='link' to='/add/payment/Food?value=200'> + Food 200</router-link>
      <br>
      <router-link id='link' to='/add/payment/Clothes'> + Clothes</router-link>
      <br>
    <input type='date' placeholder="Date" v-model="date" />
    <select v-model="category">
          <option value="" disabled selected>Category</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
    <input placeholder="Price" v-model.number="value" />
    <button @click="newCost">Save</button>
    <br>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PaymentForm',
  props: {
    param: Object
  },
  data () {
    return {
      date: '',
      category: '',
      value: 0
    }
  },
  computed: {
    ...mapGetters(['categories', 'paymentsList', 'itemsOnPage'])
  },
  methods: {
    ...mapActions(['getCategories', 'addItem']),
    ...mapMutations(['SET_CUR_PAGE', 'SET_ITEMS']),
    init ({ settings }) {
      this.id = settings.id
      this.date = settings.date
      this.category = settings.category
      this.value = settings.value
      if (!this.id) {
        this.newCost()
      }
    },
    resetInput () {
      this.value = 0
      this.category = ''
      this.date = ''
    },
    save () {
      const { date, category, value } = this
      this.addItem({ date, category, value })
      let quant = this.paymentsList.length / this.itemsOnPage
      if (!Number.isInteger(quant)) quant = Math.trunc(quant) + 1
      this.SET_CUR_PAGE(quant)
      this.resetInput()
    },
    upd () {
      const buf = [...this.paymentsList]
      console.log('buf[0].id - ', buf[0].id)
      // buf.forEach((item) => console.log(item, item.id === this.id))
      console.log(buf.indexOf((item) => item.id === this.id))
      buf[this.id].value = this.value
      buf[this.id].category = this.category
      buf[this.id].date = this.date
      this.SET_ITEMS(buf)
    },
    newCost () {
      if (this.category && this.value && this.date) {
        if (this.id) {
          this.upd()
        } else {
          this.save()
          this.$router.push({ name: 'MyCosts' })
        }
        this.$modal.close()
      }
      return 0
    }
  },
  beforeMount () {
    this.$modal.EventBus.$on('change', this.init)
    // this.$menu.EventBus.$on('edit', this.init)
  },
  beforeDestroy () {
    this.$menu.EventBus.$off('edit', this.init)
    // this.$modal.EventBus.$off('change', this.init)
  }
}
</script>

<style module>
.btn_add {
  margin: 10px 0;
}
</style>
