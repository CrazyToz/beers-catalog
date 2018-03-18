<template>
  <div>
    <v-container v-if="beer !== null" fluid>
      <v-layout :row="!$vuetify.breakpoint.xsOnly" :column="$vuetify.breakpoint.xsOnly">
        <v-flex xs12 lg2 offset-lg1 order-xs2 order-lg1 class="text-xs-center text-lg-left">
          <h1 class="mb-3 mt-2 headline">{{ beer.name }}</h1>
          <p>{{ beer.tagLine }}</p>
          <p>{{ beer.abv }} % ABV</p>
          <p>{{ beer.ibu }} IBU</p>
          <p>First brewed in {{ beer.firstBrewed }}</p>
          <p>
            Do you 
            <v-btn icon v-on:click="toggleCrush()">
              <v-icon :color="crush ? 'red' : 'black'">
                  favorite
              </v-icon>
            </v-btn>
            me ?
          </p>
        </v-flex>
        <v-flex xs12 lg1 offset-lg1 order-xs1 order-lg2 class="text-xs-center text-lg-left">
          <img :src="beer.imageUrl" class="beerImage"/>
        </v-flex>
        <v-flex xs12 lg4 offset-lg2 order-xs3 order-lg3>
          <v-layout column>
            <v-flex>
              <section class="elevation-24 pa-4 teal lighten-2 white--text">
                <h2 class="mb-3 mt-2">
                  <v-icon class="mr-3">
                    book
                  </v-icon>
                  About
                </h2>
                <p>{{ beer.description }}</p>
              </section>
            </v-flex>
            <v-flex>
              <section class="elevation-24 pa-4 mt-4 grey lighten-2 teal--text">
                <h2 class="mb-3 mt-2">
                  <v-icon class="mr-3">
                    cake
                  </v-icon>
                  Food pairing
                </h2>
                <ul class="pl-4">
                  <li v-for="(pairing, index) in beer.foodPairing" :key="index">
                    {{ pairing }}
                  </li>
                </ul>
              </section>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <v-layout row justify-center>
        <v-flex xs2>
          <v-progress-circular indeterminate color="teal" :size="100"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
  .beerImage {
    height: 500px;
  }
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import store from "../../store";
import { Beer } from '@/beers/Beer';
import { beerCrushesService } from '@/beers/BeerCrushesService';

@Component
export default class Summary extends Vue {

  private crush: boolean = false;

  public get beer(): Beer {
    return store.state.beer as Beer;
  }

  public created() {
    this.crush = beerCrushesService.isCrush(this.beer);
  }

  public toggleCrush() {
    this.crush = !this.crush;
    if (beerCrushesService.isCrush(this.beer)) {
      beerCrushesService.pop(this.beer);
    } else {
      beerCrushesService.push(this.beer);
    }
  }

}
</script>
