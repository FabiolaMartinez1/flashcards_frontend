
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../view/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        // component: HomeView
        component: () => import('../view/HomeView.vue')
    },
    {
        path: '/topic',
        name: 'Topics',
        component: () => import('../view/TopicView.vue')
    },
    // {
    //     path: '/topic/:id',
    //     name: 'TopicDetail',
    //     component: () => import('../view/TopicDetailView.vue')
    // },
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