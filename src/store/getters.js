const getters = {
    getPaymentInfo: (state) => (id) => {
        return state.payments.filter((item) => item.id === id);
    },
    filterByProduct: (state) => (product) => {
        if (product == 'all') return state.payments;

        const filteredPayments = state.payments.filter((item) => item.product === product);
        const str = JSON.stringify(filteredPayments);
        return JSON.parse(str);

        // return state.payments.filter((item) => item.product === getProductName(product));
    },
    searchPayment: (state, getters) => (payload) => {
        const filteredPayments = getters.filterByProduct(payload.product);
        return filteredPayments.filter(
            (item) =>
                item.name.trim().toLowerCase().includes(payload.searchKeyword) ||
                item.email.trim().toLowerCase().includes(payload.searchKeyword),
        );
    },
};

export default getters;
