<template>
    <div id="page" :style="display()">
        <div id="alert">
            <p class="title">{{ title }}</p>
            <divider />
            <p class="content">{{ content }}</p>
            <span>
                <my-button
                    :text="!onClickMethod ? $t('accept') : $t('cancel')"
                    :click="accept"
                />
                <my-button
                    :text="$t('accept')"
                    :click="onClickMethodWrap"
                    v-if="onClickMethod"
                />
            </span>
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
            content: null,
            onClickMethod: null,
        };
    },
    mounted() {
        EventBus.$on("show-alert", ({ title, content, onClickMethod }) => {
            if (onClickMethod) {
                this.onClickMethod = onClickMethod;
            } else {
                this.onClickMethod = null;
            }
            this.title = title;
            this.content = content;
            this.displayed = true;
        });
    },
    methods: {
        display() {
            if (!this.displayed)
                return "opacity: 0; height: 0 ; top: -200px ; transition: height 0ms 0.5s, opacity 0.5s 0ms, top 0ms 0.5s";
            return "opacity: 1 ; height: 100% ;top: 0 ; transition: height 0ms 0ms, opacity 0.5s 0ms, top 0ms 0s";
        },
        accept() {
            this.displayed = false;
        },
        onClickMethodWrap() {
            this.onClickMethod();
            this.accept();
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#page {
    width: 100%;
    height: 0;
    position: fixed;
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
        border: 1px solid $border-400;
        border-radius: 3px;
        width: 400px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 6;
        text-align: center;

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
        span {
            display: flex;
            justify-content: space-around;
        }
    }
}

@media only screen and (max-width: 430px) {
    #page #alert {
        width: 300px;
        height: auto;
        padding-bottom: 10px;
    }
}
</style>