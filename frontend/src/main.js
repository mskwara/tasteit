import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Recipes from "./components/Recipes.vue";
import RecipeCreator from "./components/RecipeCreator.vue";
import Recipe from "./components/Recipe.vue";
import Profile from "./components/Profile.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        { path: "/", component: Recipes, name: "recipes" },
        {
            path: "/recipe/creator",
            component: RecipeCreator,
            name: "recipecreator"
        },
        {
            path: "/recipe/:id",
            component: Recipe,
            name: "recipe",
            params: true
        },
        {
            path: "/profile",
            component: Profile,
            name: "profile"
        },
        { path: "/login", component: Login, name: "login" },
        { path: "/signup", component: Signup, name: "signup" }
    ],
    scrollBehavior() {
        window.scrollTo(0, -30);
    }
});

new Vue({
    render: h => h(App),
    router
}).$mount("#app");
