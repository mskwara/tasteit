<template>
    <div class="button" @click="clickAction()" :style="checkDisabled()">{{ text }}</div>
</template>

<script>
export default {
    name: "MyButton",
    components: {},
    props: {
        text: String,
        click: Function,
        disabled: Boolean
    },
    methods: {
        clickAction() {
            if (this.disabled) {
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
.button {
    width: 130px;
    height: 40px;
    background-color: $primary;
    font-size: 13pt;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 2px;
    margin: 5px;
}
.button:hover {
    background-color: $primary-100;
    cursor: pointer;
}
</style>
