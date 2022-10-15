import router from "./router";
import { store } from "./store";

const ustate = store.state.user;
const loggedIn = store.state.loggedIn;

export const authguard = (to: any, form: any, next: any) => {
  console.log("dawg", loggedIn, ustate);
  if (!loggedIn || !ustate) {
    router.push("/");
  }
  next();
};
