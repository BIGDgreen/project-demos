import { createApp } from "vue";
import App from "./App.vue";
import VueHighcharts from "./directive/highcharts";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(VueHighcharts);
app.use(router).use(store).mount("#app");
