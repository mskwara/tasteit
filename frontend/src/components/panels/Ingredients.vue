<template>
    <div id="ingredients">
        <div class="title">
            <p style="font-size: 18pt">INGREDIENTS</p>
            <p style="font-size: 12pt" v-if="portion != null">/ {{ portion }}</p>
        </div>
        <div class="content">
            <divider />
            <div class="item" v-for="item in ingredients" :key="item._id">
                {{ item.name }}
                <span v-if="item.optional">(optional)</span>
            </div>
        </div>
    </div>
</template>

<script>
import Divider from "../utils/Divider";

export default {
    name: "Ingredients",
    components: { Divider },
    props: { ingredients: Array, portion: String }
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
        width: 90%;
        padding: 8px 10px;
        border-bottom: 1px solid rgb(236, 236, 236);

        &:last-child {
            border: 0;
        }
    }
}
</style>
