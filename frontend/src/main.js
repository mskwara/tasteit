import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Recipes from "./components/Recipes.vue";
import Recipe from "./components/Recipe.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    { path: "/", component: Recipes, name: "recipes" },
    { path: "/recipe/:id", component: Recipe, name: "recipe", params: true }
];

const router = new VueRouter({
    routes
});

new Vue({
    render: h => h(App),
    router
}).$mount("#app");
