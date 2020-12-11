<template>
  <div id="adminGroups">
    <h1>Groups</h1>
    <p>Place members into different groups based on their skills.</p>
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Group</th>
          <th>Members</th>
          <!-- Replace with drag and drop buefy table -->
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- List Group -->
        <tr v-for="(group,key) in company.groups" :key="key">
          <!-- List Group -->
          <td class="uk-text-bold">{{ group }}</td>

          <!-- List Name -->
          <td>
            <ul class="uk-list">
              <li v-for="member in members" :key="member.id">{{ member.fname}}</li>
            </ul>
          </td>

          <!-- List Edit -->
          <td>
            <a href uk-toggle="target: #editgroup-modal" @click="passdata(member)">
              <font-awesome-icon icon="edit"/>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Group Modal -->
    <div id="editgroup-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-text-center">
        <form @submit.prevent="editGroup">
          <div class>
            <h2 class>Edit {{ selectedMember.fname }}</h2>
            <div class="columns">
              <div class="column"></div>

              <div class="column is-three-quarters">
                <b-field>
                  <b-input placeholder="Add to Group" type="text" name="group" v-model="group"></b-input>
                </b-field>

                <!-- <b-taglist>
                    <b-tag>{{ selectedMember.groups[0] }}</b-tag>
                </b-taglist>-->
                <button class="btn secondary uk-modal-close">Cancel</button>
                <button class="btn primary uk-modal-close" type="submit">Confirm Edit</button>
              </div>

              <div class="column"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Add Group Modal -->
    <div id="addgroup-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-text-center">
        <h2 class="uk-modal-title">Add a New Group</h2>
        <form @submit.prevent="addGroup">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <input
                placeholder="Group Name"
                class="uk-input"
                type="text"
                name="name"
                v-model="name"
              >
            </div>

            <button class="btn secondary uk-modal-close">Cancel</button>
            <button class="btn primary" type="submit">Add Group</button>
            <p v-if="feedback">{{ feedback }}</p>
          </fieldset>
        </form>
      </div>
    </div>

    <!-- Add Group Button -->
    <div class="addfloat">
      <div class="add-group">
        <a
          href
          uk-toggle="target: #addgroup-modal"
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

export default {
  name: "AdminGroups",
  data() {
    return {
      admin: {},
      members: [],
      groups: [],
      company: {},
      filteredTags: [],
      feedback: null,
      name: null,
      slug: null,
      fname: null,
      lname: null,
      status: null,
      allowNew: true,
      companyid: null,
      user_id: null,
      item: null,
      member: null,
      group: null,
      selectedMember: "selectedMember"
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

      //fetch members data from firestore
      let members = db
        .collection("company")
        .doc(this.admin.companyid)
        .collection("members");

      members.get().then(snapshot => {
        snapshot.forEach(doc => {
          let member = doc.data();
          member.id = doc.id;
          this.members.push(member);
        });
      });
    });
  },
  methods: {
    passdata(member) {
      this.selectedMember = member;
      console.log(this.selectedMember);
    },
    addGroup() {
      if (this.name) {
        this.feedback = null;
        // adding group data to the database
        db.collection("company")
          .doc(this.admin.companyid)
          .set({
            groups: {
              abc123: this.name
            }
          })
          .then(() => {
            this.$router.push({ name: "AdminGroups" });
            this.feedback = "Group Added Successfully";
          });
      } else {
        this.feedback = "You must enter a Group name!";
      }
    }
  },
  editGroup() {
    if (this.name) {
      this.feedback = null;
      // create a slug
      this.slug = slugify(this.name, {
        replacement: "-",
        remove: /[$*_+~>()'"!\-:@]/g,
        lower: true
      });
      // adding group data to the database
      db.collection("groups")
        .update({
          name: this.groups
        })
        .then(() => {
          this.$router.push({ name: "AdminGroups" });
          this.feedback = "Group Added Successfully";
        });
    } else {
      this.feedback = "You must enter a Group name!";
    }
  }
};
</script>

<style>
/* Add Group Button */
.addfloat {
  position: fixed;
  right: 1%;
  bottom: 50px;
  z-index: 9;
}
.add-person .uk-icon-button.uk-icon {
  font-size: 40px;
  line-height: 0;
  padding: 0;
  margin: 0;
}
.add-person .uk-icon-button.uk-icon:hover {
  text-decoration: none;
}
.uk-icon-button {
  width: 60px;
  height: 60px;
  border-radius: 500px;
  background: var(--green);
  color: white;
  transition: 0.3s;
  font-size: 30px;
}
</style>

</style>