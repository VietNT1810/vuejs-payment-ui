<template lang="">
    <div class="base-input">
        <el-input v-model="inputValue" @input="emitInput" placeholder="Search">
            <template #prefix>
                <slot name="prefix"></slot>
            </template>
        </el-input>
    </div>
</template>
<script>
    import { ref } from 'vue';

    export default {
        name: 'BaseInput',
        emits: ['input'],
        setup(props, { emit }) {
            const inputValue = ref('');

            const emitInput = () => {
                emit('input', inputValue.value);
            };

            return {
                inputValue,
                emitInput,
            };
        },
    };
</script>
<style lang="scss" scoped>
    .base-input {
        max-width: 256px;
        height: 40px;
        :deep(.el-input) {
            height: 100%;
            .el-input__inner::placeholder {
                color: var(--gray-50);
                font-family: Lato;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px;
            }
        }
    }
</style>
