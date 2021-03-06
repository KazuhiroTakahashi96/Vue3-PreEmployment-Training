import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      children: [
        {
          path: "edit",
          name: "edit",
          component: () => import("../views/EditView.vue"),
        },
      ],
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("../views/PaymentView.vue"),
    },
    {
      path: "/payment/Completed",
      name: "paymentCompleted",
      component: () => import("../views/PaymentCompletedView.vue"),
    },
  ],
});

export default router;
