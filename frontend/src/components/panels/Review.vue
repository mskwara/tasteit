<template>
    <div id="review">
        <div class="left">
            <div class="user-info">
                <img class="avatar" :src="photo" />
                <p class="name">
                    {{ review.user.name }} {{ review.user.surname }}
                </p>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <star-rating
                    class="rating"
                    v-model="review.rating"
                    :show-rating="false"
                    :read-only="true"
                    :star-size="20"
                    active-color="#fc9d03"
                ></star-rating>
                <div class="date">{{ getDate(review.createdAt) }}</div>
            </div>
            <div class="content">{{ review.content }}</div>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { getPhotoFromAWS } from "../../services/methods";

export default {
    name: "Review",
    components: { StarRating },
    props: { review: Object },
    data() {
        return {
            photo: null,
        };
    },
    async mounted() {
        if (this.review.user.avatar !== "default.jpg") {
            try {
                this.photo = await getPhotoFromAWS(this.review.user.avatar);
            } catch (err) {
                this.photo = require("../../../../backend/public/img/users/" +
                    this.review.user.avatar);
            }
        } else {
            this.photo = require("../../../../backend/public/img/users/" +
                this.review.user.avatar);
        }
    },
    methods: {
        getDate(date) {
            return date.slice(0, 10) + ", " + date.slice(11, 16);
        },
    },
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
                border-radius: 70px;
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

        .top {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .content {
            font-size: 14pt;
            margin: 10px;
        }
    }
}

@media only screen and (max-width: 870px) {
    #review {
        min-height: 70px;
        .left {
            .user-info {
                .avatar {
                    width: 40px;
                    height: 40px;
                }
                p {
                    font-size: 14pt;
                }
            }
        }
        .right {
            .top .date {
                font-size: 10pt;
            }
            .content {
                font-size: 12pt;
            }
        }
    }
}
@media only screen and (max-width: 540px) {
    #review {
        min-height: 50px;
        .left {
            .user-info {
                .avatar {
                    width: 50px;
                    height: 50px;
                }
                .name {
                    display: none;
                }
            }
        }
        .right {
            .top .date {
                font-size: 8pt;
            }
            .content {
                font-size: 10pt;
            }
        }
    }
}
@media only screen and (max-width: 450px) {
    #review {
        min-height: 50px;
        .left {
            .user-info {
                .avatar {
                    width: 40px;
                    height: 40px;
                }
                .name {
                    display: none;
                }
            }
        }
        .right {
            .top .rating {
                display: none;
            }
            .content {
                font-size: 10pt;
            }
        }
    }
}
</style>
