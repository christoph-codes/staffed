<template>
  <div id="adminHeader">
    <div class="columns">
      <div class="column is-one-fifth">
        <div class="main-logo float-left">
          <router-link to="/">
            <img src="@/components/admin/assets/sf-logo-admin.png">
          </router-link>
        </div>
      </div>
      <div class="column is-four-fifths">
        <div class="navbar float-right">
          <nav uk-navbar>
            <ul class="uk-navbar-nav">
              <li v-if="admin">
                <a class="uk-parent" href="#">{{ admin.email }}</a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <router-link :to="{ name: 'Help'}">Help</router-link>
                    </li>
                    <li>
                      <router-link :to="{ name: 'AdminGeneralSettings'}">Settings</router-link>
                    </li>
                    <li>
                      <a @click="logout">Logout</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "adminHeader",
  data() {
    return {
      admin: {},
      company: {}
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "AdminLogin" });
          window.location.reload();
        });
    }
  },
  created() {
    // get current user
    let admin = firebase.auth().currentUser;

    // find the logged in user record and grab its data
    let user = db.collection("admins").where("user_id", "==", admin.uid);

    user.get().then(snapshot => {
      snapshot.forEach(doc => {
        (this.admin = doc.data()), (this.admin.id = doc.id);
      });

      //fetch company data from firestore
      let company = db.collection("company").doc(this.admin.companyid);
      company.get().then(doc => {
        if (doc) {
          this.company = doc.data();
        }
      });
    });
  }
};
</script>


