import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import App from "@/App.vue";
import router from "./router/router.js";

import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(ToastService);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
