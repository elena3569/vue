<template>
  <div :class='[$style.costs]'>
    <div :class="[$style.titleColumns]">
      <div>№</div>
      <div>Date</div>
      <div>Category</div>
      <div>Value</div>
    </div>
    <hr>
     <div :class='[$style.costs__content]' v-for="(item, index) in curItems" :key="index">
      <div :class='[$style.costs__number]'>{{ item.id }}</div>
      <div :class='[$style.costs__date]'> {{ item.date }} </div>
      <div :class='[$style.costs__category]'> {{ item.category }} </div>
      <div :class='[$style.costs__price]'> {{ item.value }} </div>
      <ConMenu v-bind="{item}"/>
    </div>
    <pagination />
  </div>
</template>

<script>
import ConMenu from './ContextMenu/ConMenu'
import pagination from './pagination'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ConMenu,
    pagination
  },
  computed: {
    ...mapGetters(['paymentsList', 'itemsOnPage', 'curPage']),
    curItems () {
      return this.paymentsList.slice(
        this.curPage * this.itemsOnPage - this.itemsOnPage,
        this.curPage * this.itemsOnPage)
    }
  },
  methods: {
    ...mapMutations(['SET_ITEMS']),
    del ({ item }) {
      const buf = [...this.paymentsList]
      buf.splice(this.paymentsList.indexOf(item), 1)
      this.SET_ITEMS(buf)
    },
    edit ({ settings }) {
      this.$modal.show('PaymentForm')
      this.$modal.change(settings)
    }
  },
  mounted () {
    this.$menu.EventBus.$on('del', this.del)
    this.$menu.EventBus.$on('edit', this.edit)
  },
  beforeDestroy () {
    this.$menu.EventBus.$off('del', this.del)
    this.$menu.EventBus.$off('edit', this.edit)
  }
}
</script>

<style module>
.costs {
  border: 1px solid grey;
  padding: 10px;
  margin-top: 10px;
  width: 360px;
}
.titleColumns,
.costs__content {
  display: grid;
  grid-template-columns: 30px 100px 150px 60px 30px;
}
</style>
