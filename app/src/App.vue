<!-- APP.VUE -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ActiveSwitch from "@/components/admin/members/EditMembers.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    ActiveSwitch
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,600,800");
:root {
  --green: #00a651;
  --orange: #f04935;
  --dgray: #707070;
  --mgray: #cbd8d1;
  --lgray: #e9f0ec;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--dgray);
}
.page {
  padding: 100px 0;
}
.narrow {
  width: 95%;
  margin: 0 auto;
  max-width: 600px;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.bold {
  font-weight: bold;
  letter-spacing: 1px;
}
* {
  font-family: "Montserrat", sans-serif;
}
h1,
h2,
h3 {
  font-weight: bold;
}
h4,
h5,
h6 {
  font-weight: lighter;
}
h1 {
  font-size: 42px;
  color: var(--green);
}
h2 {
  font-size: 36px;
  color: var(--orange);
}
h3 {
  font-size: 28px;
  color: var(--dgray);
}
.uk-link,
a {
  color: var(--green);
  transition: 0.3s;
}
.uk-link:hover,
a:hover {
  color: var(--orange);
  text-decoration: none;
}
button.btn,
a.btn {
  border: none;
  padding: 10px 25px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}
button.btn.primary,
a.btn.primary {
  background: var(--green);
}
button.btn.secondary,
a.btn.secondary {
  background: var(--dgray);
}
.backtologin {
  margin-top: 20px;
}
.backtologin a {
  color: var(--dgray);
  font-size: 12px;
}
#adminsignup h3 {
  text-align: left;
}
.tkc-relative {
  position: relative;
}
.static-value {
  position: absolute;
  right: -1px;
  font-weight: normal;
  color: white;
  top: -5px;
  font-size: 18px;
  padding: 11px 20px;
  background: var(--dgray);
}
.company-slug {
  color: var(--green);
}
/* Main Home */
.hero {
  height: 600px;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(var(--green)),
    to(#33cc33)
  );
  background: linear-gradient(to bottom right, var(--green), #33cc33);
  overflow: hidden;
}
.homepage {
  min-height: 2000px;
}
.hero-body {
  padding: 5rem 1.5rem;
}
/* Page Template */
.page-content {
  padding-top: 80px;
  min-height: 600px;
}
.page-content .homepage {
  margin-top: -80px;
}
/* Gig Styling */
.gig-item {
  box-shadow: 0px 0px 5px -3px;
  padding: 30px;
  border-radius: 10px;
}
.gig-item h4 {
  margin: 0;
  color: var(--green);
  font-weight: bold;
}
.gig-item h4 span {
  color: var(--dgray);
  font-weight: lighter;
  font-size: 16px;
}
.gig-item .group-tags {
  text-align: right;
}
.gig-members h5 {
  display: inline;
}
.gig-item .group-tags p {
  background: var(--lgray);
  font-size: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 0 0 5px;
}
.gig-members span {
  background: var(--lgray);
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  margin: 0 5px 0 0;
}
.gig-members span.confirmed {
  background: var(--green);
  color: white;
}
#deleteModal .uk-modal-dialog.uk-text-center {
  padding: calc(50vh - 50px) 0 calc(50vh - -50px);
  height: 100px;
}
/* Group Styling */
.group-item {
  box-shadow: 0px 0px 5px -3px;
  padding: 30px;
  border-radius: 10px;
}
.group-item h4 {
  margin: 0;
  color: var(--green);
  font-weight: bold;
}
.group-item h4 span {
  color: var(--dgray);
  font-weight: lighter;
}
.group-item .group-tags {
  text-align: right;
}
.group-item .group-tags p {
  background: var(--lgray);
  font-size: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 0 0 5px;
}
/* Admin Header Styling */
#adminHeader {
  padding: 2px 2%;
  width: 100%;
  display: block;
  z-index: 1;
  background: var(--dgray);
  height: 35px;
}
#adminHeader .main-logo img {
  width: 30px;
  padding: 0;
}
#adminHeader .navbar {
  background: transparent;
  min-height: 0;
}
.navbar .list-item {
  display: inline-block;
  border: none;
  padding: 0 10px;
}

.uk-navbar-item,
.uk-navbar-nav > li > a,
.uk-navbar-toggle {
  min-height: 0;
}
.uk-navbar-nav > li,
.uk-navbar-nav > li > a {
  color: var(--lgray);
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
}
.uk-navbar-dropdown-nav > li > a {
  color: var(--dgray);
}
.uk-navbar-dropdown-nav > li > a:focus,
.uk-navbar-dropdown-nav > li > a:hover {
  color: white;
  background: var(--green);
  display: block;
}
.uk-navbar-nav > li:hover > a,
.uk-navbar-nav > li > a.uk-open,
.uk-navbar-nav > li > a:focus {
  color: var(--lgray);
}
.uk-navbar-dropdown {
  padding: 20px 15px;
  background: var(--lgray);
  color: var(--dgray);
}
.dashboard-company-name {
  color: white;
  font-size: 14px;
  margin: 5px 0 0 10px;
}
/* Not Found Styling */
#not-found img {
  max-width: 400px;
}
/* Public Header */
#header {
  padding: 5px 0;
  width: 100%;
  display: block;
  z-index: 1;
  background: var(--green);
}
.main-logo img {
  width: 150px;
  padding: 5px 0 0;
}
.navbar {
  min-height: 3.25rem;
  background: transparent;
}
.navbar ul {
  margin: 0;
}
.navbar .list-item {
  display: inline-block;
  border: none;
  padding: 10px;
}
#header .navbar .list-item a {
  color: white;
  text-transform: uppercase;
  font-size: 14px;
  display: inline-block;
  line-height: 46px;
}
.navbar .list-item a.router-link-exact-active {
  font-weight: bold;
}
/* Public Footer */
#footer {
  background: var(--lgray);
  padding: 10px 0;
  bottom: 0;
  width: 100%;
  height: 35px;
}
#footer p {
  color: var(--dgray);
  font-size: 10px;
  margin: 0;
}
#adminFooter {
  background: var(--lgray);
  padding: 10px 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 35px;
}
#adminFooter p {
  color: var(--dgray);
  font-size: 10px;
  margin: 0;
}
/* Admin Sidebar Styling */
#adminSidenav {
  background: var(--mgray);
  padding: 50px 5%;
  min-height: 100vh;
  position: relative;
  height: 100%;
}
.admin-mainnav .uk-nav > li {
  background: var(--lgray);
}
.admin-mainnav .uk-nav > li > a {
  line-height: 60px;
  padding: 0 20px;
}
.admin-mainnav .uk-nav-parent-icon > .uk-parent > a::after {
  height: 60px;
}
ul.uk-nav-sub {
  background: var(--mgray);
}
.company-detail img {
  max-width: 100px;
}
.company-detail h4 {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 0;
  color: var(--dgray);
}
.company-detail p {
  font-size: 14px;
  margin-top: 0;
}
#adminSidenav hr {
  height: 1px;
  background: var(--dgray);
  border-top: none;
}
#adminSidenav ul.uk-nav-sub {
  background: var(--dgray);
  padding: 0;
}
#adminSidenav ul.uk-nav-sub li {
  padding: 10px 20px;
}
#adminSidenav ul.uk-nav-sub li:hover {
  background: var(--green);
}
#adminSidenav ul.uk-nav-sub li a {
  color: white;
  transition: 0.3s;
}
#adminSidenav ul.uk-nav-sub li a:hover {
  color: var(--mgray);
}
/* General Settings Styling */
.form-table .uk-input,
.form-table .uk-select,
.form-table .uk-textarea {
  background: white;
}
.form-table .uk-form-controls input {
  border-bottom: solid var(--mgray) 1px;
}
/* Members Styling */
span.group-tags {
  background: var(--lgray);
  font-size: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 0 0 5px;
}
.people-details h2 {
  font-size: 24px;
  color: var(--dgray);
  margin: 0;
}
.people-details p {
  font-size: 14px;
  margin: 0;
}
.greyed {
  color: var(--mgray);
}
ul.member-list {
  padding: 0;
}
.member-item {
  box-shadow: 0px 0px 5px -3px;
  padding: 30px;
  border-radius: 10px;
}
.member-item h4 {
  margin: 0;
  color: var(--green);
  font-weight: bold;
}
.member-item h4 span {
  color: var(--dgray);
  font-weight: lighter;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: var(--green);
}
input:focus + .slider {
  box-shadow: 0 0 1px var(--green);
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
/* Admin Login */
.admin-login {
  min-height: 600px;
}
.backtosignup a {
  color: var(--dgray);
  margin-top: 10px;
  display: inline-block;
}
/* Company Signup */
#adminsignup h3 {
  text-align: left;
}
.tkc-relative {
  position: relative;
}
.static-value {
  position: absolute;
  right: -1px;
  font-weight: normal;
  color: white;
  top: -5px;
  font-size: 18px;
  padding: 11px 20px;
  background: var(--dgray);
}
.company-slug {
  color: var(--green);
}
/* Admin Container */
.dashboard {
  padding: 50px 20px;
}

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
