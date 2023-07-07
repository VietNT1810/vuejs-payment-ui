<template lang="">
    <el-table class="table" :data="tableData" style="width: 100%">
        <el-table-column label="Customer" min-width="220" fixed>
            <template #default="scope">
                <div class="customer">
                    <img :src="scope.row.avatar" class="avatar" alt="Customer avatar" />
                    <div class="info">
                        <span class="name">{{ scope.row.name }}</span>
                        <span class="email">{{ scope.row.email }}</span>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Product" width="200">
            <template #default="scope">
                <p class="product">{{ scope.row.product }}</p>
            </template>
        </el-table-column>
        <el-table-column label="Date" width="200" sortable>
            <template #default="scope">
                <div class="date">
                    <div class="started">
                        <span class="title">Started: </span>
                        <span class="text">{{ scope.row.date.started }}</span>
                    </div>
                    <div v-if="scope.row.date.ended" class="ended">
                        <span class="title">Ended: </span>
                        <span class="text">{{ scope.row.date.ended }}</span>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Amount" sortable width="100">
            <template #default="scope">
                <div class="amount">
                    <span class="value">${{ scope.row.amount }}</span>
                    <span class="status">
                        <div v-if="scope.row.status == 'ACTIVE'" class="inner">
                            <ActiveIcon />
                            <span class="active">Active</span>
                        </div>
                        <div v-else class="inner">
                            <InactiveIcon />
                            <span class="inactive">Inactive</span>
                        </div>
                    </span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Actions" width="50" fixed="right">
            <el-dropdown
                class="actions"
                trigger="click"
                :popper-options="{ modifiers: [{ name: 'offset', options: { offset: [-34, 10] } }] }"
            >
                <button class="actions-btn">
                    <ActionsIcon />
                </button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <div class="action-item">
                                <HumanIcon />
                                <span class="edit">Edit</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item
                            ><div class="action-item">
                                <DeleteIcon />
                                <span class="delete">Delete</span>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-table-column>
    </el-table>
</template>
<script>
    import ActiveIcon from '@/assets/icons/ActiveIcon.vue';
    import InactiveIcon from '@/assets/icons/InactiveIcon.vue';
    import ActionsIcon from '@/assets/icons/ActionsIcon.vue';
    import HumanIcon from '@/assets/icons/HumanIcon.vue';
    import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

    export default {
        setup() {
            const tableData = [
                {
                    id: 1,
                    avatar: 'https://i.pravatar.cc/100?u=fake1@pravatar.com',
                    name: 'Arlene McCoy',
                    email: 'sara.cruz@example.com',
                    product: 'HTML / JS Course Bundle',
                    date: {
                        started: 'Sep 15, 2020',
                        ended: 'Dec 30, 2021',
                    },
                    amount: '200.00',
                    status: 'ACTIVE',
                },
                {
                    id: 2,
                    avatar: 'https://i.pravatar.cc/100?u=fake2@pravatar.com',
                    name: 'Arlene McCree',
                    email: 'sara.cruz@example.com',
                    product: 'HTML / JS Course Bundle',
                    date: {
                        started: 'Sep 15, 2020',
                        ended: '',
                    },
                    amount: '220.00',
                    status: 'INACTIVE',
                },
            ];

            return {
                tableData,
            };
        },
        components: {
            ActiveIcon,
            InactiveIcon,
            ActionsIcon,
            HumanIcon,
            DeleteIcon,
        },
    };
</script>
<style lang="scss" scoped>
    .table {
        font-family: Lato;
        .customer {
            display: flex;
            align-items: center;
            gap: 10px;
            .avatar {
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
            .info {
                display: flex;
                flex-direction: column;
                .name {
                    color: var(--dark-100);
                    line-height: 16px;
                }
                .email {
                    color: var(--gray-50);
                    font-size: 12px;
                    line-height: 14px;
                }
            }
        }
        .product {
            color: var(--gray-100);
            line-height: 16px;
        }
        .date {
            line-height: 16px;
            .text {
                color: var(--gray-100);
            }
        }
        .amount {
            line-height: 16px;
            .value {
                color: var(--gray-100);
            }
            .status {
                .inner {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    .active {
                        color: var(--green-100);
                    }
                    .inactive {
                        color: var(--red-100);
                    }
                }
            }
        }
        .actions {
            .actions-btn {
                width: 28px;
                height: 28px;
                border-radius: 10%;
                cursor: pointer;
                :deep(.actions-icon) {
                    path {
                        fill: var(--gray-75);
                    }
                }
                &:hover {
                    background-color: var(--gray-25);
                    :deep(.actions-icon) {
                        path {
                            fill: var(--gray-100);
                        }
                    }
                }
            }
        }
    }
    :deep(.action-item) {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
