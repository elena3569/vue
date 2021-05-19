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
      <div :class='[$style.costs__number]'>{{(index + 1) + (curPage - 1) * itemsQuantity}}</div>
      <div :class='[$style.costs__date]'> {{ item.date }} </div>
      <div :class='[$style.costs__category]'> {{ item.category }} </div>
      <div :class='[$style.costs__price]'> {{ item.price }} </div>
    </div>
    <div :class="[$style.pagination]">
      <button @click='changePage(-1)'  :class="[$style.pagination__btn]">&#60;</button>
      <button @click="curPage=index"
          v-for='(index) in pagesQuantity'
          :key='index'
          :class="[$style.pagination__btn]"
      >{{index}}</button>
      <button @click='changePage(1)' :class="[$style.pagination__btn]">&#62;</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curPage: 1,
      itemsQuantity: 3
    }
  },
  props: {
    items: Array
  },
  methods: {
    changePage (dif) {
      this.curPage += dif
    }
  },
  computed: {
    pagesQuantity () {
      let quant = this.items.length / this.itemsQuantity
      if (!Number.isInteger(quant)) quant = Math.trunc(quant) + 1
      return quant
    },
    curItems () {
      return this.items.slice(
        this.curPage * this.itemsQuantity - this.itemsQuantity,
        this.curPage * this.itemsQuantity)
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
