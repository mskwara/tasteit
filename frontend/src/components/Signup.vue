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
            if (
                this.checkField(this.name, "name", 2) &&
                this.checkField(this.surname, "surname", 2) &&
                this.checkField(this.email, "email", 5) &&
                this.checkField(this.password, "password", 6) &&
                this.checkField(this.passwordConfirm, "password-confirm", 6)
            ) {
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
                    if (error.response.status === 400) {
                        EventBus.$emit("show-alert", {
                            title: "Something went wrong...",
                            content: "Please provide valid data!"
                        });
                    } else if (error.response.status === 500) {
                        EventBus.$emit("show-alert", {
                            title: "Something went wrong...",
                            content:
                                "There is a problem with the server... Please try to sign up later!"
                        });
                    }
                }
            }
        },
        clearInputs() {
            this.name = "";
            this.surname = "";
            this.email = "";
            this.password = "";
            this.passwordConfirm = "";
        },
        checkField(field, fieldname, minlen) {
            if (field.length < minlen) {
                EventBus.$emit("show-alert", {
                    title: "Something went wrong...",
                    content: `The field "${fieldname}" must have more or equal ${minlen} characters!`
                });
                return false;
            }
            return true;
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
