<template>
    <div id="sidebar" :class="status">
        <div class="content" v-if="status == 'opened'">
            <div class="user-info" v-if="user.id != null">
                <img class="avatar" :src="photo" />
                <p>{{ UserData.name }} {{ UserData.surname }}</p>
            </div>
            <div class="menu" v-if="user.id != null">
                <my-button
                    class="button"
                    :text="$t('createANewRecipe')"
                    type="full"
                    :click="setRouteWrap.bind(null, 'recipecreator', {})"
                />
                <div class="link" @click="filterRecipes({})">
                    {{ $t("home") }}
                </div>
                <div
                    class="link"
                    @click="
                        filterRecipes({ type: 'byUser', userId: UserData.id })
                    "
                >
                    {{ $t("myRecipes") }}
                </div>
                <div
                    class="link"
                    @click="
                        filterRecipes({
                            type: 'byFavourites',
                            userId: UserData.id,
                        })
                    "
                >
                    {{ $t("favourites") }}
                </div>
                <div class="link" @click="setRouteWrap('profile', {})">
                    {{ $t("myProfile") }}
                </div>
                <div class="link" @click="changeLanguage()">
                    {{ $t("changeLanguage") }}
                </div>
                <div class="link" @click="logout()">{{ $t("logout") }}</div>
            </div>
            <div class="menu" style="margin-top: 20px" v-else>
                <my-button
                    class="button"
                    :text="$t('signup')"
                    type="full"
                    :click="setRouteWrap.bind(null, 'signup', {})"
                />
                <div class="link" @click="setRouteWrap('recipes', {})">
                    {{ $t("recipes") }}
                </div>
                <div class="link" @click="changeLanguage()">
                    {{ $t("changeLanguage") }}
                </div>
                <div class="link" @click="setRouteWrap('login', {})">
                    {{ $t("login") }}
                </div>
            </div>
            <div class="footer">
                <p>{{ footer }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from "../../services/event-bus.js";
import UserData from "../../services/user-data.js";
import MyButton from "../utils/MyButton";
import {
    setRoute,
    replaceRoute,
    clearUserData,
    getPhotoFromAWS,
} from "../../services/methods";
const axios = require("axios");
import i18n from "@/plugins/i18n";

export default {
    name: "App",
    components: { MyButton },
    data() {
        return {
            status: "closed",
            footer: "",
            user: {
                id: UserData.id,
                name: UserData.name,
                surname: UserData.surname,
                avatar: UserData.avatar,
            },
            UserData,
            photo: null,
        };
    },
    methods: {
        clearUserData,
        setRoute,
        replaceRoute,
        setRouteWrap(link, params) {
            this.setRoute(link, params);
            EventBus.$emit("close-sidebar");
        },
        replaceRouteWrap(link, params) {
            this.replaceRoute(link, params);
            EventBus.$emit("close-sidebar");
        },
        async logout() {
            await axios.post("api/v1/users/logout");
            this.clearUserData(UserData);
            this.setRoute("recipes", {});
            EventBus.$emit("update-user-data");
            EventBus.$emit("close-sidebar");
        },
        filterRecipes(filter) {
            if (this.$route.name != "recipes") {
                this.setRoute("recipes", filter);
            } else {
                EventBus.$emit("filter-recipes", filter);
            }
            EventBus.$emit("close-sidebar");
        },
        changeLanguage() {
            if (i18n.locale === "en") {
                i18n.locale = "pl";
                this.$cookie.set("language", "pl");
            } else if (i18n.locale === "pl") {
                i18n.locale = "en";
                this.$cookie.set("language", "en");
            }
            EventBus.$emit("change-language");
        },
    },
    async updated() {
        if (UserData.avatar && UserData.avatar !== "default.jpg") {
            // console.log(UserData.avatar);
            try {
                this.photo = await getPhotoFromAWS(UserData.avatar);
            } catch (err) {
                this.photo = require("../../../../backend/public/img/users/default.jpg");
            }
        } else {
            this.photo = require("../../../../backend/public/img/users/default.jpg");
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
    },
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
            // min-width: 300px;
            width: 400px;
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
            text-decoration: none;
            text-transform: capitalize;

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

@media only screen and (max-width: 1000px) {
    #sidebar {
        &.opened {
            width: 90vw;
        }
    }
}
</style>
