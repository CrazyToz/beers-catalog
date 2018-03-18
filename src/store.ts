import Vue from 'vue';
import Vuex from 'vuex';
import { beerService, BeerRestError } from '@/beers/BeerRestService';
import { Beer } from '@/beers/Beer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      beer : null as Beer | null,
      beers: [] as Beer[],
  },
  mutations: {
    setBeer(state, beer: Beer): void {
      state.beer = beer;
    },
    destroyBeer(state): void {
      state.beer = null;
    },
    setBeers(state, beers: Beer[]): void {
      state.beers = beers;
    },
    destroyBeers(state) {
      state.beers = [];
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
    checkoutBeersWhenNeeded({state, dispatch}): PromiseLike<void> {
      if (state.beers.length > 0) {
        return Promise.resolve();
      } else {
        return dispatch('checkoutBeers');
      }
    },
    checkoutBeers({commit, state}): PromiseLike<void> {
      return beerService.findBeers(1)
        .then((response: Beer[]) => {
          commit('setBeers', state.beers.concat(response));
          return beerService.findBeers(2);
        })
        .then((response: Beer[]) => {
          commit('setBeers', state.beers.concat(response));
          return beerService.findBeers(3);
        })
        .then((response: Beer[]) => {
          commit('setBeers', state.beers.concat(response));
          Promise.resolve();
        });
    },
  },
});
