<template>
    <div id="sidebar" :class="status">
        <div class="content" v-if="status=='opened'">
            <div class="user-info" v-if="user.id != null">
                <img class="avatar" :src="getAvatarPath()" />
                <p>{{user.name}} {{user.surname}}</p>
            </div>
            <div class="menu" v-if="user.id != null">
                <my-button class="button" text="Create a new recipe" type="full" />
                <div class="link">My recipes</div>
                <div class="link">Favourites</div>
                <div class="link">My profile</div>
                <div class="link" @click="logout()">Logout</div>
            </div>
            <div class="menu" style="margin-top: 20px" v-else>
                <my-button
                    class="button"
                    text="Sign up"
                    type="full"
                    :click="setRoute.bind(null, 'signup', {})"
                />
                <div class="link" @click="setRoute('recipes', {})">Recipes</div>
                <div class="link" @click="setRoute('login', {})">Login</div>
            </div>
            <div class="footer">
                <p>{{footer}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";
import UserData from "../../services/user-data.js";
import MyButton from "../utils/MyButton";
import { setRoute, clearUserData } from "../../services/methods";
const axios = require("axios");

export default {
    name: "App",
    components: { MyButton },
    data() {
        return {
            status: "closed",
            footer: "",
            user: {
                id: "",
                name: "",
                surname: "",
                avatar: ""
            }
        };
    },
    methods: {
        clearUserData,
        setRoute,
        getAvatarPath() {
            if (this.user.id != null) {
                return require("../../assets/" + this.user.avatar);
            }
        },
        async logout() {
            await axios.post("/users/logout");
            this.clearUserData(UserData);
            EventBus.$emit("update-user-data");
        }
    },
    mounted() {
        const date = new Date();
        if (date.getFullYear() == "2020") {
            this.footer = "© 2020 Michał Skwara";
        } else {
            this.footer = `© 2020 - ${date.getFullYear()} Michał Skwara`;
        }

        EventBus.$on("update-user-data", () => {
            if (UserData.id != null) {
                this.user.id = UserData.id;
                this.user.name = UserData.name;
                this.user.surname = UserData.surname;
                this.user.avatar = UserData.avatar;
            } else {
                this.user.id = null;
                this.user.name = "";
                this.user.surname = "";
                this.user.avatar = "";
            }
        });

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
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;

    .user-info {
        margin: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .avatar {
            width: 70px;
            height: 70px;
            border-radius: 35px;
        }
        p {
            color: white;
            font-size: 18pt;
            margin: 0 20px;
        }
    }

    .menu {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .button {
            margin: 0 0 10px 0;
        }
        .link {
            width: 100%;
            color: white;
            height: 60px;
            font-size: 16pt;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // text-transform: uppercase;

            transition: 0.5s;
            &:hover {
                background-color: $border-100;
                transition: 0.5s;
            }
        }
    }
    .footer {
        display: flex;
        flex-direction: column;

        justify-content: flex-end;
        align-items: center;
        position: absolute;
        width: 100%;
        bottom: 0;

        p {
            color: $border-200;
            font-size: 10pt;
            margin: 5px 0;
        }
    }

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