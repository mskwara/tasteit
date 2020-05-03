<template>
    <div id="stepper">
        <div class="title">
            <p style="font-size: 25pt">PRZEPIS</p>
            <divider />
        </div>
        <!-- DURING THE INSTRUCTIONS -->
        <div class="content" v-if="step < steps.length">
            <div class="top" v-if="started()">
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
            <div class="top">Review</div>
            <div class="bottom">
                <my-button text="Send a review" :click="sendReview" class="button" />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "../utils/Divider";
import MyButton from "../utils/MyButton";
import Step from "../utils/Step";
import Counter from "../utils/Counter";
import EventBus from "../../services/event-bus.js";

export default {
    name: "Stepper",
    components: { Divider, MyButton, Step, Counter },
    props: { steps: Array },
    data() {
        return {
            step: -1
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
        sendReview() {
            console.log("Not yet implemented!");
        }
    }
};
</script>

<style scoped lang="scss">
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
