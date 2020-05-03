<template>
    <div id="recipes">
        <recipe-tile
            :key="recipe._id"
            v-for="recipe in recipes"
            :recipe="recipe"
        />
    </div>
</template>

<script>
import RecipeTile from "./panels/RecipeTile";
const axios = require("axios");

export default {
    name: "Recipes",
    components: {
        RecipeTile
    },
    data() {
        return {
            recipes: Array
        };
    },
    async mounted() {
        try {
            const response = await axios.get("recipes");
            // console.log(response);
            this.recipes = response.data.data.recipes;
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

    .box {
        background-color: red;
    }
}
</style>
