<template>
  <div :class='[$style.menu]'>
      <button @click="toogle">...</button>
<<<<<<< HEAD
      <transition name='showUp'>
        <div :class='[$style.menu__options]' v-show='isVisible'>
            <div :class='[$style.menu__option]' @click="del">Delete</div>
            <div :class='[$style.menu__option]' @click="edit">Edit</div>
        </div>
      </transition>
=======
      <div :class='[$style.menu__options]' v-show='isVisible'>
          <div :class='[$style.menu__option]' @click="del">Delete</div>
          <div :class='[$style.menu__option]' @click="edit">Edit</div>
      </div>
>>>>>>> les6
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
<<<<<<< HEAD
<style lang='sass'>
.showUp-enter-active, .showUp-leave-active
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.showUp-enter, .showUp-leave-to
    transform: translateX(10px)
    opacity: 0
</style>

<style module lang='sass'>
.menu
    position: relative

    &__options
        position: absolute
        top: 0
        left: 30px
        z-index: 20
        border: 1px solid black
        background-color: white

    &__option
        padding: 3px 5px
        width: 100px
        &:hover
            background-color: rgb(219, 217, 217)
=======

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
>>>>>>> les6
</style>
