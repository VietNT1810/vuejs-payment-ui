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

    getPosts: (state) => {
        return state.posts;
    },

    searchPosts: (state) => (payload) => {
        const results = [];
        const { posts, comments } = state;
        const searchKeyword = payload.trim().toLowerCase();

        if (!payload) return results;

        posts.forEach((post) => {
            if (
                post.title.trim().toLowerCase().includes(searchKeyword) ||
                post.content.trim().toLowerCase().includes(searchKeyword)
            ) {
                results.push(post);
            }
        });
        comments.forEach((comment) => {
            if (comment.content.trim().toLowerCase().includes(searchKeyword)) {
                results.push(comment);
            }
        });
        return results;
    },

    searchCourses: (state) => (payload) => {
        const searchKeyword = payload.trim().toLowerCase();
        if (!payload) return [];
        return state.courses.filter(
            (course) =>
                course.content.trim().toLowerCase().includes(searchKeyword) ||
                course.title.trim().toLowerCase().includes(searchKeyword),
        );
    },

    searchEvents: (state) => (payload) => {
        const searchKeyword = payload.trim().toLowerCase();
        if (!payload) return [];
        return state.events.filter((event) => event.content.trim().toLowerCase().includes(searchKeyword));
    },

    searchMembers: (state) => (payload) => {
        const searchKeyword = payload.trim().toLowerCase();
        if (!payload) return [];
        return state.members.filter((event) => event.role.trim().toLowerCase().includes(searchKeyword));
    },
};

export default getters;
