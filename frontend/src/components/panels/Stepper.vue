<template>
    <div id="stepper">
        <div class="title">
            <p style="font-size: 25pt; text-transform: uppercase">
                {{ $t("recipe") }}
            </p>
            <divider />
        </div>
        <!-- DURING THE INSTRUCTIONS -->
        <div class="content" v-if="!fullRecipe && step < steps.length">
            <div class="top" v-if="started()">
                <div class="header" v-if="steps[step].optional == true">
                    {{ $t("optionalStep") }}
                </div>
                <step
                    class="step"
                    :content="steps[step].before"
                    :header="$t('beforeStart') + '...'"
                    v-if="steps[step].before"
                />
                <step
                    class="step"
                    :content="steps[step].content"
                    :header="makeStepHeader()"
                />
                <counter :time="steps[step].time" v-if="steps[step].time" />
            </div>
            <div class="bottom">
                <span class="start-buttons" v-if="!started()">
                    <my-button text="Start" :click="start" class="button" />
                    <a @click="fullRecipe = true">{{ $t("viewFullRecipe") }}</a>
                </span>
                <my-button
                    :text="$t('previous')"
                    class="button"
                    :click="back"
                    v-if="started()"
                />
                <my-button
                    :text="step < steps.length - 1 ? $t('next') : $t('finish')"
                    :click="next"
                    class="button"
                    v-if="started()"
                />
            </div>
        </div>
        <div class="fullRecipe" v-if="fullRecipe">
            <a @click="fullRecipe = false">{{ $t("viewStepper") }}</a>
            <div
                class="step-container"
                v-for="(step, index) in steps"
                :key="step._id"
            >
                <div class="header" v-if="step.optional == true">
                    {{ $t("optionalStep") }}
                </div>
                <step
                    class="step"
                    :content="step.before"
                    :header="$t('beforeStart') + '...'"
                    v-if="step.before"
                />
                <step
                    class="step"
                    :content="step.content"
                    :header="fullRecipeStep(index)"
                />
                <counter :time="step.time" v-if="step.time" class="counter" />
            </div>
        </div>
        <!-- SENDING A REVIEW -->
        <div class="content" v-if="fullRecipe || step === steps.length">
            <div class="top review-top">
                <star-rating
                    class="rating"
                    v-model="review.rating"
                    :show-rating="false"
                    :star-size="30"
                    active-color="#fc9d03"
                ></star-rating>
                <my-text-area
                    :rows="5"
                    :cols="100"
                    :maxlen="600"
                    :field="$t('writeAReview')"
                    v-model="review.content"
                />
            </div>
            <div class="bottom sendingReview">
                <my-button
                    :text="$t('sendAReview')"
                    :click="sendReview"
                    class="button"
                    v-if="active"
                    :disabled="review.content == '' || review.rating == null"
                />
                <my-button
                    :text="$t('sendAReview')"
                    class="button"
                    :disabled="true"
                    v-else
                />
                <Spinner v-if="loadingReview" />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "../utils/Divider";
import MyButton from "../utils/MyButton";
import Step from "../utils/Step";
import Counter from "../utils/Counter";
import Spinner from "../utils/Spinner";
import MyTextArea from "../utils/MyTextArea";
import EventBus from "../../services/event-bus.js";
import UserData from "../../services/user-data.js";
import StarRating from "vue-star-rating";
const axios = require("axios");

export default {
    name: "Stepper",
    components: {
        Divider,
        MyButton,
        Step,
        Counter,
        MyTextArea,
        StarRating,
        Spinner,
    },
    props: {
        steps: {
            type: Array,
            default: () => [],
        },
        active: {
            type: Boolean,
            default: true,
        },
        recipeID: String,
    },
    data() {
        return {
            step: -1,
            review: {
                user: "",
                recipe: "",
                content: "",
                rating: null,
            },
            fullRecipe: false,
            loadingReview: false,
        };
    },
    methods: {
        start() {
            this.step = 0;
        },
        next() {
            this.step++;
            if (this.step >= 0 && this.step < this.steps.length) {
                EventBus.$emit("other-step", this.steps[this.step].time);
            }
        },
        back() {
            this.step--;
            if (this.step >= 0 && this.step < this.steps.length) {
                EventBus.$emit("other-step", this.steps[this.step].time);
            }
        },
        started() {
            return this.step >= 0 ? true : false;
        },
        makeStepHeader() {
            return `${this.$t("step")} ${this.step + 1}`;
        },
        fullRecipeStep(index) {
            return `${this.$t("step")} ${index + 1}`;
        },
        async sendReview() {
            if (!UserData.id) {
                EventBus.$emit("show-pop-alert", {
                    content: this.$t("alertContent7"),
                });
                return;
            }
            this.loadingReview = true;
            this.review.user = UserData.id;
            this.review.recipe = this.recipeID;
            await axios.post("api/v1/reviews", this.review, {
                withCredentials: true,
            });
            this.loadingReview = false;
            EventBus.$emit("show-pop-alert", {
                content: this.$t("alertContent8"),
            });
            this.review.user = "";
            this.review.recipe = "";
            this.review.content = "";
            this.review.rating = null;
            this.$emit("update-reviews");
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#stepper {
    flex: 1;
    height: auto;
    border: 1px solid rgb(202, 202, 202);
    background-color: white;
    // min-width: 500px;
    min-width: 300px;
    margin: 0 0 0 30px;
    display: flex;
    flex-direction: column;

    .title {
        padding: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;

        p {
            margin: 10px 3px;
            display: inline;
        }
    }
    .fullRecipe {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .header {
            width: 200px;
            height: 30px;
            border: 1px solid rgb(201, 201, 201);
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $primary-300;
            color: white;
            margin-bottom: 5px;
        }

        a {
            color: $primary-200;
            font-size: 10pt;
            cursor: pointer;
            align-self: flex-start;
            margin-bottom: 30px;
            margin-left: 40px;
        }

        .step-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .step {
                margin-bottom: 50px;
                margin-left: 10px;
                margin-right: 10px;
            }
        }
        .counter {
            width: 90%;
            margin-bottom: 50px;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 20px 10px 20px;
        flex: 1;

        .top {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            &.review-top {
                width: auto;
            }

            .step {
                margin-bottom: 50px;
            }

            .header {
                width: 200px;
                height: 30px;
                border: 1px solid rgb(201, 201, 201);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: $primary-300;
                color: white;
                margin-bottom: 30px;
            }

            .rating {
                align-self: baseline;
                margin-left: 10px;
                margin-bottom: 10px;
            }
        }

        .bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
            margin-top: 50px;

            &.sendingReview {
                flex-direction: column;
                align-items: center;
            }

            .start-buttons {
                display: flex;
                flex-direction: column;
                align-items: center;

                a {
                    color: $primary-200;
                    font-size: 10pt;
                    cursor: pointer;
                }
            }
        }
    }
    .item {
        align-self: flex-start;
        width: 90%;
        padding: 8px 10px;
        border-bottom: 1px solid rgb(236, 236, 236);

        &:last-child {
            border: 0;
        }
    }
}
</style>
