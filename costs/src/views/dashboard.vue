<template>
  <div>
    <div class='text-h5 text-md-h3 my-8'>
      My personal costs
    </div>
    <v-dialog v-model="pfs">
      <template v-slot:activator='{ on }'>
        <v-btn
          v-on='on'
          small
          dark
          color='teal'>
          Add new cost <v-icon dark> mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <PaymentForm v-bind="CurItem"/>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pfs">
      <template v-slot:activator='{ on }'>
        <v-btn
          v-on='on'
          small
          dark
          color='teal'>
          New category <v-icon dark> mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <NewCategoryForm />
      </v-card>
    </v-dialog>
    <v-row>
        <v-col>
            <PaymentsList />
        </v-col>
        <v-col>
            diagram
        </v-col>
    </v-row>
  </div>
</template>

<script>
import PaymentsList from '../components/PaymentsList'
import PaymentForm from '../components/PaymentForm'
import NewCategoryForm from '../components/NewCategoryForm'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsList,
    PaymentForm,
    NewCategoryForm
  },
  data () {
    return {
      param: {
        date: '',
        category: '',
        value: 0
      }
    }
  },
  methods: {
    ...mapActions(['getItems', 'getCategories']),
    showModal (modalName) {
      this.$modal.show(modalName)
    }
  },
  beforeMount () {
    this.getItems()
    this.getCategories()
  },
  watch: {
    $route: function () {
      if (this.$route.params.category || this.$route.query.value) {
        this.param.date = (new Date()).toISOString().split('T')[0]
        if (this.$route.params.category) {
          this.param.category = this.$route.params.category
        } else {
          this.param.category = ''
        }
        if (this.$route.query.value) {
          this.param.value = this.$route.query.value
        } else {
          this.param.value = 0
        }
        this.$modal.change(this.param)
      }
    }
  }
}
</script>

<style lang="scss" module>
.header {
  color: red;
}
.btn {
  display: block;
  margin: 0 10px;
}
</style>
