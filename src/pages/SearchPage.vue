<template lang="">
    <div class="search">
        <div class="search-box">
            <el-input v-model="searchWord" placeholder="Search" @input="handleSearchChange">
                <template #prefix>
                    <SearchIcon />
                </template>
            </el-input>
        </div>
        <div class="tips-box">
            <TipsIcon class="tips-icon" />
            <p class="content">
                To search a post by a particular member, enter <span class="command-example">by: John Doe</span>
            </p>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleTabChange">
                <el-tab-pane name="community">
                    <template #label>
                        <span class="custom-label">Community ({{ searchedPosts.length }})</span>
                    </template>
                    <div class="tab-prefix">
                        <span class="info">{{ searchedPosts.length }} results</span>
                        <div class="sort" :class="sortOrder" @click="handleSortSearchResult(searchedPosts)">
                            <SortDescIcon class="sort-icon" />
                            <span>Recent</span>
                        </div>
                    </div>

                    <div class="result-item" v-for="(result, index) in searchedPosts" :key="index">
                        <div class="avatar">
                            <img v-if="result.post" :src="result.user.avatar" alt="" />
                            <img v-else :src="result.author.avatar" alt="" />
                        </div>
                        <div class="content">
                            <div class="info">
                                <p v-if="result.post" class="title">
                                    comment by <span class="title-bold">{{ result.user.username }}</span> in
                                    <span class="title-bold">{{ result.post.title }}</span>
                                </p>
                                <p v-else class="title">
                                    post by <span class="title-bold">{{ result.author.username }}</span>
                                    <span v-if="!result?.title?.toLowerCase().includes(searchWord.toLowerCase())">
                                        titled <span class="title-bold">{{ result.title }}</span>
                                    </span>
                                </p>
                                <span class="time">{{ formatDateFromNow(result.time) }}</span>
                            </div>
                            <p class="text-content" v-html="getHighlightSearchText(result.content, searchWord)"></p>
                            <p
                                class="text-title"
                                v-if="result?.title?.toLowerCase().includes(searchWord.toLowerCase())"
                                v-html="getHighlightSearchText(result.title, searchWord)"
                            ></p>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="courses">
                    <template #label>
                        <span class="custom-label">Courses ({{ searchedCourses.length }})</span>
                    </template>
                    <div class="tab-prefix">
                        <span class="info">{{ searchedCourses.length }} results</span>
                        <div class="sort" :class="sortOrder" @click="handleSortSearchResult(searchedCourses)">
                            <SortDescIcon class="sort-icon" />
                            <span>Recent</span>
                        </div>
                    </div>
                    <div class="result-item" v-for="(result, index) in searchedCourses" :key="index">
                        <div class="avatar">
                            <img :src="result.author.avatar" alt="" />
                        </div>
                        <div class="content">
                            <div class="info">
                                <p class="title">
                                    post by <span class="title-bold">{{ result.author.username }}</span>
                                    <span v-if="!result?.title?.toLowerCase().includes(searchWord.toLowerCase())">
                                        titled <span class="title-bold">{{ result.title }}</span>
                                    </span>
                                </p>
                                <span class="time">{{ formatDateFromNow(result.time) }}</span>
                            </div>
                            <p class="text-content" v-html="getHighlightSearchText(result.content, searchWord)"></p>
                            <p
                                class="text-title"
                                v-if="result?.title?.toLowerCase().includes(searchWord.toLowerCase())"
                                v-html="getHighlightSearchText(result.title, searchWord)"
                            ></p>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="events">
                    <template #label>
                        <span class="custom-label">Events ({{ searchedEvents.length }})</span>
                    </template>
                    <div class="tab-prefix">
                        <span class="info">{{ searchedEvents.length }} results</span>
                        <div class="sort" :class="sortOrder" @click="handleSortSearchResult(searchedEvents)">
                            <SortDescIcon class="sort-icon" />
                            <span>Recent</span>
                        </div>
                    </div>
                    <div class="result-item" v-for="(result, index) in searchedEvents" :key="index">
                        <div class="avatar">
                            <img :src="result.author.avatar" alt="" />
                        </div>
                        <div class="content">
                            <div class="info">
                                <p class="title title-bold">{{ result.title }}</p>
                                <span class="time">{{ formatDateFromNow(result.time) }}</span>
                            </div>
                            <p class="text-content" v-html="getHighlightSearchText(result.content, searchWord)"></p>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`Members (${searchedMembers.length})`" name="members">
                    <template #label>
                        <span class="custom-label">Members ({{ searchedMembers.length }})</span>
                    </template>
                    <div class="tab-prefix">
                        <span class="info">{{ searchedMembers.length }} results</span>
                        <div class="sort" :class="sortOrder" @click="handleSortSearchResult(searchedMembers)">
                            <SortDescIcon class="sort-icon" />
                            <span>Recent</span>
                        </div>
                    </div>

                    <div class="result-item" v-for="(result, index) in searchedMembers" :key="index">
                        <div class="avatar">
                            <img :src="result.avatar" alt="" />
                        </div>
                        <div class="content">
                            <div class="info">
                                <p class="title title-bold">{{ result.username }}</p>
                                <span class="time">{{ formatDateFromNow(result.time) }}</span>
                            </div>
                            <p class="text-content" v-html="getHighlightSearchText(result.role, searchWord)"></p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import SearchIcon from '@/assets/icons/SearchIcon.vue';
    import SortDescIcon from '@/assets/icons/SortDescIcon.vue';
    import TipsIcon from '@/assets/icons/TipsIcon.vue';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { getHighlightSearchText, formatDateFromNow } from '@/helpers/string';

    export default {
        setup(props) {
            const store = useStore();
            const searchWord = ref('');
            const activeTab = ref('community');
            let searchedPosts = ref([]);
            let searchedCourses = ref([]);
            let searchedEvents = ref([]);
            let searchedMembers = ref([]);
            let sortOrder = ref('desc');
            let searchResults = ref(searchedPosts.value);

            const handleSearchChange = (value) => {
                searchWord.value = value;
                searchedPosts.value = store.getters.searchPosts(value);
                searchedCourses.value = store.getters.searchCourses(value);
                searchedEvents.value = store.getters.searchEvents(value);
                searchedMembers.value = store.getters.searchMembers(value);

                sortAllCategory();
            };

            const handleTabChange = (tab, event) => {
                sortAllCategory();
            };

            const handleSortSearchResult = (searchedResults) => {
                sortOrder.value = sortOrder.value == 'desc' ? 'asc' : 'desc';
                sortResultsByTime(searchedResults);
            };

            const sortResultsByTime = (searchedResults) => {
                searchedResults.sort((a, b) => {
                    let dateA = new Date(a.time);
                    let dateB = new Date(b.time);
                    return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA;
                });
            };

            const sortAllCategory = () => {
                sortResultsByTime(searchedPosts.value);
                sortResultsByTime(searchedCourses.value);
                sortResultsByTime(searchedEvents.value);
                sortResultsByTime(searchedMembers.value);
            };

            return {
                activeTab,
                searchWord,
                sortOrder,
                searchResults,
                searchedPosts,
                searchedCourses,
                searchedEvents,
                searchedMembers,
                handleTabChange,
                handleSearchChange,
                getHighlightSearchText,
                formatDateFromNow,
                handleSortSearchResult,
            };
        },
        components: {
            SearchIcon,
            TipsIcon,
            SortDescIcon,
        },
    };
</script>
<style lang="scss" scoped>
    .search {
        max-width: 700px;
        margin: 0 auto;
        .search-box {
            margin: 32px 0;
            :deep(.el-input) {
                .el-input__wrapper {
                    padding-left: 0;
                    box-shadow: 0 0 0 1.5px #eee inset;
                    .el-input__prefix {
                        .el-input__prefix-inner {
                            padding: 0 16px;
                            & > :first-child {
                                margin-right: 0px;
                            }
                        }
                    }
                    .el-input__inner {
                        font-size: 18px;
                        color: var(--black);
                        &::placeholder {
                            font-size: 18px;
                        }
                    }
                }
            }
        }
        .tips-box {
            display: flex;
            gap: 16px;
            padding: 16px;
            border-radius: 8px;
            background: #edf7ff;
            margin-bottom: 32px;
            .tips-icon {
                min-width: 16px;
            }
            .command-example {
                font-weight: 600;
            }
        }
        .tabs {
            :deep(.el-tabs) {
                .el-tabs__header {
                    margin-bottom: 0px;
                    .el-tabs__nav-wrap {
                        .el-tabs__nav {
                            .el-tabs__item {
                                margin-right: 16px;
                                padding: 12px 0px;
                                .custom-label {
                                    padding: 0px 16px;
                                    font-size: 15px;
                                    color: var(--gray);
                                }
                            }
                            .is-active {
                                .custom-label {
                                    color: var(--black);
                                }
                            }
                            .el-tabs__active-bar {
                                background-color: var(--black);
                            }
                        }

                        &::after {
                            content: none;
                        }
                    }
                }
                .el-tabs__content {
                    .el-tab-pane {
                        .tab-prefix {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 32px 0px;
                            .info {
                                color: #000;
                                font-size: 15px;
                                font-weight: 700;
                            }
                            .sort {
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                color: #444;
                                span {
                                    font-weight: 600;
                                }
                            }

                            .asc {
                                .sort-icon {
                                    transform: scaleY(-1);
                                }
                            }
                        }
                        .result-item {
                            display: flex;
                            gap: 16px;
                            margin-bottom: 20px;
                            padding: 16px;
                            border: 1px solid #eee;
                            border-radius: 8px;
                            .avatar {
                                img {
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                }
                            }
                            .content {
                                flex: 1;
                                .info {
                                    display: flex;
                                    justify-content: space-between;
                                    margin: 6px 0;
                                    color: var(--gray);
                                    .title-bold {
                                        font-weight: 600;
                                    }
                                    .time {
                                        min-width: 100px;
                                        text-align: right;
                                        font-size: 13px;
                                        font-weight: 400;
                                    }
                                }
                                .text-content {
                                    font-size: 15px;
                                    line-height: 18.75px;
                                    mark {
                                        color: var(--black);
                                        border-radius: 4px;
                                        background: #fef5dd;
                                    }
                                }
                                .text-title {
                                    color: var(--black);
                                    font-size: 15px;
                                    font-weight: 700;
                                    line-height: 22.75px;
                                    mark {
                                        color: var(--black);
                                        border-radius: 4px;
                                        background: #fef5dd;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .search {
            margin: 0 20px;
        }
    }
</style>
