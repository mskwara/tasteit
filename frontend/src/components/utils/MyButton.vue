<template>
    <div id="mybutton" :style="checkDisabled()" :class="type" @click="clickAction()">
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
    transition: 0.5s;

    &.default {
        background-color: $primary-100;
        color: white;
    }
    &.empty {
        background: none;
        color: $text-color;

        .bottom-line {
            width: 40%;
            margin-top: 5px;
            border-bottom: 1px solid $border-400;
            transition: width 0.5s;
        }

        &:hover {
            background: none;
            .bottom-line {
                width: 20%;
                transition: width 0.5s;
            }
        }
    }
    &.full {
        width: 90%;
        background-color: $primary-100;
        margin: 0;
        color: white;
    }

    &:hover {
        background-color: $primary-200;
        cursor: pointer;
        transition: 0.5s;
    }
}
</style>
