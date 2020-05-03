<template>
    <div>
        <spinner v-if="loading" />
        <div id="recipe" v-else>
            <p class="title">{{ recipe.name }}</p>
            <divider />
            <div class="content">
                <ingredients :ingredients="recipe.ingredients" :portion="recipe.portion" />
                <stepper :steps="recipe.steps" />
            </div>
        </div>
    </div>
</template>

<script>
import Ingredients from "./panels/Ingredients";
import Divider from "./utils/Divider";
import Stepper from "./panels/Stepper";
import Spinner from "./utils/Spinner";
const axios = require("axios");

export default {
    name: "App",
    components: { Ingredients, Divider, Stepper, Spinner },
    data() {
        return {
            recipe: {},
            loading: true
        };
    },
    async created() {
        try {
            const response = await axios.get(
                `recipes/${this.$route.params.id}`
            );
            this.recipe = response.data.data.recipe;
            this.loading = false;
            // console.log(this.recipe);
        } catch (error) {
            console.error(error);
        }
    }
};
</script>

<style scoped lang="scss">
#recipe {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    flex: 1;

    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    .content {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
}
</style>
