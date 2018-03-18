import Vue from 'vue';
import Router from 'vue-router';
import { RouteConfig, Route } from 'vue-router';
import Catalog from './beers/Catalog.vue';
import Crushes from './beers/Crushes.vue';
import Details from './beers/details/Details.vue';
import Summary from './beers/details/Summary.vue';
import Brewing from './beers/details/Brewing.vue';

Vue.use(Router);

export interface UIRoute {
  path: string;
  title: string;
  icon?: string;
}

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    component: Catalog,
  },
  {
    path: '/crushes',
    component: Crushes,
  },
  {
    path: '/details/:id',
    component: Details,
    children: [
      {
        path: '',
        name: 'summary',
        component: Summary,
      },
      {
        path: 'brewing',
        name: 'brewing',
        component: Brewing,
      },
    ],
  },
];

export let router = new Router({
  routes: routesConfig,
});
