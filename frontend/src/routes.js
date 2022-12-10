import Vue from "vue";
import Router from "vue-router";
//import { createRouter } from 'vue-router';
//import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
  getAuth, onAuthStateChanged, User,
} from 'firebase/auth';
//import { ref } from 'vue';
import { ref } from "@vue/composition-api"

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/test",
            name: "Test",
            authRequired: false,
            component: () => import("./components/Test"),
        },
        {
            path: "/",
            name: "Users",
            authRequired: false,
            component: () => import("./components/Users"),
        },
        {
            path: "/users",
            name: "Users",
            authRequired: false,
            component: () => import("./components/Users"),
        },
        {
            path: "/user/:id",
            name: "User",
            authRequired: false,
            component: () => import("./components/User"),
        },
        {
            path: "/user/:id/status",
            name: "User",
            authRequired: false,
            component: () => import("./components/Status"),
        },
        {
            path: "/users/home",
            name: "Frontpage",
            authRequired: false,
            component: () => import("./components/Frontpage"),
        },
        {
            path: "/user/:id/next",
            name: "Next",
            authRequired: false,
            component: () => import("./components/Next"),
        },
        {
            path: "/users/login",
            name: "Login",
            authRequired: false,
            component: () => import("./components/LoginView"),
        },
    ]});


export default router;
  