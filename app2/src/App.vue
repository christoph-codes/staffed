<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
:root {
  --green: #00a651;
  --orange: #f04935;
  --terti: #cbd8d1;
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
</style>
