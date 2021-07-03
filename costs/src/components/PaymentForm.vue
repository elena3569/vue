<template>
  <div>
    <router-link :to='{ name: "NewCost", params: { category: "Food" }, query: { value: 200 } }'> + Food 200</router-link>
      <br>
      <router-link :to='{ name: "NewCost", params: { category: "Clothes" } }'> + Clothes</router-link>
      <br>
    <input name='date' type='date' placeholder="Date" v-model="date" />
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
    <input name='price' placeholder="Price" v-model.number="value" />
    <button name='save' @click="save">Save</button>
    <br>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PaymentForm',
  data () {
    return {
      id: '',
      date: '',
      category: '',
      value: ''
    }
  },
  computed: {
    ...mapGetters(['categories', 'paymentsList', 'itemsOnPage'])
  },
  methods: {
    ...mapActions(['getCategories', 'addItem', 'updItem']),
    ...mapMutations(['SET_CUR_PAGE']),
    init ({ settings }) {
      this.date = settings.date
      this.category = settings.category
      this.value = settings.value
      if (settings.id) {
        this.id = settings.id
      } else {
        this.save()
      }
    },
    resetInput () {
      this.id = ''
      this.value = ''
      this.category = ''
      this.date = ''
    },
    newCost () {
      const { date, category, value } = this
      this.addItem({ date, category, value })
      let quant = this.paymentsList.length / this.itemsOnPage
      if (!Number.isInteger(quant)) {
        quant = Math.trunc(quant) + 1
      }
      this.SET_CUR_PAGE(quant)
      this.resetInput()
    },
    upd () {
      const buf = [...this.paymentsList]
      const find = buf.find((item) => item.id === this.id)
      find.value = this.value
      find.category = this.category
      find.date = this.date
      this.updItem(buf)
    },
    save () {
      if (this.category && this.value && this.date) {
        if (this.id) {
          this.upd()
        } else {
          this.newCost()
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
  },
  beforeDestroy () {
    this.$menu.EventBus.$off('edit', this.init)
  }
}
</script>

<style module>
.btn_add {
  margin: 10px 0;
}
</style>
