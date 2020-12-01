import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as utils from "./config/utils";
Vue.prototype._utils = utils;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
