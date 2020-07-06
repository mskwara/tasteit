<template>
    <div id="review">
        <div class="left">
            <div class="user-info">
                <img class="avatar" :src="getAvatarPath()" />
                <p>{{review.user.name}} {{review.user.surname}}</p>
            </div>
        </div>
        <div class="right">
            <div class="date">{{getDate(review.createdAt)}}</div>
            <div class="content">{{review.content}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Review",
    components: {},
    props: { review: Object },
    methods: {
        getAvatarPath() {
            return require("../../assets/" + this.review.user.avatar);
        },
        getDate(date) {
            return date.slice(0, 10) + ", " + date.slice(11, 16);
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#review {
    width: 90%;
    min-height: 100px;
    border: 1px solid $border-400;
    margin-bottom: 20px;
    background-color: white;

    display: flex;
    flex-direction: row;

    .left {
        width: 30%;
        background-color: $primary-300;
        display: flex;
        align-items: flex-start;
        transform: skew(10deg);
        margin-left: -10px;

        .user-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 20px;
            margin-top: 13px;
            transform: skew(-10deg);

            .avatar {
                width: 70px;
                height: 70px;
                border-radius: 35px;
                border: 2px solid white;
            }
            p {
                color: white;
                font-size: 18pt;
                margin: 0 20px;
            }
        }
    }
    .right {
        width: 70%;
        padding: 10px;

        .date {
            text-align: right;
        }
        .content {
            font-size: 14pt;
            margin: 10px;
        }
    }
}
</style>
