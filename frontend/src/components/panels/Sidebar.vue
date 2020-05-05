<template>
    <div id="sidebar" :class="status"></div>
</template>

<script>
import EventBus from "../../services/event-bus.js";

export default {
    name: "App",
    components: {},
    data() {
        return {
            status: "closed"
        };
    },
    mounted() {
        EventBus.$on("open-sidebar", () => {
            this.status = "opened";
        });

        EventBus.$on("close-sidebar", () => {
            this.status = "closed";
        });
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#sidebar {
    background-color: $sidebar;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;

    z-index: 3;

    &.closed {
        width: 0;
        height: 100%;
        opacity: 0;
        transition: 1s;
    }
    &.opened {
        width: 25%;
        height: 100%;
        opacity: 1;
        transition: opacity 1s, width 1s;
    }
}
</style>
