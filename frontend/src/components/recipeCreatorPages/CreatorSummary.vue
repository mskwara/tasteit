<template>
    <div id="summary">
        <div class="information">
            <ingredients
                :ingredients="recipe.ingredients"
                :portion="recipe.portion"
            />
            <stepper class="stepper" :steps="recipe.steps" :active="false" />
        </div>
        <span>
            <my-button
                class="apply-button"
                :text="$t('publish')"
                style="width: 80%"
                :click="publish"
            />
            <Spinner v-if="loading" />
        </span>
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
import Spinner from "../utils/Spinner";
import Ingredients from "../panels/Ingredients";
import Stepper from "../panels/Stepper";
import {
    setRoute,
    validateIngredients,
    validateInfo,
} from "../../services/methods.js";
import EventBus from "../../services/event-bus.js";
import UserData from "../../services/user-data.js";
const axios = require("axios");

export default {
    name: "CreatorIngredients",
    components: {
        Ingredients,
        Stepper,
        MyButton,
        Spinner,
    },
    props: {
        recipe: Object,
    },
    data() {
        return {
            photo: null,
            loading: false,
        };
    },
    mounted() {
        EventBus.$on("recipe-photo-upload", (photo) => {
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
                    content: checkIngredients.error.content,
                });
                return;
            }
            const checkInfo = this.validateInfo(this.recipe);
            if (checkInfo.status === "fail") {
                EventBus.$emit("show-alert", {
                    title: checkInfo.error.title,
                    content: checkInfo.error.content,
                });
                return;
            }
            if (this.recipe.steps.length == 0) {
                EventBus.$emit("show-alert", {
                    title: this.$t("alertTitle5"),
                    content: this.$t("alertContent10"),
                });
                return;
            }
            try {
                this.loading = true;
                let formData = new FormData();
                formData.append("imageCover", this.photo);
                formData.append(
                    "name",
                    this.recipe.name.charAt(0).toUpperCase() +
                        this.recipe.name.slice(1)
                );
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

                await axios.post("api/v1/recipes", formData, {
                    withCredentials: true,
                });
                this.loading = false;

                EventBus.$emit("show-alert", {
                    title: this.$t("alertTitle6"),
                    content: this.$t("alertContent11"),
                });
                setTimeout(() => this.setRoute("recipes", {}), 1000);
            } catch (error) {
                this.loading = false;
                EventBus.$emit("show-alert", {
                    title: this.$t("alertTitle1"),
                    content: this.$t("alertContent12"),
                });
            }
            this.loading = false;
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#summary {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 20px;
    width: 100%;
    min-height: calc(100vh - 90px);
    // background-color: red;
    span {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        .apply-button {
            width: 60%;
            margin-top: 40px;
            align-self: center;
        }
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

@media only screen and (max-width: 870px) {
    #summary {
        .information {
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .stepper {
            margin-left: 0;
            margin-top: 20px;
            width: 100%;
        }

        .title {
            font-size: 30pt;
        }
    }
}
</style>