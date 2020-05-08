<template>
    <div id="topbar">
        <hamburger class="hamburger" />
        <logo class="logo" />
        <my-button :text="btnText" type="empty" :click="login_logout" />
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
            btnText: "Login"
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
    },
    methods: {
        setRoute,
        clearUserData,
        async login_logout() {
            if (this.btnText === "Login") {
                this.setRoute("login", {});
            } else {
                await axios.post("/users/logout");
                this.clearUserData(UserData);
                EventBus.$emit("update-user-data");
            }
        }
    }
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

    .hamburger {
        margin-left: 30px;
    }
    .logo {
        transform: translate(-75px, 0);
        position: absolute;
        left: 50%;
    }
}
</style>
