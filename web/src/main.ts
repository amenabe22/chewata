import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faJs, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { createHead } from "@vueuse/head";
import "./index.css";
import { setupFirebase } from "./firebase.config";
import { apolloProvider } from "./apollo";
import { createMetaManager, plugin as metaPlugin } from "vue-meta";

library.add(faCoffee, faJs, faFacebook, faGoogle);

setupFirebase();
const app = createApp(App);
app.component("QuillEditor", QuillEditor);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.use(createHead());
app.use(apolloProvider);
app.use(store);
app.use(createMetaManager());
app.use(metaPlugin);
app.mount("#app");
