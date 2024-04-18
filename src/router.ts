import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/components/master/features/Home/HomeComponent.vue";
import LoginComponent from "./components/master/features/Login/LoginComponent.vue";
import _ from "lodash";
import { authGuard } from "./services/authGuard";
import NotFoundComponent from "./components/master/features/NotFound/NotFoundComponent.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: '/:pathMatch(.*)*',
    redirect:'/not-found'
  },
  {
    path: "/not-found",
    name: "Not Found",
    component: NotFoundComponent,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeComponent,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    authGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
