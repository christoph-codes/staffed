<template>
  <div id="adminSidenav">
    <aside class="menu">
      <div class="company-detail">
        <img class="uk-animation-fade" src="@/components/admin/assets/sf-avatar-placeholder.png">
        <h4>{{ admin.companyid }}</h4>
        <p>
          {{ admin.companyid }}.staffed.co
          <span uk-icon="copy"></span>
          <span uk-icon="icon: check"></span>
        </p>
      </div>
      <hr>
      <div class="admin-mainnav uk-text-left">
        <ul class="uk-nav-parent-icon" uk-nav>
          <li class="uk-active">
            <router-link to="/admin/home">Home</router-link>
          </li>
          <li class="uk-active">
            <router-link to="/admin/gigs">Gigs</router-link>
          </li>
          <li class="uk-parent">
            <router-link to="/admin/members">Members</router-link>
            <ul class="uk-nav-sub">
              <li>
                <router-link to="/admin/groups">Groups</router-link>
              </li>
            </ul>
          </li>
          <li class="uk-parent">
            <router-link to="#">Settings</router-link>
            <ul class="uk-nav-sub">
              <li>
                <router-link to="/admin/settings/general">General</router-link>
              </li>
              <li>
                <router-link to="/admin/settings/users">Members</router-link>
              </li>
              <li>
                <router-link to="/admin/settings/templates">Templates</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "AdminSidenav",
  data() {
    return {
      admin: {},
      company: {},
      companyid: null
    };
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

