<template>
    <div>
        <spinner v-if="loading" />
        <div id="recipes">
            <p class="title">{{title}}</p>
            <divider />
            <p v-if="recipes.length == 0">There is no recipe yet!</p>
            <recipe-tile
                :key="recipe._id"
                v-for="recipe in recipes"
                :recipe="recipe"
                :showFavourite="isLoggedIn"
            />
        </div>
    </div>
</template>

<script>
import RecipeTile from "./panels/RecipeTile";
import Spinner from "./utils/Spinner";
import Divider from "./utils/Divider";
import EventBus from "../services/event-bus.js";
import UserData from "../services/user-data.js";
const axios = require("axios");

export default {
    name: "Recipes",
    components: {
        RecipeTile,
        Spinner,
        Divider
    },
    data() {
        return {
            recipes: Array,
            loading: true,
            isLoggedIn: null,
            title: "Recipes"
        };
    },
    async mounted() {
        try {
            let response;
            if (this.$route.params.userId == null) {
                response = await axios.get("recipes");
            } else {
                response = await axios.get(
                    `recipes/user/${this.$route.params.userId}`
                );
            }
            this.recipes = response.data.data.recipes;
            this.loading = false;
            if (UserData.id == null) {
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = true;
            }
        } catch (error) {
            console.error(error);
        }

        EventBus.$on("filter-recipes", async filter => {
            this.loading = true;
            let response;
            if (filter.type === "byUser") {
                // filter by userId
                response = await axios.get(`recipes/user/${filter.userId}`);
                this.recipes = response.data.data.recipes;
                this.title =
                    response.data.user.name +
                    " " +
                    response.data.user.surname +
                    "'s recipes";
            } else if (filter.type === "byFavourites") {
                // filter by favourites
                response = await axios.get(
                    `recipes/favourites/user/${filter.userId}`
                );
                this.recipes = response.data.data.recipes;
                this.title = "Favourites";
            } else {
                // default recipes without a filter
                response = await axios.get(`recipes`);
                this.recipes = response.data.data.recipes;
                this.title = "Recipes";
            }
            this.loading = false;
        });

        EventBus.$on("update-user-data", () => {
            if (UserData.id == null) {
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = true;
            }
        });
    }
};
</script>

<style scoped lang="scss">
#recipes {
    text-align: center;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
        width: 100%;
    }
}
</style>
