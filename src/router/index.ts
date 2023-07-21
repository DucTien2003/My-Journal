import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: {
      layout: "auth-layout",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
    meta: {
      layout: "auth-layout",
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "../views/auth/ForgotPassword.vue"
      ),
    meta: {
      layout: "auth-layout",
    },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () =>
      import(
        /* webpackChunkName: "reset-password" */ "../views/auth/ResetPassword.vue"
      ),
    meta: {
      layout: "auth-layout",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
    meta: {
      layout: "default-layout",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next("/login");
  } else {
    next();
  }
});

export default router;
