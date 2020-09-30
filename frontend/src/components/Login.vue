<template>
    <div id="login" v-on:keyup.enter="login()">
        <p class="title">Login</p>
        <divider />
        <div class="content">
            <my-input
                class="field"
                type="text"
                field="Email"
                width="80%"
                v-model="email"
            />
            <my-input
                class="field"
                type="password"
                field="Password"
                width="80%"
                v-model="password"
            />
            <a class="no-account" @click="setRoute('signup', {})"
                >I don't have an account</a
            >
            <my-button text="Login" :click="login" />
            <Spinner v-if="loading" />
        </div>
    </div>
</template>

<script>
import Divider from "./utils/Divider";
import MyInput from "./utils/MyInput";
import MyButton from "./utils/MyButton";
import Spinner from "./utils/Spinner";
import { setRoute } from "../services/methods.js";
import UserData from "../services/user-data.js";
import EventBus from "../services/event-bus.js";
const axios = require("axios");

export default {
    name: "Login",
    components: { Divider, MyInput, MyButton, Spinner },
    data() {
        return {
            email: "",
            password: "",
            loading: false,
        };
    },
    methods: {
        setRoute,
        async login() {
            try {
                this.loading = true;
                const response = await axios.post("api/v1/users/login", {
                    email: this.email,
                    password: this.password,
                });
                this.loading = false;
                const user = response.data.data.user;
                // this.clearInputs();

                UserData.id = user._id;
                UserData.name = user.name;
                UserData.surname = user.surname;
                UserData.email = user.email;
                UserData.avatar = user.avatar;
                UserData.favourites = user.favourites;
                EventBus.$emit("update-user-data");
                EventBus.$emit("show-pop-alert", {
                    content: `Nice to see you again, ${user.name}!`,
                });
                this.setRoute("recipes", {});
            } catch (error) {
                this.loading = false;
                if (error.response.status === 401) {
                    EventBus.$emit("show-alert", {
                        title: "Something went wrong...",
                        content: "Invalid email or password!",
                    });
                } else if (error.response.status === 400) {
                    EventBus.$emit("show-alert", {
                        title: "Something went wrong...",
                        content: "Please fill empty fields!",
                    });
                } else {
                    EventBus.$emit("show-alert", {
                        title: "Something went wrong...",
                        content:
                            "There is a problem with the server... Please try to login later!",
                    });
                }
            }
        },
        clearInputs() {
            this.email = "";
            this.password = "";
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/styles.scss";

#login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    .content {
        width: 100%;
        min-width: 200px;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;

        a {
            color: $primary-200;
            font-size: 10pt;
            cursor: pointer;
            margin-right: 10%;
            margin-bottom: 10px;
        }

        .field {
            margin-bottom: 20px;
        }
        .no-account {
            align-self: flex-end;
        }
    }
}
</style>
