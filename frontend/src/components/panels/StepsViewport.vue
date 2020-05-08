<template>
    <div id="ingredients">
        <div class="title">
            <p style="font-size: 18pt">Steps</p>
        </div>
        <div class="content">
            <divider />
            <div class="item" v-for="(item, index) in steps" :key="item._id">
                <p
                    class="cut-version"
                >{{ index+1 }}. {{getCutVersion(item.content)}} {{item.optional ? '(optional)' : ''}}</p>
                <div class="options">
                    <div class="icon" v-if="item.time">
                        <img src="../../assets/time.svg" />
                        <p>{{ item.time/60 }} min</p>
                    </div>

                    <img
                        class="before-icon"
                        src="../../assets/mixer.svg"
                        v-if="item.before.length > 0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "../utils/Divider";

export default {
    name: "StepsViewport",
    components: { Divider },
    props: { steps: Array },
    methods: {
        getCutVersion(text) {
            const array = text.split(" ");
            if (array.length <= 20) {
                return array.join(" ");
            } else {
                return array.slice(0, 20).join(" ") + "...";
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#ingredients {
    width: 30%;
    height: fit-content;
    border: 1px solid $border-400;
    background-color: white;
    min-width: 300px;

    .title {
        padding: 10px;

        p {
            margin: 10px 3px;
            display: inline;
            text-transform: uppercase;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 20px 10px 20px;
    }
    .item {
        align-self: flex-start;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: auto;
        padding: 8px 10px;
        border-bottom: 1px solid rgb(236, 236, 236);

        .options {
            display: flex;
            align-items: center;
            height: 35px;
            width: auto;
            margin-left: 20px;

            .before-icon {
                width: 25px;
                margin-bottom: 5px;
                margin-left: 10px;
            }

            .icon {
                width: 50px;
                height: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                // border: 1px solid red;

                img {
                    width: 15px;
                }

                p {
                    margin: 0;
                    font-size: 10pt;
                }
            }
        }

        &:last-child {
            border: 0;
        }
    }
}
</style>
