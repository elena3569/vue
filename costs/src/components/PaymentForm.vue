<template>
  <div>
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
    <input placeholder="Price" v-model.number="price" />
    <button @click="newCost">Save</button>
    <br>
    <button :class='[$style.btn_add]' @click="showForm=!showForm"> + New category </button>
    <NewCategoryForm v-if='showForm' />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NewCategoryForm from './NewCategoryForm'
export default {
  name: 'PaymentForm',
  data () {
    return {
      date: '',
      category: '',
      price: 0,
      showForm: false
    }
  },
  components: {
    NewCategoryForm
  },
  computed: {
    ...mapGetters(['categories', 'paymentsList', 'itemsOnPage'])
  },
  methods: {
    ...mapActions(['getCategories', 'addItem']),
    ...mapMutations(['SET_CUR_PAGE']),
    resetInput () {
      this.price = 0
      this.category = ''
      this.date = ''
    },
    save () {
      const { date, category, price } = this
      this.addItem({ date, category, price })
      let quant = this.paymentsList.length / this.itemsOnPage
      if (!Number.isInteger(quant)) quant = Math.trunc(quant) + 1
      this.SET_CUR_PAGE(quant)
      this.resetInput()
      this.$router.push({ name: 'MyCosts' })
    },
    newCost () {
      if (this.category && this.price && this.date) {
        this.save()
        this.$emit('add')
      }
      return 0
    }
  },
  beforeMount () {
    this.getCategories()
  },
  watch: {
    $route: function () {
      if (this.$route.params.category !== 0 || this.$route.query.value) {
        this.date = (new Date()).toISOString().split('T')[0]
        if (this.$route.params.category) {
          this.category = this.$route.params.category
        }
        if (this.$route.query.value) {
          this.price = this.$route.query.value
        }
        this.newCost()
      }
    }
  }
}
</script>

<style module>
.btn_add {
  margin: 10px 0;
}
</style>
