<template>
    <div id="specify-steps">
        <steps-viewport
            :steps="recipe.steps"
            :removeStep="removeStep"
            style="margin-top: 40px"
        />

        <div class="current-step">
            <p class="progress-title" style="margin-bottom: 0">
                {{ $t("stepper") }}
            </p>
            <span class="toggle-span">
                <p class="toggle-title">{{ $t("beforeStart") }}</p>
                <my-toggle v-model="stepPartsVisible.before" />
            </span>
            <my-text-area
                class="text-area"
                :rows="3"
                :cols="100"
                :maxlen="240"
                :field="$t('beforeStartInput') + '...'"
                :hint="$t('beforeStartHint')"
                v-model="step.before"
                v-if="stepPartsVisible.before"
            />
            <my-text-area
                class="text-area"
                :rows="5"
                :cols="100"
                :maxlen="240"
                :field="$t('writeInstruction') + '...'"
                v-model="step.content"
            />
            <span class="toggle-span">
                <p class="toggle-title">{{ $t("countdownTimer") }}</p>
                <my-toggle v-model="stepPartsVisible.time" />
            </span>
            <my-input
                type="text"
                :field="$t('durationTime')"
                style="margin-bottom: 20px"
                :hint="$t('countdownHint')"
                width="100%"
                :maxlen="5"
                v-model="step.time"
                v-if="stepPartsVisible.time"
            />
            <span class="toggle-span">
                <p class="toggle-title">{{ $t("isStepOptional") }}</p>
                <my-toggle v-model="step.optional" />
            </span>

            <my-button
                :text="$t('addStep')"
                style="width: 40%"
                :click="addStep"
                :disabled="step.content.length <= 5"
                class="small-button"
            />
            <my-button
                class="apply-button"
                :text="$t('summary')"
                :click="goToSummary"
                :disabled="recipe.steps.length == 0"
            />
        </div>
    </div>
</template>

<script>
import MyInput from "../utils/MyInput";
import MyButton from "../utils/MyButton";
import MyTextArea from "../utils/MyTextArea";
import StepsViewport from "../panels/StepsViewport";
import MyToggle from "../utils/MyToggle";
import EventBus from "../../services/event-bus.js";

export default {
    name: "CreatorIngredients",
    components: {
        MyTextArea,
        MyInput,
        MyButton,
        MyToggle,
        StepsViewport,
    },
    props: {
        recipe: Object,
    },
    data() {
        return {
            step: {
                before: "",
                content: "",
                time: null,
                optional: false,
            },
            stepPartsVisible: {
                before: false,
                time: false,
            },
        };
    },
    methods: {
        addStep() {
            if (
                this.step.time != null &&
                this.step.time.length > 0 &&
                /^\d+$/.test(this.step.time) === false
            ) {
                EventBus.$emit("show-alert", {
                    title: this.$t("alertTitle4"),
                    content: this.$t("alertContent9"),
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
        removeStep(step) {
            const index = this.recipe.steps.indexOf(step);
            this.recipe.steps.splice(index, 1);
        },
        goToSummary() {
            this.$emit("goToSummary");
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#specify-steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    min-height: calc(100vh - 70px);
    // border: 1px solid green;

    .apply-button {
        width: 100% !important;
        margin-top: 20px !important;
        align-self: center;
    }
    .small-button {
        min-width: 120px;
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

    .current-step {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 70%;
        margin-left: 10px;

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

@media only screen and (max-width: 680px) {
    #specify-steps {
        flex-direction: column;
        align-items: center;

        .current-step {
            margin: 0;
        }
    }
}
</style>