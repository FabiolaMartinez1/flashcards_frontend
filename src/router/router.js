
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import MyTopicsView from '../view/MyTopicsView.vue';
import FavoriteTopicsView from '../view/FavoriteTopicsView.vue';
import SharedTopicsView from '../view/SharedTopicsView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/topics',
        name: 'MyTopics',
        component: MyTopicsView
    },
    {
        path: '/topics/favorite',
        name: 'FavoriteTopics',
        component: FavoriteTopicsView
    },
    {
        path: '/topics/shared',
        name: 'SharedTopics',
        component: SharedTopicsView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to) => {
//     if (to.name === 'Home') {
//     const itemToRemove = localStorage.getItem('token');
//     if (itemToRemove) {
//         localStorage.removeItem('token');
//     }
//     }
// });

export default router;