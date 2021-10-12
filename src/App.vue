<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <strong>Call Record Application</strong>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="#"
        text
      >
        <span class="mr-2" style="color: black">Log Out</span>
        <v-icon color="#000">mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
<style>
  .v-app-bar {
    background: linear-gradient(0deg, #ECEFF3 0%, #FFFFFF 118.98%) !important;
    color: black !important;
  }
</style>
