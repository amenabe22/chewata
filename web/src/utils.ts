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

export const setTheme = (mode: string) => {
  if (mode == "dark") {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }
};
export const parseDate = (timestamp: any) => {
  return new Date(timestamp).toLocaleDateString();
};
