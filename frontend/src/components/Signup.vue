<template>
    <div id="login">
        <p class="title">Sign up</p>
        <divider />
        <div class="content">
            <div class="avatar-changer">
                <img class="avatar" :src="getAvatarPath()" />
                <div class="buttons">
                    <my-file-input
                        width="100%"
                        :showFilename="false"
                        @photo-change="avatarChange"
                    />
                </div>
            </div>
            <div class="form">
                <my-input
                    type="text"
                    class="field"
                    field="Name"
                    width="80%"
                    v-model="name"
                />
                <my-input
                    type="text"
                    class="field"
                    field="Surname"
                    width="80%"
                    v-model="surname"
                />
                <my-input
                    type="text"
                    class="field"
                    field="Email"
                    width="80%"
                    v-model="email"
                />

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
                <a class="no-account" @click="setRoute('login', {})"
                    >I have an account already</a
                >
                <my-button text="Sign up" :click="signup" />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "./utils/Divider";
import MyInput from "./utils/MyInput";
import MyFileInput from "./utils/MyFileInput";
import MyButton from "./utils/MyButton";
import { setRoute } from "../services/methods.js";
import UserData from "../services/user-data.js";
import EventBus from "../services/event-bus.js";
const Clipper = require("image-clipper");
const axios = require("axios");

export default {
    name: "Signup",
    components: { Divider, MyInput, MyButton, MyFileInput },
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            avatar: null, //send
            password: "",
            passwordConfirm: "",
            photo: null, //display
        };
    },
    methods: {
        setRoute,
        getAvatarPath() {
            if (this.photo) {
                return this.photo;
            }
            return require("../../../backend/public/img/users/default.jpg");
        },
        avatarChange(photo) {
            this.avatar = photo;
            var reader = new FileReader();
            let vm = this;
            reader.onload = function (event) {
                // vm.photo = event.target.result;
                const i = new Image();
                i.onload = () => {
                    // console.log(i.width, i.height);

                    if (i.height >= i.width) {
                        Clipper(event.target.result, function () {
                            this.resize(300)
                                .crop(
                                    0,
                                    i.height > 300
                                        ? (i.height * (300 / i.width) - 300) / 2
                                        : 0,
                                    300,
                                    300
                                )
                                .toDataURL(function (dataUrl) {
                                    vm.photo = dataUrl;
                                });
                        });
                    } else {
                        Clipper(event.target.result, function () {
                            this.resize(null, 300)
                                .crop(
                                    i.width > 300
                                        ? (i.width * (300 / i.height) - 300) / 2
                                        : 0,
                                    0,
                                    300,
                                    300
                                )
                                .toDataURL(function (dataUrl) {
                                    vm.photo = dataUrl;
                                });
                        });
                    }
                };
                i.src = event.target.result;
            };

            reader.readAsDataURL(photo);
        },
        async signup() {
            if (
                this.checkField(this.name, "name", 2) &&
                this.checkField(this.surname, "surname", 2) &&
                this.checkField(this.email, "email", 5) &&
                this.checkField(this.password, "password", 6) &&
                this.checkField(this.passwordConfirm, "password-confirm", 6)
            ) {
                try {
                    let formData = new FormData();
                    formData.append("name", this.name);
                    formData.append("surname", this.surname);
                    formData.append("email", this.email);
                    if (this.avatar != null) {
                        formData.append("avatar", this.avatar);
                    }
                    formData.append("password", this.password);
                    formData.append("passwordConfirm", this.passwordConfirm);

                    const response = await axios.post(
                        "api/v1/users/signup",
                        formData
                    );
                    const user = response.data.data.user;
                    // this.clearInputs();

                    UserData.id = user._id;
                    UserData.name = user.name;
                    UserData.surname = user.surname;
                    UserData.avatar = user.avatar;
                    UserData.favourites = user.favourites;
                    EventBus.$emit("update-user-data");
                    this.setRoute("recipes", {});
                } catch (error) {
                    if (error.response.status === 400) {
                        EventBus.$emit("show-alert", {
                            title: "Something went wrong...",
                            content: "Please provide valid data!",
                        });
                    } else if (error.response.status === 500) {
                        EventBus.$emit("show-alert", {
                            title: "Something went wrong...",
                            content:
                                "There is a problem with the server... Please try to sign up later!",
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
                    content: `The field "${fieldname}" must have more or equal ${minlen} characters!`,
                });
                return false;
            }
            return true;
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .avatar-changer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .avatar {
                width: 300px;
                height: 300px;
                border-radius: 150px;
                transition: 0.5s;
            }
            .buttons {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
            }
        }
        .form {
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
}
@media only screen and (max-width: 570px) {
    #login {
        .content {
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
        }
    }
}

@media only screen and (max-width: 440px) {
    #login {
        .content {
            .avatar-changer {
                .avatar {
                    width: 200px;
                    height: 200px;
                }
            }
        }
    }
}
</style>
