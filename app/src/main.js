// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import UIkit from "uikit/dist/css/uikit-core.min.css";
import UIkitJS from "uikit/dist/js/uikit.min.js";
import UIkitIcons from "uikit/dist/js/uikit-icons.min.js";
import VueSimpleUpload from "vue-simple-file-upload";
import firebase from "firebase";


// Icons
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

import {
  faTrash,
  faEdit,
  faTags
} from "@fortawesome/free-solid-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(faTrash, faEdit, faTags);

// End Icons ----------------

Vue.use(VueSimpleUpload);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content',
});

Vue.config.productionTip = false;
let app = null;

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: "#app",
      router,
      components: {
        App
      },
      template: "<App/>"
    });
  }
});
