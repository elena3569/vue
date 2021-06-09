<template>
  <div id="app">
    <header class="header">
      My personal costs
    </header>
    <main>
      <button class="btn" @click="showModal('PaymentForm')"> + Add new cost</button>
    <button :class='[$style.btn_add]' @click="showModal('NewCategoryForm')"> + New category </button>

      <Modal />
      <PaymentsList />
    </main>
  </div>
</template>

<script>
import PaymentsList from './components/PaymentsList'
import Modal from './components/ModalWindows/Modal'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsList,
    Modal
  },
  data () {
    return {
      param: {
        date: '',
        category: '',
        value: 0
      }
    }
  },
  methods: {
    ...mapActions(['getItems', 'getCategories']),
    showModal (modalName) {
      this.$modal.show(modalName)
    }
  },
  beforeMount () {
    this.getItems()
    this.getCategories()
  },
  watch: {
    $route: function () {
      if (this.$route.params.category || this.$route.query.value) {
        this.param.date = (new Date()).toISOString().split('T')[0]
        if (this.$route.params.category) {
          this.param.category = this.$route.params.category
        } else {
          this.param.category = ''
        }
        if (this.$route.query.value) {
          this.param.value = this.$route.query.value
        } else {
          this.param.value = 0
        }
        this.$modal.change(this.param)
      }
    }
  }
}
</script>

<style lang="scss" module>
.header {
  color: red;
}
.btn {
  display: block;
  margin: 0 10px;
}
</style>
