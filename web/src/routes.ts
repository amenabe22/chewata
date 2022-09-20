import { RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Profile from "../views/Profile.vue";
import PublicProfile from "../views/PublicProfile.vue";
import Notification from "../views/Notification.vue";

export const routes: RouteRecordRaw[] = [
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
