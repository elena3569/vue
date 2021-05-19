<template>
  <div :class='[$style.btn_add]'>
      <button @click="show" > + Add new cost</button>
  </div>
</template>

<script>
export default {
  methods: {
    show () {
      this.$emit('show')
    }
  }
}
</script>

<style module>
.btn_add {
  margin: 10px;
}
</style>
