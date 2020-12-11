<template>
  <form @submit.prevent="addMember">
    <div class>
      <div class="columns">
        <div class="column"></div>

        <div class="column is-three-quarters">
          <b-field>
            <b-input placeholder="First Name" type="text" name="fname" v-model="fname"></b-input>
          </b-field>

          <b-field>
            <b-input placeholder="Last Name" type="text" name="lname" v-model="lname"></b-input>
          </b-field>

          <b-field>
            <b-select placeholder="Groups" v-model="selectedGroup" required>
              <option
                v-for="(group, index) in 4"
                v-bind="group.groups"
                :key="index"
              >{{groups[0].groups[index]}}</option>
            </b-select>
          </b-field>

          <button class="btn secondary">Cancel</button>
          <button class="btn primary" type="submit">Add Member</button>
          <p v-if="feedback">{{ feedback }}</p>
        </div>

        <div class="column"></div>
      </div>
    </div>
  </form>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase"
import slugify from "slugify"

export default {
  name: "AddMembers",
  data() {
    return {
      members: [],
      groups: [],
      companyid: null,
      admin_id: null,
      admin: {},
      filteredTags: null,
      isSelectOnly: false,
      allowNew: true,
      feedback: null
    };
  },

  mounted() {
    db.collection("groups")
      .get()
      .then(snapshot => {
        const groups = [];
        snapshot.forEach(doc => {
          let group = doc.data();
          group.id = doc.id;
          groups.push(group);
        });
        this.groups = groups;
        length = groups.length;
      });
  },

  methods: {
    addMember() {
      if (this.fname) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.fname + this.lname, {
          replacement: "-",
          remove: /[$*_+~>()'"!\-:@]/g,
          lower: true
        });
        db.collection("members")
          .add({
            fname: this.fname,
            lname: this.lname,
            selectedGroup: this.selectedGroup,
            status: false,
            user_id: this.slug,
            companyid: this.admin.companyid,
            filteredTags: this.filteredTags
          })
          .then(() => {
            // this.$router.push({ name: "Members" });
            // this.$router.go() <-- Works but SLOW!!
            this.members.$forceUpdate()
            this.fname = '';
            this.lname = '';
            this.groups = '';
          });
      } else {
        this.feedback = "You must enter a First name";
      }
    }
  },
  created() {
    // get current user
      let admin = firebase.auth().currentUser;
      
      // find the logged in user record and grab its data
      let user = db.collection('admins').where('user_id', '==', admin.uid);

      user.get()
      .then(snapshot => {
          snapshot.forEach(doc => {
              this.admin = doc.data(),
              this.admin.id = doc.id,
              this.companyid = this.admin.companyid
          });

          //fetch company data from firestore
          let company = db.collection('company').where('id', '==', this.admin.companyid);
          company.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if(doc) {
                  this.company = doc.data();
              }
            });
          });

          //fetch member data from firestore
          let members = db.collection("members").where('companyid', '==', this.admin.companyid);
          members.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let member = doc.data();
              member.id = doc.id;
              this.members.push(member);
          });
        });
      });
  }
}
</script>
