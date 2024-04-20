import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import _ from "lodash";
import { authGuard } from "./services/authGuard";

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
    component: () => import("./components/master/features/NotFound/NotFoundComponent.vue"),
  },
  {
    path: "/page-build",
    name: "Page Build",
    component: () => import("./components/master/features/PageBuild/PageBuildComponent.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./components/master/features/Login/LoginComponent.vue"),
  },
  {
    path:"/page-manage",
    name:"Page Manage",
    component:()=>import("./components/master/features/PageManage/PageManageComponent.vue"),
    meta: { requiresAuth: true },
  }
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
