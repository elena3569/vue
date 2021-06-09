<template>
  <div :class="[$style.pagination]">
      <button @click='changePageArrow(-1)'  :class="[$style.pagination__btn]">&#60;</button>
      <button @click="changePage(index)"
          v-for='(index) in pagesQuantity'
          :key='index'
          :class="[$style.pagination__btn]"
      >{{index}}</button>
      <button @click='changePageArrow(1)' :class="[$style.pagination__btn]">&#62;</button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['SET_CUR_PAGE']),
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
    }
  }
}
</script>

<style module>
.pagination {
  text-align: center;
  margin-top: 10px;
}
.pagination__btn {
  margin: 0 2px;
}
</style>
