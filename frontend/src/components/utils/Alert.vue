<template>
    <div id="page" :style="display()">
        <div id="alert">
            <p class="title">{{title}}</p>
            <divider />
            <p class="content">{{content}}</p>
            <my-button text="Accept" :click="accept" />
        </div>
    </div>
</template>

<script>
import Divider from "../utils/Divider";
import MyButton from "../utils/MyButton";
import EventBus from "../../services/event-bus.js";

export default {
    name: "App",
    components: { Divider, MyButton },
    data() {
        return {
            displayed: false,
            title: null,
            content: null
        };
    },
    mounted() {
        EventBus.$on("show-alert", ({ title, content }) => {
            this.title = title;
            this.content = content;
            this.displayed = true;
        });
    },
    methods: {
        display() {
            if (!this.displayed)
                return "opacity: 0; height: 0 ; transition: height 0ms 1s, opacity 1s 0ms";
            return "opacity: 1 ; height: 100% ; transition: height 0ms 0ms, opacity 1s 0ms";
        },
        accept() {
            this.displayed = false;
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#page {
    width: 100%;
    height: 0;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.205);
    display: block;
    opacity: 0;
    z-index: 5;

    #alert {
        transform: translate(-50%, -50%);
        position: relative;
        left: 50%;
        top: 50%;
        background-color: white;
        border: 1px solid $border-100;
        border-radius: 2px;
        width: 400px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 6;

        .title {
            font-size: 20pt;
            margin: 10px;
        }
        .content {
            font-size: 14pt;
            word-wrap: break-word;
            max-width: 350px;
            margin: 10px;
        }
    }
}
</style>