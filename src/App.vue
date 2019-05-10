<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/home">VueHome</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
/* import vuetify css */
@import url('//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons');
@import url('//cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css');
/* import material design icons css*/
@import url('//cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css');

#nav {
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
