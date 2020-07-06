<template>
    <div class="specify-ingredients">
        <ingredients :ingredients="recipe.ingredients" :portion="recipe.portion" />
        <div class="ingredients-creator">
            <p class="progress-title">Specify the ingredients</p>
            <span>
                <my-input
                    type="text"
                    field="Ingredient"
                    hint="Point out the ingredient and amount"
                    width="80%"
                    v-model="ingredient.name"
                />
                <span class="toggle-span">
                    <p class="toggle-title">Optional</p>
                    <my-toggle v-model="ingredient.optional" :value="ingredient.optional" />
                </span>
                <my-button
                    text="Add"
                    style="width: 30%"
                    :click="addIngredient"
                    :disabled="ingredient.name == ''"
                />
            </span>
            <span>
                <my-input
                    style="margin-right: 40px"
                    type="text"
                    field="Number of servings"
                    hint="Eg. for 2 people / 5 pieces / 2 liters of juice"
                    width="80%"
                    v-model="portions"
                />
                <my-button
                    text="Set"
                    style="width: 30%"
                    :click="setPortions"
                    :disabled="portions == ''"
                />
            </span>
            <my-button class="apply-button" text="Apply the ingredients" :click="applyIngredients" />
        </div>
    </div>
</template>

<script>
import Ingredients from "../panels/Ingredients";
import MyInput from "../utils/MyInput";
import MyButton from "../utils/MyButton";
import MyToggle from "../utils/MyToggle";
import EventBus from "../../services/event-bus.js";
import { validateIngredients } from "../../services/methods.js";

export default {
    name: "CreatorIngredients",
    components: {
        Ingredients,
        MyInput,
        MyButton,
        MyToggle
    },
    props: {
        recipe: Object
    },
    data() {
        return {
            ingredient: {
                name: "",
                optional: false
            },
            portions: ""
        };
    },
    methods: {
        validateIngredients,
        addIngredient() {
            this.recipe.ingredients.push({ ...this.ingredient });
            this.ingredient.name = "";
            this.ingredient.optional = false;
        },
        setPortions() {
            this.recipe.portion = this.portions;
            this.portions = "";
        },

        applyIngredients() {
            const checkIngredients = this.validateIngredients(this.recipe);
            if (checkIngredients.status === "fail") {
                EventBus.$emit("show-alert", {
                    title: checkIngredients.error.title,
                    content: checkIngredients.error.content
                });
                return;
            }
            this.$emit("applyIngredients");
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

.specify-ingredients {
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 100%;
    min-height: calc(100vh - 70px - 140px);
    // border: 1px solid red;

    .apply-button {
        width: 60% !important;
        margin-top: 40px !important;
        align-self: center;
    }
    .progress-title {
        font-size: 23pt;
        text-transform: uppercase;
        margin: 20px 0;
    }

    .toggle-title {
        font-size: 14pt;
        text-transform: uppercase;
        margin: 0 10px;
    }

    .ingredients-creator {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex: 1;
        margin-left: 40px;
        // border: 1px solid red;

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
            width: 100%;

            .toggle-span {
                align-self: center;
                margin: 0 30px;
                width: auto;
            }
        }
    }
}
</style>