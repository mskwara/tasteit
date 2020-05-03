<template>
    <div id="app">
        <router-view></router-view>
        <alert />
    </div>
</template>

<script>
import Alert from "./components/utils/Alert";

export default {
    name: "App",
    components: { Alert }
};
</script>

<style>
#app {
    font-family: Calibri;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
body {
    background-color: rgba(236, 236, 236, 0.452);
}
</style>
