import Vue from 'vue'
import './plugins/vuetify'
import router from './router/index'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css';

//Graphql
import apolloClient from './config/index'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
Vue.use(Vuetify)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false



new Vue({
  el: "#app",
  template: '<App/>',
  router,
  apolloProvider,
  components: {App}
})
