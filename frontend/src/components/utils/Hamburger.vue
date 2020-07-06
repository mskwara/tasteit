<template>
    <div id="hamburger" @click="switchSidebar()">
        <div class="rec" />
        <div class="rec" />
        <div class="rec" />
    </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";

export default {
    name: "App",
    components: {},
    data() {
        return {
            sidebarOpened: false
        };
    },
    methods: {
        switchSidebar() {
            console.log("bla", this.sidebarOpened);

            if (!this.sidebarOpened) {
                EventBus.$emit("open-sidebar");
                this.sidebarOpened = true;
            } else {
                EventBus.$emit("close-sidebar");
                this.sidebarOpened = false;
            }
        }
    },
    mounted() {
        EventBus.$on("close-sidebar", () => {
            this.sidebarOpened = false;
        });
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#hamburger {
    cursor: pointer;
    .rec {
        width: 25px;
        height: 4px;
        background-color: $text-color;
        margin-bottom: 4px;
        border-radius: 2px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
