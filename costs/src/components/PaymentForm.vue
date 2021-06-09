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
      value: ''
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
      this.value = ''
      this.category = ''
      this.date = ''
    },
    save () {
      const { date, category, value } = this
      this.addItem({ date, category, value })
      let quant = this.paymentsList.length / this.itemsOnPage
      if (!Number.isInteger(quant)) quant = Math.trunc(quant) + 1
      this.SET_CUR_PAGE(quant)
      console.log(value)
      this.resetInput()
    },
    upd () {
      const buf = [...this.paymentsList]
      const find = buf.find((item) => item.id === this.id)
      find.value = this.value
      find.category = this.category
      find.date = this.date
      this.SET_ITEMS(buf)
    },
    newCost () {
      if (this.category && this.value && this.date) {
        if (this.id) {
          this.upd()
        } else {
          this.save()
          if (this.$route.name !== 'MyCosts') {
            this.$router.push({ name: 'MyCosts' })
          }
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
