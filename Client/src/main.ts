import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import App from "./App.vue";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);
app.use(VCalendar, {});
app.use(ToastPlugin);

app.component("DatePicker", DatePicker);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);
app.mount("#app");
