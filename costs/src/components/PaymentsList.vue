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
              <v-menu open-on-hover offset-x>
                <template v-slot:activator='{ on }'>
                  <v-btn small text v-on='on'>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list class='py-0'>
                  <v-list-item class='py-0 px-2 ma-0'>
                      <v-btn class='pa-0 ma-0' small text @click="del(item)"> Delete </v-btn>
                  </v-list-item>
                  <v-list-item class='py-0 px-2 ma-0'>
                      <v-btn class='pa-0 ma-0' small text @click="edit(item)"> Edit </v-btn>
                  </v-list-item>
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
        { text: 'Value', value: 'value' },
        { text: '' }
      ]
    }
  },
  computed: {
    ...mapGetters(['paymentsList'])
  },
  methods: {
    ...mapMutations(['SET_ITEMS']),
    del (item) {
      const buf = [...this.paymentsList]
      buf.splice(this.paymentsList.indexOf(item), 1)
      this.SET_ITEMS(buf)
    },
    edit (item) {
      const id = item.id
      this.$router.push({ name: 'EditCost', params: { id } })
      this.$emit('change-item')
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
