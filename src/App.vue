<template>
  <v-app id="app">
  <v-navigation-drawer app clipped :value="drawer">
    <v-list>
      <v-list-tile v-for="route in routes" :key="route.title" dense class="pt-0" v-on:click="goTo(route)">
        <v-list-tile-action>
             <v-icon>{{ route.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ route.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app clipped-left>
      <v-toolbar-side-icon v-on:click="toggleMenu()"></v-toolbar-side-icon>
      <v-toolbar-title>Beers</v-toolbar-title>
  </v-toolbar>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import "~vuetify/dist/vuetify.min.css";

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UIRoute, router } from './router';

@Component
export default class App extends Vue {

  private drawer: boolean = true;

  private routes: UIRoute[] = [
    {
      path: '/',
      title: 'Catalog',
      icon: 'home',
    },
    {
      path: '/crushes',
      title: 'My crushes',
      icon: 'favorite',
    },
  ];

  public goTo(route: UIRoute): void {
    router.push(route.path);
  }

  public toggleMenu() {
    this.drawer = !this.drawer;
  }

}
</script>

