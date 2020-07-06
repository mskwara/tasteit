<template>
    <div>
        <spinner v-if="loading" />
        <div id="recipes">
            <p v-if="recipes.length == 0">There is no recipe yet!</p>
            <recipe-tile :key="recipe._id" v-for="recipe in recipes" :recipe="recipe" />
        </div>
    </div>
</template>

<script>
import RecipeTile from "./panels/RecipeTile";
import Spinner from "./utils/Spinner";
const axios = require("axios");

export default {
    name: "Recipes",
    components: {
        RecipeTile,
        Spinner
    },
    data() {
        return {
            recipes: Array,
            loading: true
        };
    },
    async mounted() {
        try {
            const response = await axios.get("recipes");
            // console.log(response);
            this.recipes = response.data.data.recipes;
            this.loading = false;
            console.log(this.recipes);
        } catch (error) {
            console.error(error);
        }
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
}
</style>
