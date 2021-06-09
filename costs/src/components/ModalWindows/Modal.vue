<template>
  <div :class="[$style.wrapper]">
      <div :class="[$style.overlay]"></div>
      <header> {{ name }} </header>
      <PaymentForm v-if="name === 'PaymentForm'" />
      <NewCategoryForm v-if="name === 'NewCategoryForm'" />
      <button @click="onClose">Close</button>
  </div>
</template>

<script>
import PaymentForm from '../PaymentForm'
import NewCategoryForm from '../NewCategoryForm'
export default {
  components: {
    PaymentForm,
    NewCategoryForm
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    onShow ({ name }) {
      this.name = name
    },
    onClose () {
      this.name = ''
    }
  },
  mounted () {
    this.$modal.EventBus.$on('show', this.onShow)
    this.$modal.EventBus.$on('close', this.onClose)
  },
  beforeDestroy () {
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('close', this.onClose)
  }
}
</script>

<style module>
.wrapper {
  border: 1px solid black;
  position: absolute;
  background: rgb(162, 162, 255);
}
.overlay {
  color: grey;
  opacity: 0.5;
}
</style>
