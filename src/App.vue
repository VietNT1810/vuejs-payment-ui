<template>
    <!-- <Payment /> -->
    <SearchPage />
</template>

<script>
    // import Payment from '@/pages/Payment.vue';
    import { watchEffect } from 'vue';
    import SearchPage from './pages/SearchPage.vue';
    export default {
        setup() {
            //ignore ResizeObserver loop limit exceeded
            watchEffect(() => {
                window.addEventListener('error', (e) => {
                    if (e.message === 'ResizeObserver loop limit exceeded') {
                        const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
                        const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
                        if (resizeObserverErr) {
                            resizeObserverErr.setAttribute('style', 'display: none');
                        }
                        if (resizeObserverErrDiv) {
                            resizeObserverErrDiv.setAttribute('style', 'display: none');
                        }
                    }
                });
            });
        },
        components: {
            SearchPage,
        },
    };
</script>

<style></style>
