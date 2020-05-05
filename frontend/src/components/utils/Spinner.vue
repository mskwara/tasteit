<template>
    <div id="spinner">
        <div class="dot" />
    </div>
</template>

<script>
export default {
    name: "Spinner",
    components: {}
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#spinner {
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: center;

    .dot {
        width: 12px;
        height: 12px;
        background-color: $primary-200;
        position: relative;
        animation-name: spinner;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }

    @keyframes spinner {
        0% {
            left: 0;
            transform: rotate(0);
        }
        5% {
            left: 0;
        }
        45% {
            left: 23px;
            transform: rotate(180deg);
        }
        55% {
            left: 23px;
            transform: rotate(180deg);
        }
        95% {
            left: 0;
        }
        100% {
            left: 0;
            transform: rotate(0);
        }
    }
}
</style>