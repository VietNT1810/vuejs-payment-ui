<template lang="">
    <el-dialog :model-value="openPopup" title="Edit payment" @open="handleOpen" @close="handleClose(formRef)">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="left" label-width="150px">
            <el-form-item label="Name" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="Product" prop="product">
                <el-select v-model="form.product" class="m-2" placeholder="Select" size="large">
                    <el-option
                        v-for="item in filterOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Started Date" prop="date.started">
                <el-date-picker
                    v-model="form.date.started"
                    value-format="YYYY-MM-DD"
                    type="date"
                    placeholder="Pick started date"
                    size="large"
                />
            </el-form-item>
            <el-form-item label="Ended Date" prop="date.ended">
                <el-date-picker
                    v-model="form.date.ended"
                    value-format="YYYY-MM-DD"
                    type="date"
                    placeholder="Pick started date"
                    size="large"
                />
            </el-form-item>
            <el-form-item label="Amount" prop="amount">
                <el-input v-model.number="form.amount" />
            </el-form-item>
            <el-form-item label="Status" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio border label="ACTIVE" value="ACTIVE" />
                    <el-radio border label="INACTIVE" value="INACTIVE" />
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose(formRef)">Cancel</el-button>
                <el-button type="primary" @click="handleConfirm(formRef)">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
    import { reactive, ref, toRefs } from 'vue';
    import { formatDate } from '@/helpers/string.js';
    import { useStore } from 'vuex';
    import { some } from 'lodash';

    export default {
        props: ['openPopup', 'editData'],
        emits: ['close'],
        setup(props, { emit }) {
            const store = useStore();
            const formLabelWidth = '140px';
            const formRef = ref();

            let form = reactive({
                id: 0,
                avatar: '',
                name: '',
                email: '',
                product: '',
                date: {
                    started: '',
                    ended: '',
                },
                amount: 0,
                status: '',
            });

            const filterOptions = [
                {
                    value: 'all',
                    label: 'All Products',
                },
                {
                    value: 'html-js-bundle',
                    label: 'HTML / JS Course Bundle',
                },
                {
                    value: 'digital-marketing',
                    label: 'Digital Marketing',
                },
            ];

            const rules = reactive({
                name: { required: true, message: 'Please input name', trigger: 'blur' },
                email: [
                    { required: true, message: 'Please input email', trigger: 'blur' },
                    { type: 'email', message: 'Please input valid email', trigger: 'blur' },
                ],
                product: { required: true, message: 'Please choose product', trigger: 'change' },
                date: {
                    started: {
                        type: 'date',
                        required: true,
                        message: 'Please pick a date',
                        trigger: 'change',
                    },
                    ended: {
                        type: 'date',
                        required: false,
                        message: 'Please pick a date',
                        trigger: 'change',
                    },
                },
                amount: [
                    { required: true, message: 'amount is required' },
                    { type: 'number', message: 'amount must be a number' },
                ],
                status: {
                    required: true,
                    message: 'status is required',
                },
            });

            const handleOpen = () => {
                const proxyPayment = store.getters.getPaymentInfo(props.editData);
                const str = JSON.stringify(proxyPayment);
                Object.assign(form, JSON.parse(str)[0]);
            };

            const handleClose = (formEl) => {
                emit('close');
                if (!formEl) return;
                formEl.resetFields();
            };

            const handleConfirm = async (formEl) => {
                if (!formEl) return;
                console.log(formEl);
                await formEl.validate((valid, fields) => {
                    if (valid) {
                        console.log('submit!');
                        const str = JSON.stringify(form);
                        store.commit('editPayment', JSON.parse(str));
                        handleClose();
                    } else {
                        console.log('error submit!', fields);
                    }
                });
            };

            return {
                form,
                formLabelWidth,
                filterOptions,
                rules,
                formRef,
                handleOpen,
                handleClose,
                handleConfirm,
            };
        },
    };
</script>
<style lang=""></style>
