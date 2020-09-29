<template>
    <!-- <div> -->
    <div id="app">
        <Spinner v-if="loading" />
        <div v-else>
            <sidebar />
            <div :class="sidebarStatus">
                <top-bar />
                <router-view :key="$route.fullPath" />
                <alert />
                <pop-alert />
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import Alert from "./components/utils/Alert";
import PopAlert from "./components/utils/PopAlert";
import Spinner from "./components/utils/Spinner";
import TopBar from "./components/panels/TopBar";
import Sidebar from "./components/panels/Sidebar";
import EventBus from "./services/event-bus.js";
import UserData from "./services/user-data.js";
const axios = require("axios");

export default {
    name: "App",
    components: { Alert, TopBar, Sidebar, PopAlert, Spinner },
    data() {
        return {
            sidebarStatus: "sidebar-closed",
            UserData,
            loading: true,
        };
    },

    async mounted() {
        const response = await axios.get("api/v1/users/isloggedin");

        const user = response.data.data.user;
        if (user != null) {
            UserData.id = user._id;
            UserData.name = user.name;
            UserData.email = user.email;
            UserData.surname = user.surname;
            UserData.avatar = user.avatar;
            UserData.favourites = user.favourites;
            EventBus.$emit("show-pop-alert", {
                content: `Nice to see you again, ${user.name}!`,
            });
        } else {
            UserData.id = null;
        }
        this.loading = false;
        EventBus.$emit("update-user-data");
        // document.getElementById("everything").style.display = "initial";

        EventBus.$on("open-sidebar", () => {
            this.sidebarStatus = "sidebar-opened";
        });

        EventBus.$on("close-sidebar", () => {
            this.sidebarStatus = "sidebar-closed";
        });
    },
};
</script>

<style lang="scss">
@import "./styles/styles.scss";
#app {
    font-family: Calibri;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $text-color;
    margin-top: 90px;

    #everything {
        display: none;
    }

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

    &.no-scroll {
        overflow: hidden;
    }
}

@media only screen and (max-width: 1000px) {
    #app .sidebar-opened {
        margin-left: 90%;
    }
}
</style>
