import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import VueMarkdown from "vue-markdown";

Vue.component("vue-markdown", VueMarkdown);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
