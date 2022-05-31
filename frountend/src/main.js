import Vue from "vue";
import App from "./App.vue";
import shell from "./plugins/vshell";

import ethers from "./plugins/ethers";
import VueGtag from "vue-gtag";

Vue.config.productionTip = false;
Vue.use(shell);
Vue.use(ethers);
Vue.use(VueGtag, {
  config: { id: "G-G7V4QJ3FC6" }
});



new Vue({
  render: h => h(App)
}).$mount("#app");
