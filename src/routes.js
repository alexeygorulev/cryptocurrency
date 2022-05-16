import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";

import HomePage from "@/components/pages/home.vue"
import AboutPage from "@/components/pages/about.vue"
import NotFoundPage from "@/components/pages/notFound.vue"

const routerHistory = createWebHistory();

const routers = createRouter({
  history: routerHistory ,
  routes: [
    {
      path: '/',
      name: "home",
      component: HomePage,
    },
    {
      path: '/about',
      name: "about",
      component: AboutPage,
    },
    {
      path: '/:CatchAll(.*)',
      name: "404",
      component: NotFoundPage,
    },
  ]
})

export default routers;
