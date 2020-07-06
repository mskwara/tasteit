<template>
    <div id="my-file-input" :style="getWidth()">
        <label for="file">
            <my-button text="Upload image" />
            <span id="file-name" class="file-box" v-if="showFilename">{{filename}}</span>
        </label>
        <input @change="uploadFile($event)" id="file" type="file" :style="inputstyle" />
    </div>
</template>

<script>
import MyButton from "../utils/MyButton";
// import EventBus from "../../services/event-bus.js";

export default {
    name: "MyInput",
    components: { MyButton },
    props: {
        width: String,
        inputstyle: String,
        showFilename: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            filename: "",
            photo: null
        };
    },
    methods: {
        getWidth() {
            return `width: ${this.width}`;
        },
        uploadFile(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.photo = files[0];
            this.$emit("photo-change", this.photo);
            this.filename = document.getElementById("file").files[0].name;
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#my-file-input {
    display: flex;
    width: 100%;

    input {
        width: 0;
        visibility: hidden;
    }
    label {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }
}
</style>