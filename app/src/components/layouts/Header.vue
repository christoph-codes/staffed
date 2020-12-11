<!-- Header -->
<template>
    <div id="header">
        <div class="container">
            <div class="columns">
                <div class="column is-one-fifth">
                    <div class="main-logo float-left">
                        <router-link to="/">
                            <img src="@/assets/logo.png">
                        </router-link>
                    </div>
                </div>
                <div class="column is-four-fifths">
                    <div class="navbar float-right">
                        <ul>
                            <li class="list-item"><router-link to="/features">Features</router-link></li>
                            <li class="list-item"><router-link to="/pricing">Pricing</router-link></li>
                            <li v-if="user" class="list-item"><router-link to="/help">Help</router-link></li>
                            <li v-if="!user" class="list-item"><router-link to="/faq">FAQ</router-link></li>
                            <li v-if="!user" class="list-item"><router-link to="/adminsignup">Signup</router-link></li>
                            <li v-if="!user" class="list-item"><router-link to="/login">Login</router-link></li>
                            <li v-if="user" class="list-item"><router-link to="/admin/home">Dashboard</router-link></li>
                            <li v-if="user" class="list-item"><a @click="logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    name: 'Header',
    data() {
       return {
           user: null
       };
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.user = user;
            } else {
                this.user = null
            }
        })
    },
    methods: {
        logout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({ name: 'AdminLogin' });
            })
        }
    }
}
</script>
