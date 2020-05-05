<template>
    <div
        id="mybutton"
        :class="type"
        @click="clickAction()"
        :style="checkDisabled()"
    >
        {{ text }}
        <div class="bottom-line" v-if="type === 'empty'" />
    </div>
</template>

<script>
export default {
    name: "MyButton",
    components: {},
    props: {
        text: String,
        click: Function,
        disabled: Boolean,
        type: {
            type: String,
            default: "default"
        }
    },
    methods: {
        clickAction() {
            if (this.disabled || this.click == null) {
                return;
            }
            this.click();
        },
        checkDisabled() {
            if (this.disabled)
                return "background-color: rgb(128, 128, 128) ; cursor: default";
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#mybutton {
    width: 130px;
    height: 40px;
    font-size: 13pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    margin: 5px;

    &.default {
        background-color: $primary-100;
        color: white;
    }
    &.empty {
        background-color: white;
        color: $text-color;

        .bottom-line {
            width: 40%;
            margin-top: 5px;
            border-bottom: 1px solid $border-100;
            transition: width 0.5s;
        }

        &:hover {
            background-color: white;
            .bottom-line {
                width: 20%;
                transition: width 0.5s;
            }
        }
    }

    &:hover {
        background-color: $primary-200;
        cursor: pointer;
    }
}
</style>
