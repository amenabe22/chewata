import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
// import { fas, } from "@fortawesome/free-solid-svg-icons";
import { faJs, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

import "./index.css";
library.add(faCoffee, faJs, faFacebook, faGoogle);
const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount("#app");
