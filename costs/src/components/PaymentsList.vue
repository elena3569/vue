<template>
  <div>
    <v-data-table
      :headers='headers'
      :items='paymentsList'
    >
      <template v-slot:body='{ items }'>
        <tbody>
          <tr v-for='item in items' :key='item.name'>
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.value }}</td>
            <td>
              <v-menu open-on-hover top offset-y>
                <template v-slot:activator='{ on }'>
                  <v-btn v-on='on'>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                    <v-btn @click="del(item)"> Delete </v-btn>
                    <v-btn @click="edit(item)"> Edit </v-btn>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: '#', value: 'id' },
        { text: 'Date', value: 'date' },
        { text: 'Category', value: 'category' },
        { text: 'Value', value: 'value' }
      ]
    }
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
    del (item) {
      const buf = [...this.paymentsList]
      buf.splice(this.paymentsList.indexOf(item), 1)
      this.SET_ITEMS(buf)
    },
    edit (item) {
      // this.$modal.show('PaymentForm')
      // this.$modal.change(item)
      this.$emit('change-item', item)
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
  grid-template-columns: 30px 100px 150px 60px 30px;
}
</style>
