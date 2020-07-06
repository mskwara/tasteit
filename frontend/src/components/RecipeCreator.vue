<template>
    <div id="recipecreator">
        <div class="title">
            <editable-text
                v-model="recipe.name"
                :value="recipe.name"
                :maxlen="45"
                textstyle="font-size: 40pt ; text-transform: uppercase ; margin: 0 0 20px 0"
                inputstyle="margin-bottom: 25px"
                reference="recipe_title"
                :selectOnClick="true"
            />
        </div>
        <divider />
        <creator-ingredients :recipe="recipe" @applyIngredients="applyIngredients" />
        <creator-info :recipe="recipe" @applyInfo="applyInfo" />
        <creator-steps :recipe="recipe" @goToSummary="goToSummary" />
        <creator-summary :recipe="recipe" />
    </div>
</template>

<script>
import CreatorIngredients from "./recipeCreatorPages/CreatorIngredients";
import CreatorInfo from "./recipeCreatorPages/CreatorInfo";
import CreatorSteps from "./recipeCreatorPages/CreatorSteps";
import CreatorSummary from "./recipeCreatorPages/CreatorSummary";
import Divider from "./utils/Divider";
import EditableText from "./utils/EditableText";

// import noScrollMixin from "./mixins/noScrollMixin";

export default {
    name: "App",
    // mixins: [noScrollMixin],
    components: {
        CreatorIngredients,
        CreatorInfo,
        CreatorSteps,
        CreatorSummary,

        Divider,
        EditableText
    },
    data() {
        return {
            recipe: {
                name: "Untitled",
                preparationTime: null,
                difficulty: "",
                shortDescription: "",
                ingredients: [],
                steps: [],
                portion: "",
                images: [],
                imageCover: null
            },
            progress: 0
        };
    },
    methods: {
        applyIngredients() {
            this.progress = 1;
            document
                .getElementById("specify-recipe-info")
                .scrollIntoView({ behavior: "smooth", block: "end" });
        },
        applyInfo() {
            this.progress = 2;
            document
                .getElementById("specify-steps")
                .scrollIntoView({ behavior: "smooth", block: "end" });
        },
        goToSummary() {
            this.progress = 3;
            document
                .getElementById("summary")
                .scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }
};
</script>

<style scoped lang="scss">
@import "../styles/styles.scss";

#recipecreator {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    flex: 1;

    .apply-button {
        width: 60%;
        margin-top: 40px;
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

    .title {
        width: 100%;
        display: flex;
        justify-content: center;
        min-height: 80px;
        height: 80px;
        p {
            font-size: 40pt;
            margin: 0;
            text-transform: uppercase;
            margin-bottom: 20px;
        }
        .title-input {
            margin-bottom: 25px;
        }
    }
}
</style>
