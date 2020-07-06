<template>
    <div class="page">
        <p class="title">{{UserData.name}} {{UserData.surname}}</p>
        <divider />
        <div class="avatar-changer">
            <img class="avatar" :src="getAvatarPath()" />
            <div class="buttons">
                <my-file-input width="100%" :showFilename="false" @photo-change="avatarChange" />
                <my-button text="Save" style="width: 100% ; margin-left: 15px" />
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "./utils/Divider";
import UserData from "../services/user-data.js";
import MyButton from "./utils/MyButton";
import MyFileInput from "./utils/MyFileInput";
// const axios = require("axios");
const Clipper = require("image-clipper");

export default {
    name: "App",
    components: { Divider, MyFileInput, MyButton },
    data() {
        return {
            UserData,
            photo: null
        };
    },
    methods: {
        getAvatarPath() {
            if (this.photo) {
                return this.photo;
            }
            return require("../assets/" + this.UserData.avatar);
        },
        avatarChange(photo) {
            var reader = new FileReader();
            let vm = this;
            reader.onload = function(event) {
                // vm.photo = event.target.result;
                const i = new Image();
                i.onload = () => {
                    console.log(i.width, i.height);

                    if (i.height >= i.width) {
                        Clipper(event.target.result, function() {
                            this.resize(300)
                                .crop(
                                    0,
                                    i.height > 300
                                        ? (i.height * (300 / i.width) - 300) / 2
                                        : 0,
                                    300,
                                    300
                                )
                                .toDataURL(function(dataUrl) {
                                    vm.photo = dataUrl;
                                });
                        });
                    } else {
                        Clipper(event.target.result, function() {
                            this.resize(null, 300)
                                .crop(
                                    i.width > 300
                                        ? (i.width * (300 / i.height) - 300) / 2
                                        : 0,
                                    0,
                                    300,
                                    300
                                )
                                .toDataURL(function(dataUrl) {
                                    vm.photo = dataUrl;
                                });
                        });
                    }
                };
                i.src = event.target.result;
            };

            reader.readAsDataURL(photo);
        }
    }
};
</script>

<style scoped lang="scss">
.page {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    .avatar-changer {
        .avatar {
            width: 300px;
            height: 300px;
            border-radius: 150px;
        }
        .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
        }
    }
}
</style>
