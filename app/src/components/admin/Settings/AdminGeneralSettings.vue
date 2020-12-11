<template>
    <div id="admin-general-settings">
        <h3>Company Settings</h3>
          <form class="uk-form-horizontal" @submit.prevent="updateCompany">
            <fieldset class="uk-fieldset">
                <div class="uk-margin form-table uk-text-left">
                    <div class="uk-form-label uk-text-right">
                        <label for="lname"><b>Company Name:</b></label>
                    </div>
                    <div class="uk-form-controls">
                        <input
                        placeholder="Ex: Blossom"
                        class="uk-input"
                        type="text"
                        name="co-name"
                        v-model="company.name"
                        >
                        <small>Your company name will not change the url to login</small>
                    </div>
                </div>
                <div class="uk-margin uk-text-left">
                    <div class="uk-form-label">
                        <label></label>
                    </div>
                    <div class="uk-form-controls">
                        <button class="btn primary uk-text-left" type="submit">Update Company</button>
                    </div>
                </div>
              
              <p class="uk-text-center" v-if="feedback">{{ feedback }}</p>
            </fieldset>
          </form>
          <hr>
          <h3>General Settings</h3>
          <form class="uk-form-horizontal" @submit.prevent="updateCreds">
            <fieldset class="uk-fieldset">
                <div class="uk-margin form-table">
                    <div class="uk-form-label uk-text-right">
                        <label for="lname"><b>Email:</b></label>
                    </div>
                    <div class="uk-form-controls">
                        <input
                        placeholder="Email"
                        class="uk-input"
                        type="text"
                        name="email"
                        v-model="admin.email"
                        >
                    </div>
                </div>
                <div class="uk-margin form-table">
                    <div class="uk-form-label uk-text-right">
                        <label for="lname"><b>First Name:</b></label>
                    </div>
                    <div class="uk-form-controls">
                        <input
                        placeholder="First Name"
                        class="uk-input"
                        type="text"
                        name="fname"
                        v-model="admin.fname"
                        >
                    </div>
                </div>
                <div class="uk-margin form-table">
                    <div class="uk-form-label uk-text-right">
                        <label for="lname"><b>Last Name:</b></label>
                    </div>
                    <div class="uk-form-controls">
                        <input
                        placeholder="Last Name"
                        class="uk-input"
                        type="text"
                        name="lname"
                        v-model="admin.lname"
                        >
                    </div>
                </div>
                
                <div class="uk-margin uk-text-left">
                    <div class="uk-form-label uk-text-right">
                        <label></label>
                    </div>
                    <div class="uk-form-controls">
                        <button class="btn primary uk-text-left" type="submit">Update Settings</button>
                    </div>
                </div>
              
              <p class="uk-text-center" v-if="feedback">{{ feedback }}</p>
            </fieldset>
          </form>

    </div>
</template>

<script>
    import db from '@/firebase/init'
    import firebase from 'firebase'

    export default {
    name: 'AdminGeneralSettings',
    data() {
        return {
            admin: {},
            company: {},
            feedback: null
        };
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
                this.admin.id = doc.id
            })
        
            //fetch company data from firestore
            let company = db.collection('company').doc(this.admin.companyid);
            company.get().then(doc => {
                if(doc) {
                    this.company = doc.data();
                }
            });
        });
    },
    methods: {
        updateCreds() {
            db.collection('admins').doc(this.admin.id).update({
                username: this.admin.username,
                uid: this.admin.username,
                companyid: this.admin.companyid,
                fname: this.admin.fname,
                lname: this.admin.lname,
                email: this.admin.email
            })
            .then(() => {
                this.feedback = "Settings have been updated!"
                this.$router.push({ name: "AdminGeneralSettings" })
                location.reload()
            }).catch(err => {
                console.log(err);
            })
        },
        updateCompany() {
            db.collection('company').where('id', '==', this.admin.companyid).update({
                name: this.company.name,
                slug: this.company.slug,
                groups: this.company.groups
            })
            .then(() => {
                console.log(this.company.slug)
                this.feedback = "Company Settings have been updated!"
                this.$router.push({ name: "AdminGeneralSettings" })
                location.reload()
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>