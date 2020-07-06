<template>
    <div id="stepper">
        <div class="title">
            <p style="font-size: 25pt">RECIPE</p>
            <divider />
        </div>
        <!-- DURING THE INSTRUCTIONS -->
        <div class="content" v-if="step < steps.length">
            <div class="top" v-if="started()">
                <div class="header" v-if="steps[step].optional == true">Optional step</div>
                <step
                    class="step"
                    :content="steps[step].before"
                    header="Before you start..."
                    v-if="steps[step].before"
                />
                <step class="step" :content="steps[step].content" :header="makeStepHeader()" />
                <counter :time="steps[step].time" v-if="steps[step].time" />
            </div>
            <div class="bottom">
                <my-button text="Start" :click="start" class="button" v-if="!started()" />

                <my-button text="Previous" class="button" :click="back" v-if="started()" />
                <my-button text="Next" :click="next" class="button" v-if="started()" />
            </div>
        </div>
        <!-- SENDING A REVIEW -->
        <div class="content" v-else>
            <div class="top">
                <my-text-area
                    :rows="5"
                    :cols="100"
                    :maxlen="600"
                    field="Write a short review..."
                    v-model="review.content"
                />
            </div>
            <div class="bottom">
                <my-button text="Send a review" :click="sendReview" class="button" v-if="active" />
                <my-button text="Send a review" class="button" v-else />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "../utils/Divider";
import MyButton from "../utils/MyButton";
import Step from "../utils/Step";
import Counter from "../utils/Counter";
import MyTextArea from "../utils/MyTextArea";
import EventBus from "../../services/event-bus.js";
import UserData from "../../services/user-data.js";
const axios = require("axios");

export default {
    name: "Stepper",
    components: { Divider, MyButton, Step, Counter, MyTextArea },
    props: {
        steps: Array,
        active: {
            type: Boolean,
            default: true
        },
        recipeID: String
    },
    data() {
        return {
            step: -1,
            review: {
                user: "",
                recipe: "",
                content: "",
                rating: null
            }
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
            return `Step ${this.step + 1}`;
        },
        async sendReview() {
            this.review.user = UserData.id;
            this.review.recipe = this.recipeID;
            await axios.post("reviews", this.review);
            EventBus.$emit("show-alert", {
                title: "Excellent!",
                content: "Your review has been posted below this recipe!"
            });
            this.review.user = "";
            this.review.recipe = "";
            this.review.content = "";
            this.review.rating = null;
            this.$emit("update-reviews");
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#stepper {
    flex: 1;
    height: auto;
    border: 1px solid rgb(202, 202, 202);
    background-color: white;
    min-width: 500px;
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
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 20px 10px 20px;
        flex: 1;

        .top {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

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
        }

        .bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
            margin-top: 50px;
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
