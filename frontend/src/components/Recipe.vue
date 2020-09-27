<template>
    <div class="page">
        <spinner v-if="loading" />
        <div id="recipe" v-else>
            <p class="title">{{ recipe.name }}</p>
            <divider />
            <div class="content">
                <ingredients
                    :ingredients="recipe.ingredients"
                    :portion="recipe.portion"
                />
                <stepper
                    :steps="recipe.steps"
                    :recipeID="recipe._id"
                    @update-reviews="getRecipe"
                />
            </div>
        </div>
        <div
            class="reviews"
            v-if="recipe.reviews != null && recipe.reviews.length > 0"
        >
            <p class="title">REVIEWS</p>
            <review
                v-for="review in recipe.reviews"
                :key="review._id"
                :review="review"
            />
        </div>
    </div>
</template>

<script>
import Ingredients from "./panels/Ingredients";
import Divider from "./utils/Divider";
import Stepper from "./panels/Stepper";
import Spinner from "./utils/Spinner";
import Review from "./panels/Review";
const axios = require("axios");

export default {
    name: "App",
    components: { Ingredients, Divider, Stepper, Spinner, Review },
    data() {
        return {
            recipe: {},
            loading: true,
        };
    },
    async created() {
        try {
            this.getRecipe();
            this.loading = false;
            // console.log(this.recipe);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async getRecipe() {
            const response = await axios.get(
                `api/v1/recipes/${this.$route.params.id}`
            );
            this.recipe = response.data.data.recipe;
        },
    },
};
</script>

<style scoped lang="scss">
.page {
    display: flex;
    flex-direction: column;
    #recipe {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        flex: 1;

        .content {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }
    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    .reviews {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }
}
</style>
