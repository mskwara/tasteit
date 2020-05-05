<template>
    <div id="topbar">
        <hamburger class="hamburger" />
        <logo class="logo" />
        <my-button text="Login" type="empty" />
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
import Logo from "../utils/Logo";
import Hamburger from "../utils/Hamburger";

export default {
    name: "TopBar",
    components: { MyButton, Logo, Hamburger }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#topbar {
    width: 100%;
    height: 70px;
    background-color: white;
    border-bottom: 1px solid $border-100;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hamburger {
        margin-left: 30px;
    }
    .logo {
        transform: translate(-75px, 0);
        position: absolute;
        left: 50%;
    }
}
</style>
