<template>
    <select id="my-select" @input="$emit('input', $event.target.value)">
        <option value="none" disabled selected>{{title}}</option>
        <option :value="o.value" v-for="o in options" :key="o.value">{{o.text}}</option>
    </select>
</template>

<script>
export default {
    name: "App",
    components: {},
    props: { options: Array, title: String }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#my-select {
    display: block;
    font-size: 16px;
    font-family: Calibri;
    font-weight: 600;
    color: $text-color;
    // line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid $border-300;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    background-image: url("../../assets/arrow.png");
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;

    .my-select::-ms-expand {
        display: none;
    }
    .my-select:hover {
        border-color: #888;
    }
    .my-select:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222;
        outline: none;
    }
    .my-select option {
        font-weight: normal;
    }
}
</style>