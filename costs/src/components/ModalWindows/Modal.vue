<template>
<<<<<<< HEAD
  <div :class="[$style.wrapper]" v-show='name'>
      <div :class="[$style.overlay]"></div>
      <div :class="[$style.content]" >
        <header :class="[$style.content__header]"> {{ name }}
        <button :class="[$style.content__btn]" @click="onClose"> X </button>
        </header>
        <div :class="[$style.content__form]">
          <PaymentForm v-show="name === 'PaymentForm'" />
          <NewCategoryForm v-show="name === 'NewCategoryForm'" />
        </div>
      </div>
=======
  <div :class="[$style.wrapper]">
      <div :class="[$style.overlay]"></div>
      <header> {{ name }} </header>
      <PaymentForm v-if="name === 'PaymentForm'" />
      <NewCategoryForm v-if="name === 'NewCategoryForm'" />
      <button @click="onClose">Close</button>
>>>>>>> les6
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

<<<<<<< HEAD
<style module lang='sass'>
.wrapper
  position: absolute
  width: 100%
  height: 100vh

.overlay
  z-index: 50
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: rgba(50, 50, 50, 0.5)

.content
  border: 1px solid black
  background: rgb(162, 162, 255)
  position: absolute
  top: 20%
  left: 20%
  z-index: 100

  &__header
    background-color: #fff
    display: flex
    justify-content: space-between
    padding-left: 10px

  &__form
    padding: 0 30px 30px 30px
  &__btn
    color: red
    font-weight: bold
=======
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
>>>>>>> les6
</style>
