<template>
    <div id="specify-recipe-info">
        <div class="recipe-tile">
            <recipe-tile :recipe="recipe" :photo="photo" :active="false" />
        </div>
        <div class="recipe-info">
            <p class="progress-title">Provide essential information</p>
            <my-text-area
                :rows="5"
                :cols="100"
                :maxlen="240"
                field="Write a short description..."
                hint="It will be visible in the recipes list"
                v-model="recipe.shortDescription"
            />
            <my-file-input style="margin-top: 40px" width="100%" @photo-change="photoChange" />

            <my-input
                type="text"
                style="margin-top: 40px"
                field="Preparation time in minutes"
                width="100%"
                :maxlen="3"
                v-model="recipe.preparationTime"
            />
            <my-select
                style="margin-top: 30px"
                :options="difficulties"
                title="Select recipe's difficulty"
                v-model="recipe.difficulty"
            />
            <my-button class="apply-button" text="Apply the description" :click="applyInfo" />
        </div>
    </div>
</template>

<script>
import MyInput from "../utils/MyInput";
import MyFileInput from "../utils/MyFileInput";
import MyButton from "../utils/MyButton";
import MyTextArea from "../utils/MyTextArea";
import MySelect from "../utils/MySelect";
import RecipeTile from "../panels/RecipeTile";
import EventBus from "../../services/event-bus.js";
import { validateInfo } from "../../services/methods.js";
// const resizeImg = require("resize-img");
const Clipper = require("image-clipper");

export default {
    name: "CreatorIngredients",
    components: {
        MyTextArea,
        MyInput,
        MyButton,
        MySelect,
        RecipeTile,
        MyFileInput
    },
    props: {
        recipe: Object
    },
    data() {
        return {
            difficulties: [
                {
                    text: "easy",
                    value: "easy"
                },
                {
                    text: "medium",
                    value: "medium"
                },
                {
                    text: "difficult",
                    value: "difficult"
                }
            ],
            photo: null
        };
    },
    methods: {
        validateInfo,
        applyInfo() {
            const checkInfo = this.validateInfo(this.recipe);
            if (checkInfo.status === "fail") {
                EventBus.$emit("show-alert", {
                    title: checkInfo.error.title,
                    content: checkInfo.error.content
                });
                return;
            }
            this.$emit("applyInfo");
        },
        photoChange(photo) {
            EventBus.$emit("recipe-photo-upload", photo);
            var reader = new FileReader();
            let vm = this;
            reader.onload = async function(event) {
                // vm.photo = event.target.result;

                var i = new Image();
                i.src = await event.target.result;

                Clipper(event.target.result, function() {
                    this.resize(400)
                        .crop(
                            0,
                            i.height > 250
                                ? (i.height * (400 / i.width) - 250) / 2
                                : 0,
                            400,
                            250
                        )
                        .toDataURL(function(dataUrl) {
                            vm.photo = dataUrl;
                        });
                });
            };
            reader.readAsDataURL(photo);
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#specify-recipe-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 70px);
    // border: 1px solid blue;

    .apply-button {
        width: 60% !important;
        margin-top: 40px !important;
        align-self: center;
    }
    .progress-title {
        font-size: 23pt;
        text-transform: uppercase;
        margin: 20px 0;
    }

    .recipe-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 70%;
        margin-left: 20px;
    }
}
</style>
