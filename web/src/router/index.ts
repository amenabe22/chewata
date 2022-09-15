import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  createWebHashHistory,
  RouteLocationNormalized,
} from "vue-router";

import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Profile from "../views/Profile.vue";
import Notification from "../views/Notification.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing",
    component: Home,
  },
  {
    path: "/game/:id",
    name: "Game",
    component: Game,
  },
  {
    path: "/user",
    name: "User",
    component: Profile,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const user = localStorage.getItem("user");
    if (to.meta.type === "login" && user) {
      next({ name: "home" });
      return;
    }

    if (to.meta.type === "home" && !user) {
      next({ name: "login" });
      return;
    }

    next();
  }
);

export default router;
