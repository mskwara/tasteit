<template>
    <div id="step">
        <div class="header step">{{ header }}</div>
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    name: "App",
    props: { content: String, header: String }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";
#step {
    width: 90%;
    height: auto;
    border: 1px solid rgb(228, 228, 228);
    padding: 20px;
    background-color: $info;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2px;
    padding-top: 50px;
    position: relative;

    .header {
        width: 150px;
        height: 30px;
        border: 1px solid rgb(201, 201, 201);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $primary-100;
        color: white;
        position: absolute;

        &.step {
            left: -10px;
            top: -10px;
        }
    }

    p {
        margin: -10px 20px 0 20px;
        width: 100%;
    }
}
</style>
