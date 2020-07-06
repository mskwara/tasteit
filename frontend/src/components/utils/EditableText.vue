<template>
    <div id="editable-text" @click="click()">
        <p v-if="!active" :style="textstyle">{{ field }}</p>
        <my-input
            type="String"
            :style="inputstyle"
            @input="$emit('input', $event)"
            v-model="field"
            :value="value"
            inputstyle="font-size: 35pt ; text-align: center ; text-transform: uppercase"
            width="100%"
            :maxlen="maxlen"
            @blur="active = false"
            :reference="reference"
            ref="editabletext"
            :selectOnClick="selectOnClick"
            v-else
        />
    </div>
</template>

<script>
import MyInput from "./MyInput";

export default {
    name: "App",
    components: { MyInput },
    props: {
        value: String,
        textstyle: String,
        inputstyle: String,
        maxlen: Number,
        reference: String,
        selectOnClick: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: false,
            field: this.value
        };
    },
    methods: {
        click() {
            this.active = true;
            this.$nextTick(() => {
                this.$refs.editabletext.$refs[this.reference].focus();
                if (this.selectOnClick) {
                    this.$refs.editabletext.$refs[this.reference].select();
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#editable-text {
    width: 100%;

    p {
        text-align: center;
    }
}
</style>