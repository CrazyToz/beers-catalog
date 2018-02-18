import Vue from 'vue';
import Router from 'vue-router';
import { RouteConfig, Route } from 'vue-router';
import Catalog from './beers/Catalog.vue';

Vue.use(Router);

export interface UIRoute {
  path: string;
  title: string;
  icon: string;
}

export const routes: UIRoute[] = [{
  path: '/',
  title: 'Catalog',
  icon: 'home',
}];

const routesConfig: RouteConfig[] = [{
  path: '/',
  name: 'catalog',
  component: Catalog,
}];

export let router = new Router({
  routes: routesConfig,
});
