<template lang="">
    <el-form :model="form" label-position="left" label-width="100px">
        <el-form-item label="Name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Product">
            <el-select v-model="form.product" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in FILTER_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
    import { reactive } from 'vue';
    import { FILTER_OPTIONS } from '@/constants/filter';

    export default {
        emits: ['confirm'],
        setup() {
            const form = reactive({
                id: 0,
                avatar: '',
                name: '',
                email: '',
                product: 'all',
                date: {
                    started: '',
                    ended: '',
                },
                amount: 0,
                status: '',
            });

            return {
                form,
                FILTER_OPTIONS,
            };
        },
    };
</script>
<style lang=""></style>
