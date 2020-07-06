<template>
    <div id="summary">
        <div class="information">
            <ingredients :ingredients="recipe.ingredients" :portion="recipe.portion" />
            <stepper :steps="recipe.steps" :active="false" />
        </div>
        <my-button
            class="apply-button"
            text="Publish my recipe"
            style="width: 80%"
            :click="publish"
        />
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
import Ingredients from "../panels/Ingredients";
import Stepper from "../panels/Stepper";
import {
    setRoute,
    validateIngredients,
    validateInfo
} from "../../services/methods.js";
import EventBus from "../../services/event-bus.js";
import UserData from "../../services/user-data.js";
const axios = require("axios");

export default {
    name: "CreatorIngredients",
    components: {
        Ingredients,
        Stepper,
        MyButton
    },
    props: {
        recipe: Object
    },
    data() {
        return {
            photo: null
        };
    },
    mounted() {
        EventBus.$on("recipe-photo-upload", photo => {
            this.photo = photo;
        });
    },
    methods: {
        setRoute,
        validateIngredients,
        validateInfo,
        async publish() {
            const checkIngredients = this.validateIngredients(this.recipe);
            if (checkIngredients.status === "fail") {
                EventBus.$emit("show-alert", {
                    title: checkIngredients.error.title,
                    content: checkIngredients.error.content
                });
                return;
            }
            const checkInfo = this.validateInfo(this.recipe);
            if (checkInfo.status === "fail") {
                EventBus.$emit("show-alert", {
                    title: checkInfo.error.title,
                    content: checkInfo.error.content
                });
                return;
            }
            if (this.recipe.steps.length == 0) {
                EventBus.$emit("show-alert", {
                    title: "Unspecified steps...",
                    content: "Please create steps to publish this recipe."
                });
                return;
            }
            try {
                let formData = new FormData();
                formData.append("imageCover", this.photo);
                formData.append("name", this.recipe.name);
                formData.append("preparationTime", this.recipe.preparationTime);
                formData.append("difficulty", this.recipe.difficulty);
                formData.append("portion", this.recipe.portion);
                formData.append(
                    "shortDescription",
                    this.recipe.shortDescription
                );
                formData.append(
                    "ingredients",
                    JSON.stringify(this.recipe.ingredients)
                );
                formData.append("steps", JSON.stringify(this.recipe.steps));
                formData.append("user", UserData.id);

                await axios.post("recipes", formData);

                EventBus.$emit("show-alert", {
                    title: "Success",
                    content: "Your recipe has been created!"
                });
                setTimeout(() => this.setRoute("recipes", {}), 1000);
            } catch (error) {
                EventBus.$emit("show-alert", {
                    title: "Something went wrong...",
                    content:
                        "There is a problem with the server... Please try again later!"
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#summary {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 20px;
    width: 100%;
    min-height: calc(100vh - 90px);
    // background-color: red;

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

    .information {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }
}
</style>