<template>
    <div class="admin-login">
        <div class="narrow">
            <h1>Login</h1>
                <form @submit.prevent="login">

                <!-- Email -->
                <div class="uk-margin">
                <input placeholder="Email" class="uk-input" type="email" name="group" v-model="email">
                </div>
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

                <p
                v-if="passwordfeedback"
                id="password-alert"
                class="uk-text-center uk-text-danger"
                >{{ passwordfeedback}}</p>
                <!-- End Password -->
                <!-- Feedback -->
                <p v-if="overallfeedback" class="uk-text-center uk-text-danger">{{ overallfeedback }}</p>

                <div class="uk-margin">
                <button class="btn primary" type="submit">Login</button>
                <div class="backtosignup">
                    <router-link
                    class="uk-text-center uk-text-small"
                    to="/adminsignup"
                    >Need to create an account?</router-link>
                </div>
                </div>
                <!-- End Feedback -->
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'AdminLogin',
    data() {
        return {
            email: null,
            password: null,
            overallfeedback: null,
            passwordfeedback: null
        }
    },
    methods: {
        login() {
            if(this.email && this.password){
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        console.log(cred.user);
                        this.$router.push({ name: 'AdminHome' })
                    }).catch(err => {
                        this.overallfeedback = err.message;
                    })
                this.overallfeedback = null;
            } else {
                this.overallfeedback = 'Please fill in both fields'
            }
        }
    }
}
</script>

