<template>
  <div id="admingigs">
    <h1>Gigs</h1>
    <hr>
    <ul class="gig-list" uk-accordion>
      <li class="gig-item" v-for="gig in gigs" :key="gig.id">
        <a class="uk-accordion-title" href="#">
          <div uk-grid>
            <div class="uk-width-1-2@s uk-float-left uk-text-left">
              <h4>
                {{ gig.name}} -
                <span>{{ convertDate(gig.startdate) }}-{{ convertDate(gig.enddate) }}</span>
              </h4>
            </div>
            <div class="uk-width-1-2@s uk-float-right group-tags">
              <p>{{ gig.group }}</p>
            </div>
          </div>
        </a>
        <div class="uk-accordion-content uk-text-left">
          <p>
            <b>Description:</b>
            {{ gig.description }}
          </p>
          <p>
            <b>Gig Created:</b>
            {{ convertDate(gig.creationdate) }}
          </p>
          <p>
            <b>Attendees:</b>
            {{ gig.attendees }}
          </p>
          <div uk-grid>
            <div class="uk-width-1-2@s uk-float-left gig-members">
              <h5>Confirmed Members: {{ gig.confirmedmembers.length }} / {{ gig.maxmembers }}</h5>
              <div v-if="gig.confirmedmembers != null" class="confirmed-members">
                <span
                  v-for="(member,index) in gig.confirmedmembers"
                  :key="index"
                  class="confirmed"
                >{{ member }}</span>
              </div>
            </div>
          </div>
          <hr>

          <div class="uk-grid">
            <div class="uk-width-1-2@s uk-float-left uk-text-left">
              <a class="deleteButton" uk-toggle href="#deleteModal" data-id="id">
                <font-awesome-icon icon="trash"/>
                <span>Cancel Gig</span>
              </a>
            </div>
            <div class="uk-width-1-2@s uk-float-right uk-text-right">
              <a class="edit-gig-button" href uk-toggle="target: #deleteGigModal">
                <font-awesome-icon icon="edit"/>
                <span>Edit Gig</span>
              </a>
            </div>
          </div>

          <!-- Delete Gig Modal -->
          <div id="deleteModal" class="uk-modal-full" uk-modal>
            <div class="uk-modal-dialog uk-text-center">
              <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
              <h2 class="uk-modal-title">Are you sure you want to delete this gig?</h2>
              <p>
                <b>{{ gig.name }}</b>
              </p>
              <button class="uk-modal-close btn secondary" type="button">Cancel</button>
              <button
                class="btn primary"
                @click="deleteGig(gig.id)"
                type="button"
              >Yes, Delete {{ gig.id }}</button>
            </div>
          </div>
        </div>
      </li>

      <!-- Add Gig Modal -->
      <div id="addgig-modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-text-center">
          <h2 class="uk-modal-title">Add Gig</h2>
          <form @submit.prevent="addGig">
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <label for="name">Name</label>
                <input
                  placeholder="Gig Name"
                  class="uk-input"
                  type="text"
                  name="name"
                  v-model="name"
                >
              </div>
              <div class="uk-margin">
                <label for="startdate">Start Date</label>
                <input
                  placeholder="Gig Start Date"
                  class="uk-input"
                  type="date"
                  name="startdate"
                  v-model="startdate"
                >
              </div>
              <div class="uk-margin">
                <label for="enddate">End Date</label>
                <input
                  placeholder="Gig End Date"
                  class="uk-input"
                  type="date"
                  name="enddate"
                  v-model="enddate"
                >
              </div>
              <div class="uk-margin">
                <label for="attendees">Attendees</label>
                <input
                  placeholder="# of Attendees"
                  class="uk-input"
                  type="number"
                  name="attendees"
                  v-model.number="attendees"
                >
              </div>
              <div class="uk-margin">
                <label for="groups">Group</label>
                <select class="uk-select" type="select" v-model="group">
                  <option
                    v-for="(group, index) in company.groups"
                    :key="index"
                    v-bind:value="group"
                  >{{ group }}</option>
                </select>
              </div>
              <div class="uk-margin">
                <label for="maxmembers">Members Needed</label>
                <input
                  placeholder="# of Members"
                  class="uk-input"
                  type="number"
                  name="maxmembers"
                  v-model.number="maxmembers"
                >
              </div>
              <div class="uk-margin">
                <label for="name">Description</label>
                <textarea
                  placeholder="A description of the gig."
                  class="uk-textarea"
                  name="description"
                  v-model="description"
                  rows="10"
                ></textarea>
              </div>

              <button class="btn secondary uk-modal-close">Cancel</button>
              <button class="btn primary" type="submit">Add Gig</button>
              <p v-if="feedback">{{ feedback }}</p>
            </fieldset>
          </form>
        </div>
      </div>
    </ul>
    <!-- Add Gig Button -->
    <div class="addfloat">
      <div class="add-gig">
        <a
          href
          uk-toggle="target: #addgig-modal"
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
  name: "AdminGigs",
  data() {
    return {
      admin: {},
      gigs: [],
      name: null,
      attendees: null,
      startdate: new Date(),
      enddate: new Date(),
      maxmembers: null,
      description: null,
      group: null,
      id: null,
      slug: null,
      confirmedmembers: [],
      companyid: null,
      feedback: null,
      company: {}
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
      let companygigs = db.collection("gigs");
      companygigs.get().then(snapshot => {
        snapshot.forEach(doc => {
          let gig = doc.data();
          gig.id = doc.id;
          this.gigs.push(gig);
        });
      });
    });
  },
  methods: {
    addGig() {
      let now = new Date();

      if (this.name) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~>()'"!\-:@]/g,
          lower: true
        });

        // adding a new gig data to the database
        db.collection("gigs")
          .add({
            name: this.name,
            startdate: this.fbStartDate,
            enddate: this.fbEndDate,
            attendees: this.attendees,
            description: this.description,
            group: this.group,
            maxmembers: this.maxmembers,
            confirmedmembers: this.confirmedmembers,
            slug: this.slug,
            creationdate: this.fbCreationDate,
            companyid: this.admin.companyid,
            status: true
          })
          .then(() => {
            this.$router.push({ name: "AdminGigs" });
            this.feedback = "Gig Successfully Added";
            this.name = "";
            this.date = "";
            this.attendees = "";
            this.description = "";
            this.group = "";
            this.maxmembers = "";
            this.gigs.$forceUpdate();
          });
      } else {
        this.feedback = "You must enter a Gig name!";
      }
    },
    deleteGig(id) {
      console.log(id);
      //   delete gig document from firestore
      // db.collection("gigs")
      //     .doc(id)
      //     .delete()
      //     .then(() => {
      //         this.gigs = this.gigs.filter(gig => {
      //             return gig.id != id;
      //         });
      //     });

      // vvvvvvv Printing the id's name  vvvvvvvv
      // .get()
      // .then(doc => {
      //     if(doc) {
      //         let it = doc.data();
      //         console.log(it.name);
      //     }
      // });
    },
    convertDate(timestamp) {
      let date = timestamp.toDate();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let yyyy = date.getFullYear();

      date = mm + "/" + dd + "/" + yyyy;
      return date;
    }
  },
  computed: {
    fbStartDate() {
      const date = new Date(this.startdate);
      console.log(date);
      return date;
    },
    fbEndDate() {
      const date = new Date(this.enddate);
      console.log(date);
      return date;
    },
    fbCreationDate() {
      const date = new Date();
      console.log(date);
      return date;
    }
  }
};
</script>

