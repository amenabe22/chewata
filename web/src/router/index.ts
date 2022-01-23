import { createRouter, createWebHistory } from 'vue-router'

interface RoutesType {
    path: string;
    name: string;
    component: () => {};
    meta?: {
        index?: number;
        keepAlive?: boolean;
    };
    children?: RoutesType[];
}

const routes: RoutesType[] = [

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router