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
    <button @click="save">Save</button>
    <br>
    <button :class='[$style.btn_add]' @click="showForm=!showForm"> + New category </button>
    <NewCategoryForm v-if='showForm' />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NewCategoryForm from './NewCategoryForm'
export default {
  data () {
    return {
      showForm: false,
      date: '',
      category: '',
      price: 0
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
    save () {
      const { date, category, price } = this
      this.addItem({ date, category, price })
      let quant = this.paymentsList.length / this.itemsOnPage
      if (!Number.isInteger(quant)) quant = Math.trunc(quant) + 1
      this.SET_CUR_PAGE(quant)
    }
  },
  beforeMount () {
    this.getCategories()
  }
}
</script>

<style module>
.btn_add {
  margin: 10px 0;
}
</style>
