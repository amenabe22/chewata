import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { initializeApp } from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faJs, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { createHead } from "@vueuse/head";
import "./index.css";
import { getMessaging } from "firebase/messaging";
import { setupFirebase } from "./firebase.config";
import { apolloProvider } from "./apollo";

library.add(faCoffee, faJs, faFacebook, faGoogle);

setupFirebase();
const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.use(createHead());
app.use(apolloProvider)
app.use(store);
app.mount("#app");
