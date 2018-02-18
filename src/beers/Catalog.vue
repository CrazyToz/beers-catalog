<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
        <v-flex md4 v-for="beer in beers" :key="beer.id">
            <beer-card :beer="beer"></beer-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { $http, HttpResponse } from 'vue-resource';
import { Beer } from './Beer';
import BeerCard from './BeerCard.vue';

@Component({
  components: {
    BeerCard,
  },
})
export default class Catalog extends Vue {
  private beers: Beer[] = [];

  public created() {
    this.$http
      .get('https://api.punkapi.com/v2/beers?per_page=80&page=3')
      .then((response: HttpResponse) => {
        this.beers = response.data.map((item: any) => {
          const beer: Beer = {
            id: item.id,
            name: item.name,
            description: item.description,
            imageUrl: item.image_url,
          };
          return beer;
        });
      });
  }
}
</script>