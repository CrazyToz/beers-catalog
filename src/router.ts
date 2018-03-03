import Vue from 'vue';
import Router from 'vue-router';
import { RouteConfig, Route } from 'vue-router';
import Catalog from './beers/Catalog.vue';
import Crushes from './beers/Crushes.vue';

Vue.use(Router);

export interface UIRoute {
  path: string;
  title: string;
  icon: string;
}

export const routes: UIRoute[] = [
  {
    path: '/',
    title: 'Catalog',
    icon: 'home',
  },
  {
    path: '/crushes',
    title: 'My crushes',
    icon: 'favorite',
  },
];

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    name: 'catalog',
    component: Catalog,
  },
  {
    path: '/crushes',
    name: 'crushes',
    component: Crushes,
  }
];

export let router = new Router({
  routes: routesConfig,
});
