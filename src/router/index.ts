import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/volcano/:id', component: () => import('../views/VolcanoDetailView.vue') },
        { path: '/insights', component: () => import('../views/InsightsView.vue') }
    ],
})

export default router