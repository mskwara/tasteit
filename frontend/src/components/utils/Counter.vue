<template>
    <div id="counter">
        <my-button text="Countdown" :click="start" :disabled="started" />
        <div class="outside">
            <div class="whitebg" :style="getProgress()" />
            <div class="blackbg" :style="getProgress()" />
            <div class="progress-bar" :style="getProgress()" />
            <div class="timer">{{formatSecToTime(remaining)}}</div>
        </div>
    </div>
</template>

<script>
import MyButton from "./MyButton";
import EventBus from "../../services/event-bus.js";
import { formatSecToTime } from "../../services/methods";

export default {
    name: "App",
    props: { time: Number },
    components: { MyButton },
    data() {
        return {
            remaining: this.time,
            started: false,
            interval: null
        };
    },
    destroyed() {
        clearInterval(this.interval);
    },
    mounted() {
        EventBus.$on("other-step", time => {
            this.remaining = time;
            this.started = false;
            clearInterval(this.interval);
        });
    },
    methods: {
        formatSecToTime,
        start() {
            this.started = true;
            this.interval = setInterval(() => {
                this.remaining--;
                if (this.remaining == 0) {
                    clearInterval(this.interval);
                    EventBus.$emit("show-alert", {
                        title: "Step finished",
                        content: `${this.formatSecToTime(
                            this.time
                        )} have passed. You can go ahead to the next step.`
                    });
                }
            }, 1000);
        },
        getProgress() {
            const percent = 100 - (this.remaining / this.time) * 100;

            return `width: ${percent}%`;
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#counter {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .outside {
        flex: 1;
        height: 20px;
        border: 1px solid rgb(231, 231, 231);
        margin: 0 20px;
    }
    .progress-bar {
        background-color: $primary-400;
        height: 20px;
        transition: width 1s;
        mix-blend-mode: screen;
        z-index: 4;
        position: relative;
        top: -40px;
    }
    .whitebg {
        position: relative;
        background: white;
        z-index: 1;
        height: 20px;
        transition: width 1s;
    }

    .blackbg {
        position: relative;
        top: -20px;
        background: black;
        z-index: 2;
        height: 20px;
        transition: width 1s;
    }
    .timer {
        position: relative;
        left: 45%;
        top: -60px;
        z-index: 3;
        color: white;
        mix-blend-mode: difference;
    }
}
</style>
