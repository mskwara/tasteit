<template>
    <div id="my-input" :style="getWidth()">
        <div class="content">
            <input
                :class="type"
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
            <p class="hint" v-if="hint">{{ hint }}</p>
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
    },
    methods: {
        getWidth() {
            return `width: ${this.width}`;
        },
    },
};
</script>

<style scoped lang="scss">
@import "../../styles/styles.scss";

#my-input {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    // border: 1px solid red;

    .content {
        // max-width: 400px;
        width: 100%;
        input {
            border: 0;
            background: none;
            width: 100%;
            min-height: 40px;
            font-size: 13pt;
            padding-bottom: 0;
            color: $text-color;
            outline: none;

            &:focus + .underline-interactive {
                border-bottom: 1px solid $primary-100;
                width: 100%;
                transition: 0.5s;
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

        .underline {
            width: 100%;
            // max-width: 400px;
            border-bottom: 1px solid $border-300;
        }
        .underline-interactive {
            width: 0;
            // max-width: 400px;
            border-bottom: 1px solid $border-300;
            transition: 0.5s;
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