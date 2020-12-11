<template>
  <div id="adminsignup">
    <div class="narrow">
      <h1>Create An Account</h1>
      <p>Be sure to fill out each field completely.</p>
      <form @submit.prevent="signup">
        <h3>Company Info</h3>
        <!-- Company Name -->
        <div class="uk-margin">
          <input placeholder="The Name of Your Company" class="uk-input" type="text" name="companyname" v-model="companyname">
        </div>
        <!-- END Company Name -->
        
        
        <hr>

        <!-- Name -->
        <h3>Account Info</h3>
        <div class="uk-margin">
          <input placeholder="First Name" class="uk-input" type="text" name="fname" v-model="fname">
        </div>
        <div class="uk-margin">
          <input placeholder="Last Name" class="uk-input" type="text" name="lname" v-model="lname">
        </div>
        <hr>

        <!-- Email -->
        <div class="uk-margin">
          <input placeholder="Email" class="uk-input" type="email" name="group" v-model="email">
        </div>
        <p v-if="userfeedback" class="uk-form-danger uk-text-center">{{ userfeedback }}</p>
        <!-- End Email -->
        <!-- Password -->
        <div class="uk-margin">
          <input
            placeholder="Password"
            class="uk-input"
            type="password"
            name="group"
            v-model="password"
          >
        </div>

        <div class="uk-margin">
          <input
            placeholder="Confirm Password"
            class="uk-input"
            type="password"
            name="group"
            v-model="confirmPassword"
          >
        </div>

        <p
          v-if="passwordfeedback"
          id="password-alert"
          class="uk-text-center uk-text-danger"
        >{{ passwordfeedback }}</p>
        <!-- End Password -->
        <!-- Feedback -->
        <p v-if="overallfeedback" class="uk-text-center uk-text-danger">{{ overallfeedback }}</p>

        <div class="uk-margin">
          <button class="btn primary" type="submit">Signup</button>
          <div class="backtologin">
            <router-link class="uk-text-center uk-text-small" to="/login">Already have an account?</router-link>
          </div>
        </div>
        <!-- End Feedback -->
      </form>
    </div>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "AdminSignUp",
  data() {
    return {
      // admin data

      fname: null,
      lname: null,
      email: null,
      userslug: null,
      user_id: null,
      companyid: null,
      companyname: null,
      companyslug: null,

      // password data

      password: null,
      confirmPassword: null,

      // feedback

      userfeedback: null,
      usernamefeedback: null,
      passwordfeedback: null,
      overallfeedback: null
    };
  },
  methods: {
    signup() {
      // Setting New Company
      if (this.companyname) {
        this.companyslug = slugify(this.companyname, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let company = db.collection("company").doc(this.companyslug);
        company.get().then(doc => {
          if (doc.exists) {
            this.$toast.open({
              duration: 5000,
              message: "This Company Already Exists",
              position: "is-bottom",
              type: "is-danger"
            });
          } else {
            company.set({
              name: this.companyname,
              slug: this.companyslug,
              groups: null
            })
            .catch(err => {
                this.$toast.open({
                  duration: 5000,
                  message: err.message,
                  position: "is-bottom",
                  type: "is-danger"
                });
              });
          }
        });
        console.log(this.companyslug);
      } else {
        this.$toast.open({
          duration: 5000,
          message: "Email Required.",
          position: "is-bottom",
          type: "is-danger"
        });
      }
      // Setting New Admin
      if (this.email) {
        this.userslug = slugify(this.fname + this.lname, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("admins").doc(this.userslug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.$toast.open({
              duration: 5000,
              message: "This User Already Exists",
              position: "is-bottom",
              type: "is-danger"
            });
            this.feedback = err.message;
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  userslug: this.userslug,
                  fname: this.fname,
                  lname: this.lname,
                  email: this.email,
                  companyid: this.companyslug,
                  user_id: cred.user.uid,
                  // password: this.password
                });
              })
              .then(() => {
                this.$router.push({ name: "Admin" });
              })
              .catch(err => {
                this.$toast.open({
                  duration: 5000,
                  message: err.message,
                  position: "is-bottom",
                  type: "is-danger"
                });
              });
          }
        });
        console.log(this.userslug);
      } else {
        this.$toast.open({
          duration: 5000,
          message: "Email Required.",
          position: "is-bottom",
          type: "is-danger"
        });
      }
    }
  }
};
</script>