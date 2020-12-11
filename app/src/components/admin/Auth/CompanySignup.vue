<template>
  <div id="adminsignup">
    <div class="narrow">
      <form @submit.prevent="signup">
        <h3>Company Info</h3>
        <div class="uk-margin">
          <div class="tkc-relative">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: user"></span>
            <input
              placeholder="Company"
              class="uk-input"
              type="text"
              name="companyalias"
              v-model="companyalias"
            >
            <label for="company" class="static-value">.staffed.com</label>
            <p class="company-slug">
              <b>{{ companyslug }}</b>.staffed.com
            </p>
            <p class="uk-text-danger">{{ companyfeedback }}</p>
          </div>
        </div>
        <div class="uk-margin">
          <button class="uk-button" type="submit">Signup</button>
          <div class="backtologin">
            <router-link
              class="uk-text-center uk-text-small"
              to="/admin/login"
            >Already have an account?</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "CompanySignup",
  data() {
    return {
      companyalias: null,
      companyfeedback: null,
      companyslug: null
    };
  },
  methods: {
    signup() {
      if (this.companyalias) {
        this.companyslug = slugify(this.companyalias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("company").doc(this.companyslug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.companyfeedback = "company name already exists";
          } else {
            this.companyfeedback = "company name available";
          }
        });
        console.log(this.companyslug);
      } else {
        this.companyfeedback = "company name required";
      }
    }
  }
};
</script>