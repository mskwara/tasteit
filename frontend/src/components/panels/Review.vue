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
        <img
            src="../../assets/delete.png"
            class="deleteBtn"
            v-if="review.user._id === UserData.id || UserData.role === 'admin'"
            @click="deleteReview()"
        />
    </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { getPhotoFromAWS } from "../../services/methods";
import UserData from "../../services/user-data";
import EventBus from "../../services/event-bus.js";
const axios = require("axios");

export default {
    name: "Review",
    components: { StarRating },
    props: { review: Object },
    data() {
        return {
            photo: null,
            UserData,
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
            return date.slice(0, -3);
        },
        async deleteReview() {
            // console.log(this.review.user._id);
            const response = await axios.delete(
                `api/v1/reviews/${this.review._id}`,
                { data: { reviewAuthorId: this.review.user._id } },
                { withCredentials: true }
            );
            if (response.status === 204) {
                EventBus.$emit("show-pop-alert", {
                    content: this.$t("alertContent14"),
                });
            } else {
                EventBus.$emit("show-pop-alert", {
                    content: this.$t("alertContent12"),
                });
            }
            this.$emit("update-reviews");
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
    position: relative;
    display: flex;
    flex-direction: row;

    .deleteBtn {
        position: absolute;
        right: -40px;
        width: 10px;
        height: 10px;
        padding: 5px;
        border-radius: 50%;
        background-color: white;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: 0.5s;
        cursor: pointer;

        &:hover {
            background-color: $delete;
            filter: invert(1) hue-rotate(180deg);
        }
    }

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

        .deleteBtn {
            right: -32px;
        }
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

        .deleteBtn {
            right: -20px;
            border: 1px solid gray;
        }
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

        .deleteBtn {
            right: -20px;
            top: 7px;
        }
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
