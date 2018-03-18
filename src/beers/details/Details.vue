<template>
  <div>
    <div>
      <v-tabs centered slider-color="teal">
        <v-tab v-if="beer !== null" :to="'/details/' + beer.id">
          Summary
        </v-tab>
        <v-tab v-if="beer !== null" :to="'/details/' + beer.id + '/brewing'">
          Brewing
        </v-tab>
      </v-tabs>  
    </div>
    <section class="mt-5">
      <v-scale-transition>
        <router-view></router-view>
      </v-scale-transition>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Beer } from "@/beers/Beer";
import { beerService, BeerRestError } from "@/beers/BeerRestService";
import { beerCrushesService } from "@/beers/BeerCrushesService";
import { UIRoute } from "../../router";
import store from "../../store";

@Component({
  beforeRouteEnter(to, from, next) {
    store.dispatch('checkoutBeerWhenNeeded', to.params.id).then(() => {
      next();
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (isDetailsChildViews(to.name, from.name) && from.params.id !== to.params.id) {
      store.commit('destroyBeer');
    }
    store.dispatch('checkoutBeerWhenNeeded', to.params.id).then(() => {
      next();
    });

    function isDetailsChildViews(toName: string | undefined, fromName: string | undefined): boolean {
      let detailsChilds: string[] = ['summary', 'brewing'];
      return detailsChilds.filter(childView => {
        return childView === toName || childView === fromName;
      }).length === 2;
    }
  },
  destroyed() {
    store.commit('destroyBeer');
  }
})
export default class Details extends Vue {

  public get beer(): Beer | null {
    return store.state.beer;
  }

}
</script>