import { createApp } from "vue";
import App from "./App.vue";
import { Visualia } from "visualia";

import "./index.css";

const app = createApp(App);
app.use(Visualia);
app.mount("#app");
