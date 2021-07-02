<template>
  <div>
    <v-container>
      <v-card-text>
        <v-row>
          <v-text-field label='Category' v-model="category"></v-text-field>
        </v-row>
      </v-card-text>
    </v-container>
    <v-card-actions>
      <v-btn class="text-center" @click="add" color='teal' text>Add</v-btn>
    </v-card-actions>
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
        this.$emit('save-category')
      }
    }
  }
}
</script>

<style>
</style>
