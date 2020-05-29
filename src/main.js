import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import JsonToCsv from './views/JsonToCsv';
import InvestimentSimulation from './views/InvestimentSimulation';
import Home from './views/Home';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  { path: '/json-to-csv', component: JsonToCsv },
  { path: '/investiment-simulation', component: InvestimentSimulation}
];

const router = new VueRouter({
  mode:'history',
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
