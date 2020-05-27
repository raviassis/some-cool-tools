import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
// import HelloWorld from './components/HelloWorld';
import JsonToCsv from './views/JsonToCsv';
import InvestimentSimulation from './views/InvestimentSimulation';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: JsonToCsv},
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
