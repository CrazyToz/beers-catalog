import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import './registerServiceWorker';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';

Vue.config.productionTip = false;

Vue.use(VueResource as any);
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
