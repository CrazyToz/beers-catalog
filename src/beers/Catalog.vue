<template>
  <div>
    <div class="text-xs-center">
      <v-pagination :length="totalPages" v-model="page" color="teal" v-on:input="onPageChange()"></v-pagination>
    </div>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
        <v-flex xs12 md6 lg4 v-for="beer in beers" :key="beer.id">
            <beer-card :beer="beer"></beer-card>
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
import BeerCard from './BeerCard.vue';

@Component({
  components: {
    BeerCard,
  },
})
export default class Catalog extends Vue {
  
  private beers: Beer[] = [];

  /*
   * Total page can bot be calculated because rest api do not expose the number of avilable beers
   * #feelsBadMan
   */
  private totalPages: number = 3;

  private page: number = 1;

  public created() {
    beerService.findBeers(this.page).then((beers: Beer[]) => {
      this.beers = beers;
    });
  }

  private onPageChange() {
    this.beers = [];
    beerService.findBeers(this.page).then((beers: Beer[]) => {
      this.beers = beers;
    });
  }
}
</script>