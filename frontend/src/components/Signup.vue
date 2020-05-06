<template>
    <div id="login">
        <p class="title">Sign up</p>
        <divider />
        <div class="content">
            <my-input type="text" class="field" field="Name" width="80%" v-model="name" />
            <my-input type="text" class="field" field="Surname" width="80%" v-model="surname" />
            <my-input type="text" class="field" field="Email" width="80%" v-model="email" />
            <my-input
                type="password"
                class="field"
                field="Password"
                width="80%"
                v-model="password"
            />
            <my-input
                type="password"
                class="field"
                field="Confirm your password"
                width="80%"
                v-model="passwordConfirm"
            />
            <a class="no-account" @click="setRoute('login', {})">I have an account already</a>
            <my-button text="Sign up" :click="signup" />
        </div>
    </div>
</template>

<script>
import Divider from "./utils/Divider";
import MyInput from "./utils/MyInput";
import MyButton from "./utils/MyButton";
import { setRoute } from "../services/methods.js";
import UserData from "../services/user-data.js";
import EventBus from "../services/event-bus.js";
const axios = require("axios");

export default {
    name: "Signup",
    components: { Divider, MyInput, MyButton },
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            password: "",
            passwordConfirm: ""
        };
    },
    methods: {
        setRoute,
        async signup() {
            try {
                const response = await axios.post("users/signup", {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm
                });
                const user = response.data.data.user;
                // this.clearInputs();

                UserData.id = user._id;
                UserData.name = user.name;
                UserData.surname = user.surname;
                UserData.avatar = user.avatar;
                EventBus.$emit("update-user-data");
                this.setRoute("recipes", {});
            } catch (error) {
                console.error(error);
            }
        },
        clearInputs() {
            this.name = "";
            this.surname = "";
            this.email = "";
            this.password = "";
            this.passwordConfirm = "";
        }
    }
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
        width: 500px;
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
