import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  createWebHashHistory,
  RouteLocationNormalized,
  createWebHistory,
} from "vue-router";
import Post from "../views/Post.vue";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import TagView from "../views/TagView.vue";
import Profile from "../views/Profile.vue";
import PublicProfile from "../views/PublicProfile.vue";
import Notification from "../views/Notification.vue";
import Privacy from "../views/Privacy.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing",
    component: Home,
  },
  {
    path: "/tag/:tag",
    name: "TagView",
    component: TagView,
  },
  {
    path: "/post",
    name: "Post",
    component: Post,
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
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
  },
  {
    path: "/user/:uid",
    name: "UserPublic",
    component: PublicProfile,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
  },
];

const router = createRouter({
  history: createWebHistory(),
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
