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
            />
        </div>
        <divider />
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
                <my-button
                    class="apply-button"
                    text="Apply the ingredients"
                    :click="applyIngredients"
                />
            </div>
        </div>
        <div id="specify-recipe-info">
            <div class="recipe-tile">
                <recipe-tile :recipe="recipe" :active="false" />
            </div>
            <div class="recipe-info">
                <p class="progress-title">Provide essential information</p>
                <my-text-area
                    :rows="5"
                    :cols="100"
                    :maxlen="240"
                    field="Write a short description..."
                    hint="It will be visible in the recipes list"
                    v-model="recipe.shortDescription"
                />
                <my-input
                    type="text"
                    style="margin-top: 40px"
                    field="Preparation time in minutes"
                    width="100%"
                    :maxlen="3"
                    v-model="recipe.preparationTime"
                />
                <my-select
                    style="margin-top: 30px"
                    :options="difficulties"
                    title="Select recipe's difficulty"
                    v-model="recipe.difficulty"
                />
                <my-button class="apply-button" text="Apply the description" :click="applyInfo" />
            </div>
        </div>
        <div id="specify-steps">
            <steps-viewport :steps="recipe.steps" style="margin-top: 40px;" />

            <div class="current-step">
                <p class="progress-title" style="margin-bottom: 0">Stepper</p>
                <span class="toggle-span">
                    <p class="toggle-title">Before you start</p>
                    <my-toggle v-model="stepPartsVisible.before" />
                </span>
                <my-text-area
                    class="text-area"
                    :rows="3"
                    :cols="100"
                    :maxlen="240"
                    field="Specify necessary preparations for this step..."
                    hint="Eg. Prepare two big bowls and connect a mixer to the power supply."
                    v-model="step.before"
                    v-if="stepPartsVisible.before"
                />
                <my-text-area
                    class="text-area"
                    :rows="5"
                    :cols="100"
                    :maxlen="240"
                    field="Write a instruction for this step..."
                    v-model="step.content"
                />
                <span class="toggle-span">
                    <p class="toggle-title">Countdown timer</p>
                    <my-toggle v-model="stepPartsVisible.time" />
                </span>
                <my-input
                    type="text"
                    field="Duration time in minutes"
                    style="margin-bottom: 20px"
                    hint="Specify if there is a break between current and next step(eg. baking in the oven)"
                    width="100%"
                    :maxlen="5"
                    v-model="step.time"
                    v-if="stepPartsVisible.time"
                />
                <span class="toggle-span">
                    <p class="toggle-title">Is this step optional?</p>
                    <my-toggle v-model="step.optional" />
                </span>

                <my-button
                    text="Add this step"
                    style="width: 40%"
                    :click="addStep"
                    :disabled="step.content.length <= 5"
                />
                <my-button
                    class="apply-button"
                    text="Summary"
                    style="width: 100% ; margin-top: 20px"
                    :click="goToSummary"
                    :disabled="recipe.steps.length == 0"
                />
            </div>
        </div>
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
    </div>
</template>

<script>
import Ingredients from "./panels/Ingredients";
import RecipeTile from "./panels/RecipeTile";
import StepsViewport from "./panels/StepsViewport";
import Stepper from "./panels/Stepper";
import Divider from "./utils/Divider";
import MyInput from "./utils/MyInput";
import MyTextArea from "./utils/MyTextArea";
import MySelect from "./utils/MySelect";
import MyButton from "./utils/MyButton";
import MyToggle from "./utils/MyToggle";
import EditableText from "./utils/EditableText";
import EventBus from "../services/event-bus.js";
import { setRoute } from "../services/methods.js";
const axios = require("axios");

export default {
    name: "App",
    components: {
        Ingredients,
        Divider,
        EditableText,
        MyInput,
        MyButton,
        MyTextArea,
        RecipeTile,
        MySelect,
        MyToggle,
        StepsViewport,
        Stepper
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
                images: []
            },
            ingredient: {
                name: "",
                optional: false
            },
            step: {
                before: "",
                content: "",
                time: null,
                optional: false
            },
            stepPartsVisible: {
                before: false,
                time: false
            },
            portions: "",
            progress: 0,
            difficulties: [
                {
                    text: "easy",
                    value: "easy"
                },
                {
                    text: "medium",
                    value: "medium"
                },
                {
                    text: "difficult",
                    value: "difficult"
                }
            ]
        };
    },
    methods: {
        setRoute,
        addIngredient() {
            this.recipe.ingredients.push({ ...this.ingredient });
            this.ingredient.name = "";
            this.ingredient.optional = false;
        },
        setPortions() {
            this.recipe.portion = this.portions;
            this.portions = "";
        },
        async publish() {
            if (this.validateIngredients() && this.validateInfo()) {
                if (this.recipe.steps.length == 0) {
                    EventBus.$emit("show-alert", {
                        title: "Unspecified steps...",
                        content: "Please create steps to publish this recipe."
                    });
                    return;
                }
                try {
                    await axios.post("recipes", this.recipe);
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
        },
        validateIngredients() {
            if (
                this.recipe.name.length == 0 ||
                this.recipe.name === "Untitled"
            ) {
                EventBus.$emit("show-alert", {
                    title: "Recipe is untitled...",
                    content: "Please provide recipe's title by clicking it."
                });
                return false;
            } else if (this.recipe.ingredients.length == 0) {
                EventBus.$emit("show-alert", {
                    title: "Empty ingredients list",
                    content: "Please add necessary ingredients."
                });
                return false;
            } else if (this.recipe.portion === "") {
                EventBus.$emit("show-alert", {
                    title: "Unspecified number of servings",
                    content: "Please set amount of portions."
                });
                return false;
            }
            return true;
        },
        validateInfo() {
            if (this.recipe.shortDescription.length == 0) {
                EventBus.$emit("show-alert", {
                    title: "The description is empty",
                    content: "Please provide recipe's description."
                });
                return false;
            } else if (
                this.recipe.preparationTime === null ||
                this.recipe.preparationTime.length == 0 ||
                /^\d+$/.test(this.recipe.preparationTime) === false
            ) {
                EventBus.$emit("show-alert", {
                    title: "Invalid preparation time",
                    content:
                        "Please specify preparation time as number of minutes."
                });
                return false;
            } else if (
                this.recipe.difficulty === "" ||
                this.recipe.difficulty === "none"
            ) {
                EventBus.$emit("show-alert", {
                    title: "Unspecified recipe's difficulty",
                    content: "Please select recipe's difficulty."
                });
                return false;
            }
            return true;
        },
        addStep() {
            if (
                this.step.time != null &&
                this.step.time.length > 0 &&
                /^\d+$/.test(this.step.time) === false
            ) {
                EventBus.$emit("show-alert", {
                    title: "Invalid duration time",
                    content:
                        "Please specify duration time as number of minutes."
                });
                return;
            }
            this.step.time = this.step.time * 60;
            this.recipe.steps.push({ ...this.step });
            this.step.before = "";
            this.step.content = "";
            this.step.time = null;
            this.step.optional = false;
            this.stepPartsVisible.before = false;
            this.stepPartsVisible.time = false;
        },
        applyIngredients() {
            if (!this.validateIngredients()) return;
            this.progress = 1;
            document
                .getElementById("specify-recipe-info")
                .scrollIntoView({ behavior: "smooth", block: "end" });
        },
        applyInfo() {
            if (!this.validateInfo()) return;

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
    .specify-ingredients {
        display: flex;
        justify-content: center;
        align-items: baseline;
        width: 100%;
        min-height: calc(100vh - 70px - 140px);
        // border: 1px solid red;

        .ingredients-creator {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex: 1;
            margin-left: 40px;

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
    #specify-recipe-info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 70px);
        // border: 1px solid blue;

        .recipe-info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 70%;
            margin-left: 20px;
        }
    }
    #specify-steps {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        min-height: calc(100vh - 70px);
        // border: 1px solid green;

        .current-step {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 70%;

            .toggle-span {
                align-self: flex-start;
                margin-bottom: 20px;
            }
            .text-area {
                margin-bottom: 20px;
            }

            span {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    #summary {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        min-height: calc(100vh - 70px);

        .information {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
        }
    }
}
</style>
