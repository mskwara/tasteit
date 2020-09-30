<template>
    <div id="topbar" :class="sidebarStatus">
        <hamburger class="hamburger" />
        <logo class="logo" />
        <my-button
            class="logout"
            :text="btnText"
            type="empty"
            :click="login_logout"
        />
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
import Logo from "../utils/Logo";
import Hamburger from "../utils/Hamburger";
import { setRoute, clearUserData } from "../../services/methods";
import UserData from "../../services/user-data";
import EventBus from "../../services/event-bus";
const axios = require("axios");

export default {
    name: "TopBar",
    components: { MyButton, Logo, Hamburger },
    data() {
        return {
            btnText: UserData.id != null ? "Logout" : "Login",
            sidebarStatus: "sidebar-closed",
        };
    },
    mounted() {
        EventBus.$on("update-user-data", () => {
            if (UserData.id != null) {
                this.btnText = "Logout";
            } else {
                this.btnText = "Login";
            }
        });

        EventBus.$on("open-sidebar", () => {
            this.sidebarStatus = "sidebar-opened";
        });

        EventBus.$on("close-sidebar", () => {
            this.sidebarStatus = "sidebar-closed";
        });
    },
    methods: {
        setRoute,
        clearUserData,
        filterRecipes(filter) {
            if (this.$route.name != "recipes") {
                this.setRoute("recipes", filter);
            } else {
                EventBus.$emit("filter-recipes", filter);
            }
        },
        async login_logout() {
            if (this.btnText === "Login") {
                this.setRoute("login", {});
            } else {
                await axios.post("api/v1/users/logout");
                this.clearUserData(UserData);
                this.filterRecipes({});
                EventBus.$emit("update-user-data");
                EventBus.$emit("show-pop-alert", {
                    content: `You have been logged out!`,
                });
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#topbar {
    width: 100%;
    height: 70px;
    background-color: white;
    border-bottom: 1px solid $border-400;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    margin-left: 0;
    z-index: 5;

    &.sidebar-opened {
        width: 75%;
        margin-left: 0;
        transition: 1s;
    }
    &.sidebar-closed {
        width: 100%;
        margin-left: 0;
        transition: 1s;
    }
    .hamburger {
        margin-left: 30px;
        transition: 0.5s;
    }
    .logo {
        transform: translate(-75px, 0);
        position: absolute;
        left: 50%;
    }
}

@media only screen and (max-width: 1000px) {
    #topbar {
        &.sidebar-opened {
            width: 10%;
            .logo {
                display: none;
            }
            .logout {
                display: none;
            }
        }
    }
}
@media only screen and (max-width: 700px) {
    #topbar {
        .logo {
            display: none;
        }
        .logout {
            display: none;
        }
        &.sidebar-opened {
            .hamburger {
                margin-left: 5px;
            }
        }
    }
}
@media only screen and (max-width: 400px) {
    #topbar {
        &.sidebar-opened {
            .hamburger {
                margin-left: 0;
                scale: 0.5;
            }
        }
    }
}
</style>
