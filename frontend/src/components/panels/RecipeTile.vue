<template>
    <div id="recipeTile">
        <div class="box shadow">
            <div class="banner shadow">
                <p>{{ recipe.name }}</p>
            </div>
            <img class="cover" src="../../assets/imagecover.jpg" />
            <div class="loader" />
            <div class="icons-section">
                <div class="icon">
                    <img src="../../assets/time.svg" />
                    <p>{{ recipe.preparationTime }} min</p>
                </div>
                <div class="icon">
                    <img src="../../assets/difficulty.svg" />
                    <p>{{ recipe.difficulty }}</p>
                </div>
            </div>
            <div class="description small-shadow">
                <p>{{ recipe.shortDescription }}</p>
            </div>
            <div class="button-section">
                <my-button
                    text="Check out"
                    :click="
                        setRoute.bind(null, `recipe`, { id: this.recipe._id })
                    "
                />
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
import { setRoute } from "../../services/methods";

export default {
    name: "App",
    components: { MyButton },
    props: { recipe: Object },
    methods: {
        setRoute
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#recipeTile {
    .box {
        background-color: white;
        width: 400px;
        height: 450px;
        margin: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:hover .loader {
            width: 100%;
            transition: width 1s;
        }
    }

    .banner {
        background-color: $primary-100;
        width: 410px;
        height: 40px;
        border: 1px solid rgb(114, 114, 114);
        display: flex;
        align-items: center;
        color: white;

        p {
            text-align: left;
            font-size: 14pt;
            margin-left: 15px;
        }
    }
    .shadow {
        box-shadow: 2px 2px 10px rgb(109, 109, 109);
    }
    .small-shadow {
        box-shadow: 1px 1px 3px rgb(161, 161, 161);
    }
    .loader {
        height: 5px;
        width: 0;
        background-color: $primary-300;
        align-self: flex-start;
        transition: width 1s;
    }
    .cover {
        width: 400px;
        height: auto;
        margin-bottom: -4px;
    }
    .button-section {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 10px;
        margin-bottom: 5px;
    }
    .icons-section {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
    }
    .icon {
        width: auto;
        height: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 25px;
        }

        p {
            margin: 0;
        }
    }
    .description {
        background-color: $info;
        width: 95%;
        height: 25%;
        margin-bottom: 10px;

        p {
            margin: 5px;
            text-align: left;
        }
    }
}
</style>
