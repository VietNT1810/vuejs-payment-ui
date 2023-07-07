<template lang="">
    <div class="base-select">
        <el-select v-model="selectValue" class="m-2" placeholder="Select" size="large" @change="emitChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
</template>
<script>
    import { ref } from 'vue';

    export default {
        props: ['options'],
        emits: ['select'],
        setup(props, { emit }) {
            const selectValue = ref('all');

            const emitChange = () => {
                emit('select', selectValue.value);
            };

            return {
                selectValue,
                emitChange,
            };
        },
    };
</script>
<style lang="scss" scoped>
    .base-select {
        :deep(.el-select) {
            .el-input__inner {
                color: var(--gray-75);
                font-family: Lato;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px;
            }
        }
    }
</style>
