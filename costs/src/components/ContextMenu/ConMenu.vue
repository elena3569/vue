<template>
  <div :class='[$style.menu]'>
      <button @click="toogle">...</button>
      <div :class='[$style.menu__options]' v-show='isVisible'>
          <div :class='[$style.menu__option]' @click="del">Delete</div>
          <div :class='[$style.menu__option]' @click="edit">Edit</div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisible: false
    }
  },
  props: ['item'],
  methods: {
    toogle () {
      this.isVisible = !this.isVisible
    },
    del () {
      this.$menu.delete(this.item)
      this.toogle()
    },
    edit () {
      this.$menu.edit(this.item)
      this.toogle()
    }
  },
  mounted () {
    this.$menu.EventBus.$on('showModal', this.toogle)
  },
  beforeDestroy () {
    this.$menu.EventBus.$off('showModal', this.toogle)
  }
}
</script>

<style module>
.menu {
  position: relative;
}
.menu__options {
  position: absolute;
  top: 0;
  left: 30px;
  z-index: 20;
  border: 1px solid black;
  background-color: white;
}
.menu__option {
  padding: 3px 5px;
  width: 100px;
}
.menu__option:hover {
  background-color: rgb(219, 217, 217);
}
</style>
