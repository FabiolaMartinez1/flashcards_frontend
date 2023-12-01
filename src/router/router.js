
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import MyTopicsView from '../view/MyTopicsView.vue';
import FavoriteTopicsView from '../view/FavoriteTopicsView.vue';
import SharedTopicsView from '../view/SharedTopicsView.vue';
import AccessUserTopicView from '../view/AccessUserTopicView.vue';
import CardsView from '../view/CardsView.vue'; //../components/TagManagement.vue'; 
import StudyModeView from '../view/StudyModeView.vue';
// import TagManagement from '../components/TagManagement.vue';

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
    {
        path: '/topics/:topicId/shared',
        name: 'AccessUserTopic',
        component: AccessUserTopicView,
        props: true
    },
    {
        path: '/topics/:topicId/cards',
        name: 'ViewCards',
        component: CardsView,
        props: true
    },
    {
        path: '/topics/cards/:topicId/study',
        name: 'ViewStudyMode',
        component: StudyModeView,
        props: true
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