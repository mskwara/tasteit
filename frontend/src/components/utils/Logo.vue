<template>
    <div id="logo" @click="setRoute('recipes', {})">
        <div class="square" />
        <p>Taste it!</p>
    </div>
</template>

<script>
import { setRoute } from "../../services/methods";

export default {
    name: "Logo",
    components: {},
    methods: {
        setRoute
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
@font-face {
    font-family: logoFont;
    src: url(../../assets/BAUHS93.TTF);
}

#logo {
    height: 70px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .square {
        width: 15px;
        height: 15px;
        transform: rotate(45deg);
        background-color: $primary-100;
        z-index: 2;
        margin-right: 5px;
    }
    p {
        font-size: 22pt;
        font-family: logoFont;
        z-index: 2;
    }

    &:hover .square {
        animation: spin 1.5s infinite linear;
    }

    @keyframes spin {
        from {
            transform: rotate(45deg);
        }
        to {
            transform: rotate(405deg);
        }
    }
}
</style>
