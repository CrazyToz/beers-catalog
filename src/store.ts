import Vue from 'vue';
import Vuex from 'vuex';
import { beerService, BeerRestError } from '@/beers/BeerRestService';
import { Beer } from '@/beers/Beer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      beer : null as Beer | null,
  },
  mutations: {
    setBeer(state, beer: Beer): void {
      state.beer = beer;
    },
    destroyBeer(state): void {
      state.beer = null;
    },
  },
  getters: {
    isBeer(state): boolean {
      return state.beer !== null;
    },
  },
  actions: {
    checkoutBeerWhenNeeded({ state, dispatch }, id: string) {
      if (state.beer === null) {
        return dispatch('checkoutBeer', id);
      } else {
        if (state.beer.id !== parseInt(id, 10)) {
          return dispatch('checkoutBeer', id);
        } else {
          return Promise.resolve();
        }
      }
    },
    checkoutBeer(context, id: string) {
      beerService.findBeer(id).then(
        (response: Beer) => {
         context.commit('setBeer', response);
         Promise.resolve();
        },
        (response: BeerRestError) => {
          Promise.reject(response);
        },
      );
    },
  },
});
