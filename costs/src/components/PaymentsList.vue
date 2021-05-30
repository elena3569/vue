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
      <div :class='[$style.costs__number]'>{{item.id}}</div>
      <div :class='[$style.costs__date]'> {{ item.date }} </div>
      <div :class='[$style.costs__category]'> {{ item.category }} </div>
      <div :class='[$style.costs__price]'> {{ item.value }} </div>
    </div>
    <div :class="[$style.pagination]">
      <button @click='changePageArrow(-1)'  :class="[$style.pagination__btn]">&#60;</button>
      <button @click="changePage(index)"
          v-for='(index) in pagesQuantity'
          :key='index'
          :class="[$style.pagination__btn]"
      >{{index}}</button>
      <button @click='changePageArrow(1)' :class="[$style.pagination__btn]">&#62;</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['SET_CUR_PAGE']),
    ...mapActions(['getItems']),
    changePage (num) {
      this.SET_CUR_PAGE(num)
    },
    changePageArrow (dif) {
      if ((this.curPage === 1 && dif === 1) ||
          (this.curPage === this.itemsOnPage && dif === -1) ||
          (this.curPage > 1 && this.curPage < this.itemsOnPage)) {
        this.SET_CUR_PAGE(this.curPage + dif)
      }
    }
  },
  computed: {
    ...mapGetters(['paymentsList', 'itemsOnPage', 'curPage']),
    pagesQuantity () {
      let quant = this.paymentsList.length / this.itemsOnPage
      if (!Number.isInteger(quant)) quant = Math.trunc(quant) + 1
      return quant
    },
    curItems () {
      return this.paymentsList.slice(
        this.curPage * this.itemsOnPage - this.itemsOnPage,
        this.curPage * this.itemsOnPage)
    }
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
  grid-template-columns: 30px 100px 150px 60px;
}
.pagination {
  text-align: center;
  margin-top: 10px;
}
.pagination__btn {
  margin: 0 2px;
}
</style>
