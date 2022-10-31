import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "Users",
            component: () => import("./components/Users"),
        },
        {
            path: "/users",
            name: "Users",
            component: () => import("./components/Users"),
        },
        {
            path: "/user/:id",
            name: "User",
            component: () => import("./components/User"),
        },
        {
            path: "/user/:id/status",
            name: "User",
            component: () => import("./components/Status"),
        },
        {
            path: "/users/home",
            name: "Frontpage",
            component: () => import("./components/Frontpage"),
        },
        {
            path: "/user/:id/next",
            name: "Next",
            component: () => import("./components/Next"),
        },
    ]
});

export default router;