import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
  createWebHistory,
} from "vue-router";
import Post from "../views/Post.vue";
import Home from "../views/Home.vue";
import Community from "../views/Community.vue";
import CommunityPage from "../views/CommunityPage.vue";
import Game from "../views/Game.vue";
import TagView from "../views/TagView.vue";
import PathErr from "../views/PathErr.vue"
import Profile from "../views/Profile.vue";
import PublicProfile from "../views/PublicProfile.vue";
import Notification from "../views/Notification.vue";
import Privacy from "../views/Privacy.vue";
import { authguard } from "../utils";

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
    beforeEnter: (to, from, next) => {
      authguard(to, from, next);
    },
  },
  {
    path: "/jema",
    name: "Community",
    component: Community,
    beforeEnter: (to, from, next) => {
      authguard(to, from, next);
    },
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
    beforeEnter: (to, from, next) => {
      authguard(to, from, next);
    },
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
    path: "/page-err",
    name: "PathErr",
    component: PathErr,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
    beforeEnter: (to, from, next) => {
      authguard(to, from, next);
    },
  },
  {
    path: "/:community",
    name: "CommunityPage",
    component: CommunityPage,
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
