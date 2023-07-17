import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import { COMMENTS, COURSES, EVENTS, MEMBERS, POSTS } from '@/data';

const store = createStore({
    state: {
        payments: [
            {
                id: 1,
                avatar: 'https://i.pravatar.cc/150?u=fake1@pravatar.com',
                name: 'Arlene McCoy',
                email: 'abc@example.com',
                product: 'html-js-bundle',
                date: {
                    started: '2020-10-17',
                    ended: '',
                },
                amount: 200,
                status: 'ACTIVE',
            },
            {
                id: 2,
                avatar: 'https://i.pravatar.cc/150?u=fake2@pravatar.com',
                name: 'Arlene Flash',
                email: 'nevaeh.simmons@example.com',
                product: 'html-js-bundle',
                date: {
                    started: '2020-11-08',
                    ended: '',
                },
                amount: 100,
                status: 'ACTIVE',
            },
            {
                id: 3,
                avatar: 'https://i.pravatar.cc/150?u=fake3@pravatar.com',
                name: 'James McCree',
                email: 'jessica.hanson@example.com',
                product: 'digital-marketing',
                date: {
                    started: '2020-09-22',
                    ended: '',
                },
                amount: 250,
                status: 'ACTIVE',
            },
            {
                id: 4,
                avatar: 'https://i.pravatar.cc/150?u=fake4@pravatar.com',
                name: 'Ted Frank',
                email: 'alma.lawson@example.com',
                product: 'digital-marketing',
                date: {
                    started: '2020-09-15',
                    ended: '',
                },
                amount: 400,
                status: 'INACTIVE',
            },
            {
                id: 5,
                avatar: 'https://i.pravatar.cc/150?u=fake13@pravatar.com',
                name: 'Barney Stinson',
                email: 'barney.stinson@example.com',
                product: 'html-js-bundle',
                date: {
                    started: '2020-09-12',
                    ended: '2021-12-30',
                },
                amount: 460,
                status: 'INACTIVE',
            },
        ],
        posts: POSTS,
        comments: COMMENTS,
        courses: COURSES,
        events: EVENTS,
        members: MEMBERS,
    },
    getters,
    mutations,
});

export default store;
