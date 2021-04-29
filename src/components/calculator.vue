<template>
  <div class="calculator">
  <div>
      <input class="operand" v-model.number="operand1" />
    <input class="operand" v-model.number="operand2" />
  </div>
   <div class="operations">
      <button class='btn-operator' @click="calculate('+')">+</button>
    <button class='btn-operator' @click="calculate('-')">-</button>
    <button class='btn-operator' @click="calculate('*')">*</button>
    <button class='btn-operator' @click="calculate('/')">/</button>
    <button class='btn-operator' @click="calculate('%')">%</button>
    <button class='btn-operator' @click="calculate('^')">^</button>
   </div>
   <div class="result"> {{msg}} </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    operand1: 0,
    operand2: 0,
    result: 0,
    msg: ''
  }),
  computed: {
    operations () {
      return {
        '+': this.operand1 + this.operand2,
        '-': this.operand1 - this.operand2,
        '*': this.operand1 * this.operand2,
        '/': this.operand1 / this.operand2,
        '%': (this.operand1 / this.operand2) >> 0,
        '^': Math.pow(this.operand1, this.operand2)
      }
    }
  },
  methods: {
    calculate (op) {
      this.result = this.operations[op]
      this.msg = `${this.operand1} ${op} ${this.operand2} = ${this.result}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.operations {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-gap: 10px;
}
.operand {
  width: 50px;
  margin: 0 10px;
  text-align: center;
}
</style>
