<template>
  <div>
      <input type="text" v-model="category">
      <button @click="add">Add</button>
      <div> {{message}} </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      category: '',
      message: ''
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  methods: {
    ...mapActions(['addCategory']),
    add () {
      if (this.category) {
        this.addCategory(this.category)
        this.message = 'Категория добавлена'
        this.category = ''
      }
    }
  }
}
</script>

<style>
</style>
