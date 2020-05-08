<template>
    <div id="my-text-area" :style="getWidth()">
        <div class="content">
            <textarea
                :rows="rows"
                :cols="cols"
                :type="type"
                :placeholder="field"
                :value="value"
                :style="inputstyle"
                :maxlength="maxlen"
                @input="$emit('input', $event.target.value)"
                @blur="$emit('blur', $event.target)"
                :ref="reference"
            />
            <div class="underline-interactive" />
            <div class="underline" />
            <p class="hint" v-if="hint">{{hint}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyInput",
    components: {},
    props: {
        width: String,
        field: String,
        type: String,
        value: String,
        inputstyle: String,
        maxlen: Number,
        hint: String,
        reference: String,
        rows: Number,
        cols: Number
    },
    methods: {
        getWidth() {
            return `width: ${this.width}`;
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#my-text-area {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
    .content {
        // max-width: 400px;
        width: 100%;
        textarea {
            border: 1px solid $border-300;
            border-radius: 2px;
            font-family: Calibri;
            background: white;
            width: 100%;
            min-height: 40px;
            font-size: 13pt;
            padding-bottom: 0;
            color: $text-color;

            &:focus {
                border: 1px solid $primary-100;
            }

            &:focus::-moz-placeholder {
                color: $primary-100;
                opacity: 1;
            }
            &:focus::-webkit-input-placeholder {
                color: $primary-100;
                opacity: 1;
            }
            &:focus:-ms-input-placeholder {
                color: $primary-100;
                opacity: 1;
            }
        }
        .hint {
            font-size: 9pt;
            color: $border-200;
            margin: 0;
            text-align: left;
        }
    }
}
</style>