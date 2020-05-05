<template>
    <div id="app">
        <sidebar />
        <div :class="sidebarStatus">
            <top-bar />
            <router-view></router-view>
            <alert />
        </div>
    </div>
</template>

<script>
import Alert from "./components/utils/Alert";
import TopBar from "./components/panels/TopBar";
import Sidebar from "./components/panels/Sidebar";
import EventBus from "./services/event-bus.js";

export default {
    name: "App",
    components: { Alert, TopBar, Sidebar },
    data() {
        return {
            sidebarStatus: "sidebar-closed"
        };
    },
    mounted() {
        EventBus.$on("open-sidebar", () => {
            this.sidebarStatus = "sidebar-opened";
        });

        EventBus.$on("close-sidebar", () => {
            this.sidebarStatus = "sidebar-closed";
        });
    }
};
</script>

<style lang="scss">
@import "./styles/styles.scss";
#app {
    font-family: Calibri;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $text-color;

    .sidebar-closed {
        margin-left: 0;
        transition: 1s;
    }
    .sidebar-opened {
        margin-left: 25%;
        transition: 1s;
    }
}
body {
    background-color: rgba(236, 236, 236, 0.452);
    margin: 0;
}
</style>
