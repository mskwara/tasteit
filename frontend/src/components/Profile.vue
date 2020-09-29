<template>
    <div class="page">
        <p class="title">{{ UserData.name }} {{ UserData.surname }}</p>
        <divider />
        <div class="content">
            <div class="avatar-changer">
                <img class="avatar" :src="photo" />
                <div class="buttons">
                    <my-file-input
                        width="100%"
                        :showFilename="false"
                        @photo-change="avatarChange"
                    />
                </div>
                <Spinner v-if="photo_loading" />
            </div>
            <div class="form">
                <my-input
                    type="text"
                    class="field"
                    field="Name"
                    width="80%"
                    v-model="user.name"
                />
                <my-input
                    type="text"
                    class="field"
                    field="Surname"
                    width="80%"
                    v-model="user.surname"
                />
                <my-input
                    type="text"
                    class="field"
                    field="Email"
                    width="80%"
                    v-model="user.email"
                />

                <my-button text="Save" :click="save" />
                <Spinner v-if="data_loading" />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "./utils/Divider";
import UserData from "../services/user-data.js";
import MyButton from "./utils/MyButton";
import MyInput from "./utils/MyInput";
import Spinner from "./utils/Spinner";
import MyFileInput from "./utils/MyFileInput";
const axios = require("axios");
const Clipper = require("image-clipper");
import EventBus from "../services/event-bus.js";
import { getPhotoFromAWS } from "../services/methods";

export default {
    name: "App",
    components: { Divider, MyFileInput, MyButton, MyInput, Spinner },
    data() {
        return {
            UserData,
            photo: null,
            user: {
                name: UserData.name,
                surname: UserData.surname,
                email: UserData.email,
                avatar: null,
            },
            photo_loading: false,
            data_loading: false,
        };
    },
    async mounted() {
        console.log(UserData);
        if (UserData.avatar && UserData.avatar !== "default.jpg") {
            // console.log(UserData.avatar);
            try {
                this.photo = await getPhotoFromAWS(UserData.avatar);
            } catch (err) {
                this.photo = require("../../../backend/public/img/users/default.jpg");
            }
        } else {
            this.photo = require("../../../backend/public/img/users/default.jpg");
        }
    },
    methods: {
        async avatarChange(photo) {
            this.photo_loading = true;
            this.user.avatar = photo;
            var reader = new FileReader();
            let vm = this;
            reader.onload = function (event) {
                // vm.photo = event.target.result;
                const i = new Image();
                i.onload = () => {
                    console.log(i.width, i.height);

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
            let formData = new FormData();
            if (this.user.avatar != null) {
                formData.append("avatar", this.user.avatar);
            }

            const response = await axios.patch(
                `api/v1/users/${this.UserData.id}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            UserData.avatar = response.data.data.user.avatar;
            // console.log(UserData.id, UserData.avatar);
            this.photo_loading = false;

            EventBus.$emit("update-user-data");
            EventBus.$emit("show-pop-alert", {
                content: `New photo has been uploaded!`,
            });
        },
        async save() {
            this.data_loading = true;
            let formData = new FormData();
            if (this.user.name != "") {
                formData.append("name", this.user.name);
            }
            if (this.user.surname != "") {
                formData.append("surname", this.user.surname);
            }
            if (this.user.email != "") {
                formData.append("email", this.user.email);
            }

            const response = await axios.patch(
                `api/v1/users/${this.UserData.id}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            UserData.name = response.data.data.user.name;
            UserData.surname = response.data.data.user.surname;
            UserData.email = response.data.data.user.email;
            // console.log(UserData.id, UserData.avatar);
            this.data_loading = false;
            EventBus.$emit("update-user-data");
            EventBus.$emit("show-pop-alert", {
                content: `Your profile has been updated!`,
            });
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/styles.scss";

.page {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
        text-align: center;
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
}

@media only screen and (max-width: 540px) {
    .page {
        .title {
            font-size: 25pt;
        }
        .content {
            flex-direction: column;
            margin-bottom: 20px;

            .avatar-changer {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .avatar {
                    width: 100%;
                    height: auto;
                }
            }
            .form {
                width: 100%;
            }
        }
    }
}
</style>
