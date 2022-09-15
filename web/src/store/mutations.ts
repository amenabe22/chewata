import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
  SetUser = "SET_USER",
  SetLoggedIn = "SET_LOGGEDIN",
  SetMainPop = "SET_MAIN_POP",
  SetLoginPop = "SET_LOGIN_POP",
  SetProfilePop = "SET_PROFILE_POP",
}

export type Mutations = {
  [MutationType.SetUser]: (state: State, data: any) => void;
  [MutationType.SetLoggedIn](state: State, value: boolean): void;
  [MutationType.SetMainPop](state: State, value: boolean): void;
  [MutationType.SetLoginPop](state: State, value: boolean): void;
  [MutationType.SetProfilePop](state: State, value: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetUser](state, data) {
    state.user = data;
  },
  [MutationType.SetLoggedIn](state, value) {
    state.loggedIn = value;
  },
  [MutationType.SetMainPop](state, value) {
    state.showMainDialog = value;
  },
  [MutationType.SetLoginPop](state, value) {
    state.loginPopup = value;
  },
  [MutationType.SetProfilePop](state, value) {
    state.profilePopup = value;
  },
};
