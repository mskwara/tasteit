<template>
    <div>
        <spinner v-if="loading" />
        <div id="recipes">
            <p class="title">{{ title }}</p>
            <divider />
            <p v-if="recipes.length == 0">There is no recipe yet!</p>
            <div class="recipes">
                <recipe-tile
                    :key="recipe._id"
                    v-for="recipe in recipes"
                    :recipe="recipe"
                    :showFavourite="isLoggedIn"
                />
            </div>
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
        Divider,
    },
    data() {
        return {
            recipes: Array,
            loading: true,
            isLoggedIn: null,
            title: "Recipes",
        };
    },
    async mounted() {
        try {
            let response;
            if (this.$route.params.userId == null) {
                response = await axios.get("api/v1/recipes");
            } else {
                response = await axios.get(
                    `api/v1/recipes/user/${this.$route.params.userId}`
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

        EventBus.$on("filter-recipes", async (filter) => {
            this.loading = true;
            let response;
            if (filter.type === "byUser") {
                // filter by userId
                response = await axios.get(
                    `api/v1/recipes/user/${filter.userId}`
                );
                this.recipes = response.data.data.recipes;
                this.title =
                    response.data.user.name +
                    " " +
                    response.data.user.surname +
                    "'s recipes";
            } else if (filter.type === "byFavourites") {
                // filter by favourites
                response = await axios.get(
                    `api/v1/recipes/favourites/user/${filter.userId}`
                );
                this.recipes = response.data.data.recipes;
                this.title = "Favourites";
            } else {
                // default recipes without a filter
                response = await axios.get(`api/v1/recipes`);
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
    },
};
</script>

<style scoped lang="scss">
#recipes {
    text-align: center;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .recipes {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
        width: 100%;
    }
}

@media only screen and (max-width: 410px) {
    #recipes {
        .title {
            font-size: 30pt;
        }
    }
}

@media only screen and (max-width: 320px) {
    #recipes {
        .title {
            font-size: 20pt;
        }
    }
}
</style>
