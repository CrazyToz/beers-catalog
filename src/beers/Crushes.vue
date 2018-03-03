<template>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md6 lg4 v-for="beer in beers" :key="beer.id">
                    <beer-card :beer="beer" :favored="true" v-on:crush="iDontLikeThisBeerAnymooooooore"></beer-card>
                </v-flex>
            </v-layout>
            <v-layout column v-show="beers.length === 0">
                <v-flex>
                    <div class="display-4 text-xs-center meme-text">
                        Hey !
                    </div>
                </v-flex>
                <v-flex>
                     <div class="text-xs-center">
                       <img class="meme" src="../assets/frodo-love-beer-to.jpeg">
                    </div>
                </v-flex>
                <v-flex>
                    <div class="display-2 text-xs-center meme-text">
                         I'm sure you'll find a beer to your taste
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<style>
    .meme {
        width: 500px;
    }

    .meme-text {
        color: teal;
    }
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Beer } from '@/beers/Beer';
import { beerCrushesService } from '@/beers/BeerCrushesService';
import BeerCard from './BeerCard.vue';

@Component({
  components: {
    BeerCard,
  },
})
export default class Crushes extends Vue {
  
  private beers: Beer[] = [];

  public created() {
    this.beers = beerCrushesService.myBeers();
  }

  public iDontLikeThisBeerAnymooooooore(crush: boolean, beer: Beer): void {
      // Some smelly design here .........
      if (!crush) {
          beerCrushesService.pop(beer);
      }
  }
}
</script>