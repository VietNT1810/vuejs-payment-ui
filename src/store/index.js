import { createStore } from 'vuex';

const store = createStore({
    state: {
        payments: [
            {
                id: 1,
                name: 'Arlene McCoy',
                email: 'abc@example.com',
                product: 'HTML / CSS',
                date: {
                    started: 'Sep 15, 2020',
                    ended: '',
                },
                amount: 200,
                status: 'ACTIVE',
            },
            {
                id: 2,
                name: 'Arlene Flash',
                email: 'nevaeh.simmons@example.com',
                product: 'HTML / CSS',
                date: {
                    started: 'Nov 8, 2020',
                    ended: '',
                },
                amount: 100,
                status: 'ACTIVE',
            },
            {
                id: 3,
                name: 'James McCree',
                email: 'jessica.hanson@example.com',
                product: 'Digital Marketing',
                date: {
                    started: 'Sep 22, 2020',
                    ended: '',
                },
                amount: 250,
                status: 'ACTIVE',
            },
            {
                id: 4,
                name: 'Ted Frank',
                email: 'alma.lawson@example.com',
                product: 'Digital Marketing',
                date: {
                    started: 'Sep 12, 2020',
                    ended: 'Dec 30, 2021',
                },
                amount: 400,
                status: 'INACTIVE',
            },
            {
                id: 5,
                name: 'Barney Stinson',
                email: 'barney.stinson@example.com',
                product: 'Digital Marketing',
                date: {
                    started: 'Sep 12, 2020',
                    ended: 'Dec 30, 2021',
                },
                amount: 460,
                status: 'INACTIVE',
            },
        ],
    },
});

export default store;