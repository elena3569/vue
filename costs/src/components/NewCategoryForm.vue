<template>
  <div>
      <input type="text" v-model="category">
      <button @click="add">Add</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      category: ''
    }
  },
  methods: {
    ...mapActions(['addCategory']),
    add () {
      this.addCategory(this.category)
    }
  }
}
</script>

<style>
</style>
