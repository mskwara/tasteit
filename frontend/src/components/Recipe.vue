<template>
    <div class="page">
        <spinner v-if="loading" />
        <div id="recipe" v-else>
            <p class="title">{{ recipe.name }}</p>
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
import { getPhotoFromAWS } from "../services/methods";
const axios = require("axios");

export default {
    name: "App",
    components: { Ingredients, Divider, Stepper, Spinner, Review },
    data() {
        return {
            recipe: {},
            loading: true,
            awsUserAvatar: null,
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
        async getRecipe() {
            const response = await axios.get(
                `api/v1/recipes/${this.$route.params.id}`
            );
            this.recipe = response.data.data.recipe;
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
    },
};
</script>

<style scoped lang="scss">
.page {
    display: flex;
    flex-direction: column;
    #recipe {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        flex: 1;

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
</style>
