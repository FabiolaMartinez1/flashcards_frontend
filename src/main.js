import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue'
import router from './router/router.js'
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(
    createAuth0({
    domain: "dev-qtw16en7kwogaxhe.us.auth0.com",
    clientId: "dj3A5bhYH4bo0uoXeVngLr7ffOaPn06g",
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "http://localhost:8081/api/v1/login"
    }
    })
);

app.mount('#app');

// createApp(App).mount('#app')
