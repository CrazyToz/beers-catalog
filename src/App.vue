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
      <v-toolbar-title v-bind:class="{bigTitle: !$vuetify.breakpoint.xsOnly}" class="ml-0 pl-3 mr-">
        <v-toolbar-side-icon v-on:click="toggleMenu()"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Beers</span>
      </v-toolbar-title>
      <v-select 
        :items="beers"
        item-text="name" 
        item-value="id"
        autocomplete
        placeholder="Search"
        v-on:change="goTo"
        prepend-icon="search"
        clearable
        solo-inverted
        >
      </v-select>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
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

.bigTitle {
  width: 300px;
}

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UIRoute, router } from './router';
import { Beer } from '@/beers/Beer';

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

  public created() {
    this.$store.dispatch('checkoutBeersWhenNeeded');
  }

  public get beers(): Beer {
    return this.$store.state.beers;
  }

  public goTo(route: UIRoute | number): void {
    if (typeof route === 'number') {
      router.push('/details/' + route);
    } else if(route !== null) {
      router.push(route.path);
    } else {
      router.push('/');
    }
  }

  public toggleMenu() {
    this.drawer = !this.drawer;
  }

}
</script>

