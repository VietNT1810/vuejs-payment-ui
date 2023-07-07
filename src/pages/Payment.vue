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
            <PaymentTable />
        </div>
        <PopupEditPayment />
    </div>
</template>
<script>
    import { ref } from 'vue';
    import BaseSelect from '@/components/base/BaseSelect.vue';
    import PaymentTable from '@/components/table/PaymentTable.vue';
    import SearchIcon from '@/assets/icons/SearchIcon.vue';
    import PopupEditPayment from '@/components/popup/PopupEditPayment.vue';

    export default {
        setup(props) {
            let tabPosition = ref('subscriptions');
            let searchWord = ref('');
            let filterProduct = ref('all');

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

            return {
                tabPosition,
                searchWord,
                filterOptions,
                handleSearch,
                handleSelect,
            };
        },
        components: {
            BaseSelect,
            PaymentTable,
            SearchIcon,
        },
    };
</script>
<style lang="scss" scoped>
    .payment {
        width: 60%;
        margin: 20px auto;
        border: 1px solid var(--gray-10);
        padding: 25px;
        border-radius: 6px;
        .heading {
            display: flex;
            align-items: flex-end;
            gap: 60px;
            .title {
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
                    font-family: 'Lato', sans-serif;
                }
                .info {
                    font-size: 22px;
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