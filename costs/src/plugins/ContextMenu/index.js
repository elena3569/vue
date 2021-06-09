export default {
  install (Vue) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$menu = {
      EventBus: new Vue(),

      show () {
        this.EventBus.$emit('showMenu')
      },

      delete (item) {
        this.EventBus.$emit('del', { item })
      },

      edit (settings) {
        this.EventBus.$emit('edit', { settings })
      }

    }
  }
}
