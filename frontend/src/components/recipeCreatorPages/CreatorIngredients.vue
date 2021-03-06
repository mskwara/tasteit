<template>
    <div class="specify-ingredients">
        <ingredients
            :ingredients="recipe.ingredients"
            :portion="recipe.portion"
            :removeIngredient="removeIngredient"
        />
        <div class="ingredients-creator">
            <p class="progress-title">{{ $t("specifyIngredients") }}</p>
            <span>
                <my-input
                    type="text"
                    :field="$t('ingredient')"
                    :hint="$t('ingredientHint')"
                    width="80%"
                    v-model="ingredient.name"
                />
                <span class="toggle-span">
                    <p class="toggle-title">{{ $t("optional") }}</p>
                    <my-toggle
                        v-model="ingredient.optional"
                        :value="ingredient.optional"
                    />
                </span>
                <my-button
                    class="small-button"
                    :text="$t('add')"
                    style="width: 30%"
                    :click="addIngredient"
                    :disabled="ingredient.name == ''"
                />
            </span>
            <span class="servings">
                <my-input
                    style="margin-right: 40px"
                    type="text"
                    :field="$t('numberOfServings')"
                    :hint="$t('servingHint')"
                    width="80%"
                    v-model="portions"
                />
                <my-button
                    :text="$t('set')"
                    style="width: 30%"
                    :click="setPortions"
                    :disabled="portions == ''"
                    class="small-button"
                />
            </span>
            <my-button
                class="apply-button"
                :text="$t('applyIngredients')"
                :click="applyIngredients"
            />
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
        MyToggle,
    },
    props: {
        recipe: Object,
    },
    data() {
        return {
            ingredient: {
                name: "",
                optional: false,
            },
            portions: "",
        };
    },
    methods: {
        validateIngredients,
        addIngredient() {
            this.recipe.ingredients.push({ ...this.ingredient });
            this.ingredient.name = "";
            this.ingredient.optional = false;
        },
        removeIngredient(ingredient) {
            const index = this.recipe.ingredients.indexOf(ingredient);
            this.recipe.ingredients.splice(index, 1);
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
                    content: checkIngredients.error.content,
                });
                return;
            }
            this.$emit("applyIngredients");
        },
    },
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
        min-width: 200px;
    }
    .small-button {
        min-width: 60px;
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

        .servings {
            min-width: 280px;
        }

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

@media only screen and (max-width: 900px) {
    .specify-ingredients {
        flex-direction: column;
        align-items: center;

        .ingredients-creator {
            width: 100%;
        }

        .ingredients-creator {
            .progress-title {
                font-size: 16pt;
            }
            span {
                .toggle-span {
                    flex-direction: column;
                    margin: 0 10px;
                }
            }
        }
    }
}
</style>