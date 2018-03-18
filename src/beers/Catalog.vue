<template>
  <div>
    <v-container fluid grid-list-md v-if="beers.length > 0">
        <v-layout row wrap>
        <v-flex xs12 md6 lg4 v-for="beer in beers" :key="beer.id">
            <beer-card :beer="beer" :favored="isCrush(beer)" v-on:crush="onCrush"></beer-card>
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


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { $http, HttpResponse } from 'vue-resource';
import { Beer } from '@/beers/Beer';
import { beerService } from '@/beers/BeerRestService';
import { beerCrushesService } from '@/beers/BeerCrushesService';
import BeerCard from './BeerCard.vue';
import store from '@/store';

@Component({
  components: {
    BeerCard,
  },
})
export default class Catalog extends Vue {

  public get beers(): Beer[] {
    return store.state.beers;
  }

  private onCrush(crush: boolean, beer: Beer) {
    if (crush === true) {
      beerCrushesService.push(beer)
    } else {
      beerCrushesService.pop(beer);
    }
  }

  private isCrush(beer: Beer): boolean {
    return beerCrushesService.isCrush(beer);
  }
}
</script>