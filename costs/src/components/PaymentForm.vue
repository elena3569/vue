<template>
  <div>
    <input placeholder="Date" v-model="date" />
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      category: '',
      price: 0,
      categories: ['Education', 'Clothes', 'Food', 'Entertainment', 'Transport', 'Trips', 'Others']
    }
  },
  props: {
    items: Array
  },
  methods: {
    save () {
      const { date, category, price } = this
      this.$emit('add', { date, category, price })
    }
  }
}
</script>

<style>
</style>
