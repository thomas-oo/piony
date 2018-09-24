<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import '~@fortawesome/fontawesome-free/scss/fontawesome.scss';
@import '~@fortawesome/fontawesome-free/scss/regular.scss';
@import '~@fortawesome/fontawesome-free/scss/solid.scss';
@import '~@fortawesome/fontawesome-free/scss/brands.scss';
@import './styles/app.scss';
</style>
