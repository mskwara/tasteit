<template>
    <div id="pop-alert" :style="display()">{{content}}</div>
</template>

<script>
import EventBus from "../../services/event-bus.js";

export default {
    name: "PopAlert",
    components: {},
    data() {
        return {
            displayed: false,
            content: null
        };
    },
    mounted() {
        EventBus.$on("show-pop-alert", ({ content }) => {
            this.content = content;
            this.displayed = true;
            setTimeout(() => {
                this.displayed = false;
            }, 3000);
        });
    },
    methods: {
        display() {
            if (!this.displayed)
                return "opacity: 0; height: 0 ; top: -300px ; transition: height 0ms 0.5s, opacity 0.5s 0ms, top 0ms 0.5s";
            return "opacity: 0.8 ; height: 40px ; top: 0 ; transition: height 0ms 0ms, opacity 0.5s 0ms, top 0ms 0s";
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#pop-alert {
    width: 400px;
    height: 40px;
    position: fixed;
    margin-top: 70px;
    transform: translate(-50%, 0);
    top: 0;
    left: 50%;
    background-color: rgb(48, 48, 48);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    opacity: 0.8;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin: 0;
    }
}
</style>