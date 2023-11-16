
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import TopicView from '../view/TopicView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/topics',
        name: 'Topics',
        component: TopicView
    },
    {
        path: '/topics/favorite',
        name: 'TopicsFavorite',
        component: TopicView
    },
    {
        path: '/topics/shared',
        name: 'TopicsShared',
        component: TopicView
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