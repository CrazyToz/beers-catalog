<template>
  <div>
    <v-container v-if="beer !== null" fluid grid-list-md>
      <h1 class="headline mb-4">Methods</h1>
      <v-layout wrap :row="!$vuetify.breakpoint.xsOnly" :column="$vuetify.breakpoint.xsOnly">
        <v-flex xs12 md3>
          <v-card>
            <v-card-media :src="require('@/assets/mashing.jpg')" height="200px">
            </v-card-media>
            <v-card-text>
              <div class="headline">
                Mashing
              </div>
              <div class="text--secondary subheading">
                <span v-if="beer.methods.mashing.temperature != null">
                  At {{ beer.methods.mashing.temperature.value }} degree {{ beer.methods.mashing.temperature.unit }}
                </span>
                <span v-if="beer.methods.mashing.duration != null">
                  , during {{ beer.methods.mashing.duration }} minutes
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md3>
          <v-card>
            <v-card-media :src="require('@/assets/fermentation.jpg')" height="200px">
            </v-card-media>
            <v-card-text>
              <div class="headline">
                Fermentation
              </div>
              <div class="text--secondary subheading">
                <span v-if="beer.methods.fermentation.temperature != null">
                  At {{ beer.methods.fermentation.temperature.value }} degree {{ beer.methods.fermentation.temperature.unit }}
                </span>
                <span v-if="beer.methods.fermentation.duration != null">
                  , during {{ beer.methods.fermentation.duration }} minutes
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md3 offset-md1>
          <section class="elevation-24 pa-4 teal lighten-2 white--text">
            <h2 class="mb-3 mt-2">
              <v-icon class="mr-3">
                opacity
              </v-icon>
              Tips
            </h2>
            <p>{{ beer.brewingTips }}</p>
          </section>
        </v-flex>
      </v-layout>
      <h1 class="headline mt-5">Cereals</h1>
      <v-layout :row="!$vuetify.breakpoint.xsOnly" :column="$vuetify.breakpoint.xsOnly">
        <v-flex xs12 md4>
          <v-list two-line>
            <v-subheader>Malt</v-subheader>
            <v-list-tile v-for="(malt, index) in beer.ingredients.malt" :key="index">
              <v-list-tile-content>
                 <v-list-tile-title>{{ malt.name }}</v-list-tile-title>
                 <v-list-tile-sub-title>{{ malt.amount.value }} {{ malt.amount.unit }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs12 md4>
          <v-list two-line>
            <v-subheader>Hops</v-subheader>
            <v-list-tile v-for="(hops, index) in beer.ingredients.hops" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ hops.name }}
                  <span class="text--secondary">
                    ({{ hops.attribute }}, add at {{ hops.add }})
                  </span>
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ hops.amount.value }} {{ hops.amount.unit }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs12 md4>
          <v-subheader>Yeast</v-subheader>
          <v-list> 
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ beer.ingredients.yeast }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <section>
            <h1 class="headline mb-4 mt-4">Tips</h1>
              <p>
                {{ beer.brewingTips }}
              </p>
          </section>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Beer } from '@/beers/Beer';
import { beerService, BeerRestError } from '@/beers/BeerRestService';
import { beerCrushesService } from '@/beers/BeerCrushesService';
import store from '@/store';

@Component
export default class Ingredients extends Vue {

  public get beer() {
    return store.state.beer;
  }

}
</script>
