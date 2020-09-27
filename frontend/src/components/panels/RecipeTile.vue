<template>
    <div id="recipeTile">
        <div
            v-if="showFavourite"
            :class="isFavourite ? 'favourite my-favourite' : 'favourite'"
            @click="addToFavourites()"
        >
            <img src="../../assets/heart.svg" />
        </div>
        <div class="box" @click="setRoute(`recipe`, { id: recipe._id })">
            <div class="image-box">
                <div
                    v-if="
                        recipe.imageCover != null &&
                            recipe.imageCover != '' &&
                            recipe.imageCover != 'undefined'
                    "
                >
                    <img class="cover" :src="getImageCover()" />
                </div>
                <img
                    v-else-if="photo == null"
                    class="cover"
                    src="../../../../backend/public/img/recipes/default.jpg"
                />
                <img v-else-if="photo != null" class="cover" :src="photo" />
                <div class="icons-section">
                    <div class="icon">
                        <img src="../../assets/time.svg" />
                        <p v-if="recipe.preparationTime">{{ recipe.preparationTime }} min</p>
                    </div>
                    <div class="icon">
                        <img src="../../assets/difficulty.svg" />
                        <p>{{ recipe.difficulty }}</p>
                    </div>
                </div>
            </div>

            <div class="loader" />
            <div class="title">{{ recipe.name }}</div>
            <div class="rating">
                <star-rating
                    v-model="recipe.avgRating"
                    :show-rating="false"
                    :increment="0.01"
                    :read-only="true"
                    :star-size="18"
                    active-color="#fc9d03"
                ></star-rating>
                <p>({{ recipe.ratingsQuantity }})</p>
            </div>
            <div class="description">
                <p>{{ recipe.shortDescription }}</p>
            </div>
            <div class="user">
                <img class="avatar" :src="getAvatarPath()" />
                <p v-if="active">
                    by
                    <b>{{ recipe.user.name }} {{ recipe.user.surname }}</b>
                </p>
                <p v-else>
                    by
                    <b>{{ UserData.name }} {{ UserData.surname }}</b>
                </p>
            </div>
            <div class="button-section">
                <my-button
                    class="checkout"
                    v-if="active"
                    text="Check out"
                    :click="
                        setRoute.bind(null, `recipe`, { id: this.recipe._id })
                    "
                />
                <my-button class="checkout" v-else text="Check out" />
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
import { setRoute } from "../../services/methods";
import UserData from "../../services/user-data.js";
import StarRating from "vue-star-rating";
import EventBus from "../../services/event-bus.js";
const axios = require("axios");

export default {
    name: "App",
    components: { MyButton, StarRating },
    props: {
        recipe: Object,
        active: {
            type: Boolean,
            default: true,
        },
        photo: {
            type: String,
            default: null,
        },
        showFavourite: Boolean,
    },
    data() {
        return {
            coverImageSrc: "",
            UserData,
            isFavourite: false,
            isLoggedIn: false,
        };
    },
    mounted() {
        if (
            UserData.id != null &&
            UserData.favourites.includes(this.recipe._id)
        ) {
            this.isFavourite = true;
        }
    },
    methods: {
        setRoute,
        getImageCover() {
            try {
                if (
                    this.recipe.imageCover != null &&
                    this.recipe.imageCover != "" &&
                    this.recipe.imageCover != "undefined"
                ) {
                    return require(`../../../../backend/public/img/recipes/${this.recipe.imageCover}`);
                } else {
                    return require(`../../../../backend/public/img/recipes/default.jpg`);
                }
            } catch (err) {
                return require(`../../../../backend/public/img/recipes/default.jpg`);
            }
        },
        getAvatarPath() {
            try {
                if (this.active) {
                    return require("../../../../backend/public/img/users/" +
                        this.recipe.user.avatar);
                } else {
                    return require("../../../../backend/public/img/users/" +
                        this.recipe.user.avatar);
                }
            } catch (err) {
                return require("../../../../backend/public/img/users/default.jpg");
            }
        },
        async addToFavourites() {
            if (!this.UserData.favourites.includes(this.recipe._id)) {
                // dodanie do ulubionych
                const response = await axios.post(
                    `users/${this.UserData.id}/favourites/${this.recipe._id}`
                );
                this.UserData.favourites =
                    response.data.data.updatedUser.favourites;
                this.isFavourite = true;
                EventBus.$emit("show-pop-alert", {
                    content: `${this.recipe.name} has been added to your favourites!`,
                });
            } else {
                // wykasowanie z ulubionych
                const response = await axios.delete(
                    `users/${this.UserData.id}/favourites/${this.recipe._id}`
                );
                this.UserData.favourites =
                    response.data.data.updatedUser.favourites;
                this.isFavourite = false;
                EventBus.$emit("show-pop-alert", {
                    content: `${this.recipe.name} has been removed from your favourites!`,
                });
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#recipeTile {
    position: relative;

    .favourite {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 50px;
        top: 50px;
        opacity: 0.3;
        z-index: 2;
        cursor: pointer;
        transition: opacity 0.5s;

        &:hover {
            opacity: 1;
            transition: opacity 0.5s;
        }
    }

    .my-favourite {
        opacity: 1;
    }

    .box {
        background-color: white;
        width: 400px;
        height: 440px;
        margin: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid $border-400;
        border-radius: 2px;
        cursor: pointer;

        &:hover .loader {
            width: 100%;
            transition: width 1s;
        }
    }

    .image-box {
        // display: block;
        height: 250px;
        position: relative;
    }

    .loader {
        height: 5px;
        margin-top: -1px;
        z-index: 2;
        width: 0;
        background-color: $primary-300;
        align-self: flex-start;
        transition: width 1s;
    }
    .cover {
        width: 400px;
        height: 250px;
        margin-bottom: -4px;
        border-radius: 2px 2px 0 0;
        border-bottom: 1px solid $border-400;
    }
    .button-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex: 1;

        .checkout {
            width: 100%;
            margin: 0;
            height: 100%;
            border-radius: 0 0 2px 2px;
        }
    }
    .title {
        width: 100%;
        height: 30px;
        margin-left: 20px;
        font-size: 14pt;
        text-align: left;
    }
    .rating {
        align-self: baseline;
        margin-left: 10px;
        display: flex;
        align-items: center;

        p {
            margin: 0;
            font-size: 10pt;
            margin-bottom: 2px;
            margin-left: 5px;
        }
    }
    .icons-section {
        position: relative;
        height: 45px;
        top: -45px;
        background: rgba(255, 255, 255, 0.5);
        width: 40%;
        border-radius: 0 2px 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: auto;
            height: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 20px;
            }

            p {
                margin: 0;
                font-size: 10pt;
            }
        }
    }
    .description {
        // background-color: $info;
        width: 95%;
        height: 38px;
        margin-bottom: 10px;
        color: $border-200;
        padding: 5px;

        p {
            font-size: 12pt;
            margin: 0;
            text-align: left;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            height: inherit;
        }
    }
    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        margin-left: 20px;
        margin-bottom: 10px;

        .avatar {
            width: 25px;
            border-radius: 25px;
            margin-right: 10px;
        }
        p {
            margin: 0;
        }
    }
}
</style>
