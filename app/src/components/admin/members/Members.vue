<template>
  <div id="adminPeople">
    <h1>Members</h1>
    <p>All of your organization's members.</p>
    <div class="people-list">
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Group(s)</th>
            <th>Status</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in members"
            :key="member.id"
            :class="{greyed: member.status === 'false'}"
          >
            <!-- Display Name -->
            <td>
              <router-link to="/members/edit/:member.id">{{ member.lname }}, {{ member.fname }}</router-link>
            </td>

            <!-- Display Group -->
            <td>
              <span>{{ member.group }}</span>
            </td>

            <!-- Active Switch -->
            <td>
              <div class="field" @click="toggleActive(member, member.id)">
                <b-switch :value="member.status" type="is-success is-medium"></b-switch>
              </div>
            </td>

            <!-- Edit Member Button -->
            <td>
              <a href uk-toggle="target: #editmember-modal">
                <font-awesome-icon icon="edit"/>
              </a>
            </td>

            <!-- Delete Member Button -->
            <td>
              <a href uk-toggle="target: #deletemember-modal" @click="passdata(member)">
                <font-awesome-icon icon="trash"/>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Add Member Modal -->
    <div id="addmember-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-text-center">
        <h2 class="uk-modal-title">Add Member</h2>

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
                  <b-input placeholder="Email" type="text" name="email" v-model="email"></b-input>
                </b-field>

                <b-field>
                  <b-input placeholder="Group" type="text" name="group" v-model="group"></b-input>
                </b-field>

                <button class="btn secondary uk-modal-close" type="button">Cancel</button>
                <button class="btn primary" type="submit">Add Member</button>
              </div>

              <div class="column"></div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Member Modal -->
    <div id="editmember-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-text-center">
        <h2 class="uk-modal-title">Edit Member</h2>

        <form @submit.prevent="editMember">
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
                  <b-input placeholder="Email" type="text" name="email" v-model="email"></b-input>
                </b-field>

                <b-field>
                  <b-input placeholder="Group" type="text" name="group" v-model="group"></b-input>
                </b-field>

                <button class="btn secondary uk-modal-close" type="button">Cancel</button>
                <button class="btn primary" type="submit">Edit Member</button>
              </div>

              <div class="column"></div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Member Modal -->
    <div id="deletemember-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-text-center">
        <h2 class="uk-modal-title">Delete {{selectedMember.fname}} {{selectedMember.lname}}?</h2>
        <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
        <p>Are you sure you want to delete this member?</p>
        <p>This cannot be undone.</p>
        <button class="btn secondary uk-modal-close">Cancel</button>
        <button
          class="btn primary uk-modal-close"
          @click="deleteMember(selectedMember)"
        >Delete Member</button>
      </div>
    </div>

    <!-- Add Member Button -->
    <div class="addfloat">
      <div class="add-member">
        <a
          href
          uk-toggle="target: #addmember-modal"
          class="uk-icon-button"
          uk-icon="icon: plus; ratio: 2"
        >+</a>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import slugify from "slugify";
import AddMembers from "@/components/admin/members/AddMembers";
import EditMembers from "@/components/admin/members/EditMembers";

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: "https://www.example.com/finishSignUp?cartId=1234",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.appCookout.staffed"
  },
  android: {
    packageName: "com.staffed.staffed_android",
    installApp: true,
    minimumVersion: "12"
  },
  dynamicLinkDomain: "example.page.link"
};

export default {
  name: "Members",
  components: { AddMembers, EditMembers },
  data() {
    return {
      admin: {},
      members: [],
      feedback: null,
      id: null,
      slug: null,
      fname: null,
      lname: null,
      status: null,
      email: null,
      companyid: null,
      company: null,
      selectedMember: "selectedMember",
      member: null,
      passData: "passData",
      group: null
    };
  },
  computed: {},
  created() {
    // Get current user
    let admin = firebase.auth().currentUser;

    // Find the logged in user and grab their data
    let user = db.collection("admins").where("user_id", "==", admin.uid);
    user.get().then(snapshot => {
      snapshot.forEach(doc => {
        (this.admin = doc.data()), (this.admin.id = doc.id);
      });

      // Fetch company data from firestore
      let company = db.collection("company").doc(this.admin.companyid);
      company.get().then(doc => {
        if (doc) {
          this.company = doc.data();
        }
      });

      // Fetch members data from firestore
      let members = db.collection("members");
      members.get().then(snapshot => {
        snapshot.forEach(doc => {
          let member = doc.data();
          member.id = doc.id;
        });
      });

      // Listen for changes on members collection, instantly update when member is added
      let ref = db
        .collection("members")
        .orderBy("status", "desc")
        .orderBy("lname");
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added" || change.type == "removed") {
            let doc = change.doc;
            this.members.push({
              id: doc.id,
              fname: doc.data().fname,
              lname: doc.data().lname,
              group: doc.data().group,
              status: doc.data().status
            });
          }
        });
      });
    });
  },
  mounted() {},

  methods: {
    // Toggle Status (Not fully working)
    toggleActive(member, id) {
      this.selectedMember = member;

      if ((member.status = "false")) {
        db.collection("members")
          .doc(id)
          .update({ status: "true" })
          .then(() => {
            this.$router.push({ name: "Members" });
          });
      } else {
        db.collection("members")
          .doc(id)
          .update({ status: "false" })
          .then(() => {
            this.$router.push({ name: "Members" });
          });
      }
    },

    // Delete Member
    deleteMember(selectedMember) {
      db.collection("members")
        .doc(selectedMember.id)
        .delete()
        .then(() => {
          this.members = this.members.filter(member => {
            return member.id != id;
          });
        });
    },

    // Add Member
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
            group: this.group,
            email: this.email,
            status: "false",
            companyid: this.admin.companyid
          })
          .then(() => {
            this.members.push(this.member);
            this.fname = "";
            this.lname = "";
            this.group = "";
          });
      } else {
        this.$toast.open({
          duration: 5000,
          message: `Complete all fields`,
          position: "is-bottom",
          type: "is-danger"
        });
      }
    },

    // Edit Member

    // Pass Data
    passdata(member) {
      this.selectedMember = member;
      console.log(this.selectedMember);
    },
    danger() {}
  }
};
</script>

