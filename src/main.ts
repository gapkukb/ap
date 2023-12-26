import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Vant from 'vant';
import Fragment from 'vue-fragment';

import 'vant/lib/index.css';
import './styles/tailwindcss.css';
import './assets/svg';

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Fragment.Plugin);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
