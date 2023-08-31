import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index.ts";
import App from "./App.vue";
import { antd } from "./plugins/antdv.ts";

import { registerGlobalComponent } from "./utils/index.ts";

import "./assets/styles/tailwind.css";
import "./assets/styles/main.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(antd);
registerGlobalComponent(app);

app.use(router).use(pinia);

(async () => {
  await router.isReady();
})();
app.mount("#app");
