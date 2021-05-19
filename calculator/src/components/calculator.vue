<template>
  <div class="calculator">
  <div>
      <input class="operand" v-model.number="operand1" />
      {{op}}
    <input class="operand" v-model.number="operand2" />
    {{msg}}
  </div>
   <div class="operations">
      <button class='btn-operator' @click="calculate('+')">+</button>
    <button class='btn-operator' @click="calculate('-')">-</button>
    <button class='btn-operator' @click="calculate('*')">*</button>
    <button class='btn-operator' @click="calculate('/')">/</button>
    <button class='btn-operator' @click="calculate('%')">%</button>
    <button class='btn-operator' @click="calculate('^')">^</button>
   </div>
   <!-- <div class="result"> {{msg}} </div> -->
   <div>
     <input type="checkbox" v-model="toggle" id="checkbox">
     <label for="checkbox"> Показать экранную клавиатуру</label>
   </div>
   <div class="keyboard" v-show='toggle'>
     <div>
        <input type="radio" name='operand' id="one" value="1" v-model="numOperand">
        <label for="one">Операнд1</label>
        <input type="radio" name='operand' id="two" value="2" v-model="numOperand">
        <label for="two">Операнд2</label>
     </div>
     <div class='numerals'>
        <button v-for='num in numerals' :key='num' @click='inputNum(num)'>{{num}}</button>
        <button @click="backSpace()">Backspace</button>
     </div>
   </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    operand1: 0,
    operand2: 0,
    result: 0,
    op: ' ',
    msg: '',
    toggle: false,
    numerals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    numOperand: '1'
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
      this.op = op
      this.msg = `= ${this.result}`
    },
    inputNum (num) {
      if (this.numOperand === '1') {
        this.operand1 = this.operand1 * 10 + num
      } else if (this.numOperand === '2') {
        this.operand2 = this.operand2 * 10 + num
      }
    },
    backSpace () {
      if (this.numOperand === '1') {
        this.operand1 = (this.operand1 / 10) >> 0
      } else if (this.numOperand === '2') {
        this.operand2 = (this.operand2 / 10) >> 0
      }
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
  width: 100px;
  margin: 0 10px;
  text-align: center;
}
.numerals {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
</style>
