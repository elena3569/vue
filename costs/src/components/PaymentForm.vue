<template>
  <div>
    <v-container>
      <v-card-text>
        <v-row>
          <v-btn  class='mr-4' color='white'>
            <router-link
            :to='{ name: "NewCost",
            params: { category: "Food" },
            query: { value: 200 } }'
            class="font-weight-bold text-decoration-none blue--text text--lighten-1"> <v-icon > mdi-plus </v-icon> Food 200</router-link>
          </v-btn>
          <v-btn  class='mr-4' color='white'>
            <router-link
            :to='{ name: "NewCost",
            params: { category: "Clothes" } }'
            class="font-weight-bold text-decoration-none blue--text text--lighten-1"> <v-icon > mdi-plus </v-icon> Clothes</router-link>
          </v-btn>
        </v-row>
        <v-row class='mt-8 mb-4'>
          <v-col cols='12' sm='6' md='4'>
            <v-menu
            ref='menu'
            v-model='menu'
            :close-on-content-click='false'
            transition='scale-transition'
            offset-y>
              <template v-slot:activator='{ on }'>
                <v-text-field v-on='on' label="Date" v-model="date" />
              </template>
              <v-date-picker
              no-title
              scrollbar
              v-model='date'
              :activate-picker.sync='activePicker'></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols='12' sm='6' md='4'>
            <v-select
              v-model="category"
              :items='categories'
              label="Category"
              required
            >
            </v-select>
          </v-col>
          <v-col cols='12' sm='6' md='4'>
            <v-text-field label='Price' v-model.number='value' required></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
    <v-card-actions class="text-center">
      <v-btn color='teal' text @click="save">Save</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PaymentForm',
  props: ['CurItem'],
  data () {
    return {
      id: '',
      date: '',
      category: '',
      value: '',
      menu: false,
      activePicker: null
    }
  },
  computed: {
    ...mapGetters(['categories', 'paymentsList'])
  },
  methods: {
    ...mapActions(['getCategories', 'addItem', 'updItem']),
    resetInput () {
      this.id = ''
      this.value = ''
      this.category = ''
      this.date = ''
    },
    newCost () {
      const { date, category, value } = this
      this.addItem({ date, category, value })
      this.resetInput()
    },
    upd () {
      const buf = [...this.paymentsList]
      const find = buf.find((item) => item.id === this.id)
      find.value = this.value
      find.category = this.category
      find.date = this.date
      this.updItem(buf)
    },
    save () {
      if (this.category && this.value && this.date) {
        if (this.id) {
          this.upd()
        } else {
          this.newCost()
        }
        if (this.$route.name !== 'MyCosts') {
          this.$router.push({ name: 'MyCosts' })
        }
        this.$emit('save-item')
      }
    }
  },
  watch: {
    $route: function () {
      if (this.$route.params.id) {
        const find = this.paymentsList.find((item) => item.id === this.$route.params.id)
        this.id = find.id
        this.value = find.value
        this.category = find.category
        this.date = find.date
      } else if (this.$route.params.category || this.$route.query.value) {
        this.date = (new Date()).toISOString().split('T')[0]
        if (this.$route.params.category) {
          this.category = this.$route.params.category
        } else {
          this.category = ''
        }
        if (this.$route.query.value) {
          this.value = this.$route.query.value
        } else {
          this.value = 0
        }
        if (this.date && this.category && this.value) {
          this.save()
        }
      }
    }
  }
}
</script>

<style module>
.btn_add {
  margin: 10px 0;
}
</style>
