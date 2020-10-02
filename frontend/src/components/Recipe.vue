<template>
    <div class="page">
        <spinner v-if="loading" />
        <div id="recipe" v-else>
            <p class="title">{{ recipe.name }}</p>
            <my-button
                class="deleteRecipe"
                v-if="
                    recipe.user._id === UserData.id || UserData.role === 'admin'
                "
                :text="$t('deleteRecipe')"
                :click="deleteRecipeDialog"
            />
            <img
                src="../assets/rubbish.png"
                class="deleteRecipe small-delete-btn"
                v-if="
                    recipe.user._id === UserData.id || UserData.role === 'admin'
                "
                @click="deleteRecipeDialog"
            />
            <divider />
            <div class="content">
                <div class="left">
                    <div class="user">
                        <img class="avatar" :src="awsUserAvatar" />
                        <p>
                            by
                            <b
                                >{{ recipe.user.name }}
                                {{ recipe.user.surname }}</b
                            >
                        </p>
                    </div>
                    <ingredients
                        :ingredients="recipe.ingredients"
                        :portion="recipe.portion"
                    />
                </div>
                <stepper
                    :steps="recipe.steps"
                    :recipeID="recipe._id"
                    @update-reviews="getRecipe"
                    class="stepper"
                />
            </div>
        </div>
        <div
            class="reviews"
            v-if="recipe.reviews != null && recipe.reviews.length > 0"
        >
            <p class="title">{{ $t("reviews") }}</p>
            <review
                v-for="review in recipe.reviews"
                :key="review._id"
                :review="review"
                @update-reviews="getRecipe"
            />
        </div>
    </div>
</template>

<script>
import Ingredients from "./panels/Ingredients";
import Divider from "./utils/Divider";
import Stepper from "./panels/Stepper";
import Spinner from "./utils/Spinner";
import Review from "./panels/Review";
import MyButton from "./utils/MyButton";
import { getPhotoFromAWS, setRoute } from "../services/methods";
import UserData from "../services/user-data";
import EventBus from "../services/event-bus";
const axios = require("axios");

export default {
    name: "App",
    components: { Ingredients, Divider, Stepper, Spinner, Review, MyButton },
    data() {
        return {
            recipe: {},
            loading: true,
            awsUserAvatar: null,
            UserData,
        };
    },
    async created() {
        try {
            await this.getRecipe();
            await this.getAvatarPath();
            this.loading = false;
            // console.log(this.recipe);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        setRoute,
        async getRecipe() {
            const response = await axios.get(
                `api/v1/recipes/${this.$route.params.id}`
            );
            this.recipe = response.data.data.recipe;
            // console.log(this.recipe.reviews);
            this.recipe.reviews.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            this.recipe.reviews.forEach((review) => {
                const locale = new Date(review.createdAt).toLocaleString();
                review.createdAt = locale;
            });
        },
        async getAvatarPath() {
            try {
                if (this.recipe.user.avatar !== "default.jpg") {
                    this.awsUserAvatar = await getPhotoFromAWS(
                        this.recipe.user.avatar
                    );
                } else {
                    this.awsUserAvatar = require("../../../backend/public/img/users/default.jpg");
                }
            } catch (err) {
                this.awsUserAvatar = require("../../../backend/public/img/users/default.jpg");
            }
        },
        deleteRecipeDialog() {
            EventBus.$emit("show-alert", {
                title: this.$t("alertTitle8"),
                content: this.$t("alertContent15"),
                onClickMethod: this.deleteRecipe,
            });
        },
        async deleteRecipe() {
            const response = await axios.delete(
                `api/v1/recipes/${this.recipe._id}`,
                { data: { recipeAuthorId: this.recipe.user._id } },
                { withCredentials: true }
            );
            if (response.status === 204) {
                EventBus.$emit("show-alert", {
                    title: this.$t("alertTitle6"),
                    content: this.$t("alertContent16"),
                });
                this.setRoute("recipes", {});
            } else {
                EventBus.$emit("show-alert", {
                    title: this.$t("alertTitle2"),
                    content: this.$t("alertContent12"),
                });
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/styles.scss";
.page {
    display: flex;
    flex-direction: column;
    #recipe {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        flex: 1;
        position: relative;

        .deleteRecipe {
            position: absolute;
            right: 20px;
            top: 5px;
            background-color: $delete;
            transition: 0.5s;
            cursor: pointer;
            &:hover {
                background-color: $delete-hover;
            }
            &.small-delete-btn {
                display: none;
                width: 30px;
                height: 30px;
                padding: 5px;
                border-radius: 50%;
            }
        }

        .content {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .left {
                display: flex;
                flex-direction: column;

                .user {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    margin-left: 20px;
                    margin-top: 10px;
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
        }
    }
    .title {
        font-size: 40pt;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    .reviews {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }
}

@media only screen and (max-width: 870px) {
    .page #recipe {
        .deleteRecipe {
            display: none;
            &.small-delete-btn {
                display: initial;
            }
        }
        .content {
            flex-direction: column;
            align-items: center;
            width: 100%;

            .left {
                margin-bottom: 20px;
            }
            .stepper {
                margin-left: 0;
                width: 100%;
            }
        }
        .title {
            font-size: 30pt;
        }
    }
    .page .reviews {
        .title {
            font-size: 30pt;
        }
    }
}

@media only screen and (max-width: 280px) {
    .page #recipe {
        .deleteRecipe {
            &.small-delete-btn {
                width: 15px;
                height: 15px;
                top: 10px;
                right: 5px;
            }
        }
    }
}
</style>
