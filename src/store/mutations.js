const mutations = {
    editPayment(state, payload) {
        console.log('mutation: ', payload);
        const index = state.payments.findIndex((payment) => payment.id === payload.id);
        if (index !== -1) {
            state.payments[index] = payload;
        }
    },
    deletePayment(state, payload) {
        state.payments = state.payments.filter((item) => item.id !== payload);
    },
};

export default mutations;
