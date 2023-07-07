<template>
    <div class="payment">
        <div class="heading">
            <div class="title">
                <h2 class="main-title">Payments</h2>
                <p class="sub-title">View and manage all of your transactions or subscriptions in one place.</p>
            </div>
            <div class="tab-switcher">
                <el-radio-group v-model="tabPosition" size="large">
                    <el-radio-button label="transactions">Transactions</el-radio-button>
                    <el-radio-button label="subscriptions">Subscriptions</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="statistics">
            <div class="block">
                <div class="title">Subscriptions</div>
                <div class="info">7</div>
            </div>
            <div class="block">
                <div class="title">MRR</div>
                <div class="info">$570</div>
            </div>
            <div class="block">
                <div class="title">Yearly revenue</div>
                <div class="info">$7,120</div>
            </div>
        </div>
        <div class="query-field">
            <el-input class="search" v-model="searchWord" placeholder="Search">
                <template #prefix>
                    <SearchIcon />
                </template>
            </el-input>
            <BaseSelect class="filter" :options="filterOptions" @select="handleSelect"></BaseSelect>
        </div>
        <div class="table">
            <PaymentTable @action="handleAction" :tableData="filteredPayments" />
        </div>
        <PopupEditPayment :openPopup="openPopup" @close="handleClosePopup" :editData="editPayment"> </PopupEditPayment>
    </div>
</template>
<script>
    import { computed, ref, toRaw } from 'vue';
    import BaseSelect from '@/components/base/BaseSelect.vue';
    import PaymentTable from '@/components/table/PaymentTable.vue';
    import SearchIcon from '@/assets/icons/SearchIcon.vue';
    import PopupEditPayment from '@/components/popup/PopupEditPayment.vue';
    import { useStore } from 'vuex';

    export default {
        emits: ['edit'],
        setup(props, { emit }) {
            let tabPosition = ref('subscriptions');
            let searchWord = ref('');
            let filterProduct = ref('all');
            let openPopup = ref(false);
            let editPayment = ref(null);

            const store = useStore();
            let filteredPayments = computed({
                get() {
                    return store.getters.searchPayment({
                        product: filterProduct.value,
                        searchKeyword: searchWord.value,
                    });
                },
                set(value) {},
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

            const handleSearch = (data) => {
                searchWord.value = data;
            };

            const handleSelect = (data) => {
                filterProduct.value = data;
            };

            const handleAction = (command) => {
                if (command.type == 'edit') {
                    handleOpenPopupEdit(command.id);
                }
                if (command.type == 'delete') {
                    handleDeletePayment(command.id);
                }
            };

            const handleOpenPopupEdit = (editId) => {
                editPayment.value = editId;
                openPopup.value = true;
            };

            const handleDeletePayment = (deleteId) => {
                store.commit('deletePayment', deleteId);
            };

            const handleClosePopup = () => {
                openPopup.value = false;
            };

            return {
                tabPosition,
                searchWord,
                filterOptions,
                openPopup,
                filteredPayments,
                editPayment,
                handleSearch,
                handleSelect,
                handleOpenPopupEdit,
                handleDeletePayment,
                handleClosePopup,
                handleAction,
            };
        },
        components: {
            BaseSelect,
            PaymentTable,
            SearchIcon,
        },
        methods: {},
    };
</script>
<style lang="scss" scoped>
    .payment {
        width: 60%;
        min-width: 800px;
        margin: 20px auto;
        border: 1px solid var(--gray-10);
        padding: 25px;
        border-radius: 6px;
        .heading {
            display: flex;
            align-items: flex-end;
            gap: 60px;
            .title {
                color: var(--gray-100);
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .tab-switcher {
                width: 290px;
                height: 40px;
                padding: 3px;
                border-radius: 4px;
                border: 1px solid var(--gray-10);
                background: var(--gray-0);
                :deep(.el-radio-group) {
                    width: 100%;
                    height: 100%;
                    .el-radio-button {
                        flex: 1;
                        height: 100%;
                        .el-radio-button__inner {
                            width: 100%;
                            height: 100%;
                            padding: 8px 25px;
                            border: none;
                            border-radius: 3px;
                            background: var(--gray-0);
                        }
                        .el-radio-button__original-radio:checked + .el-radio-button__inner {
                            background-color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
                        }
                    }
                }
            }
        }

        .statistics {
            width: 100%;
            display: flex;
            margin-top: 20px;
            margin-bottom: 25px;
            border-radius: 5px;
            border: 1px solid var(--gray-10);
            background: var(--gray-0);
            .block {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                padding: 12px;
                &:nth-child(2) {
                    border: 1px solid var(--gray-10);
                    border-top: 0px;
                    border-bottom: 0px;
                }
                .title {
                    color: var(--gray-50);
                    font-family: 'Lato', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 14px;
                }
                .info {
                    color: var(--gray-100);
                    font-size: 22px;
                    font-weight: 700;
                    line-height: 28px;
                }
            }
        }
        .query-field {
            display: flex;
            gap: 33px;
            margin-bottom: 20px;
            .search {
                max-width: 256px;
            }
        }
    }
</style>
