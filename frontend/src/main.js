import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Recipes from "./components/Recipes.vue";
import Recipe from "./components/Recipe.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    { path: "/", component: Recipes, name: "recipes" },
    { path: "/recipe/:id", component: Recipe, name: "recipe", params: true },
    { path: "/login", component: Login, name: "login" },
    { path: "/signup", component: Signup, name: "signup" }
];

const router = new VueRouter({
    routes
});

new Vue({
    render: h => h(App),
    router
}).$mount("#app");
