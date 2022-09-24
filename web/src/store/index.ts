import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  createLogger,
} from "vuex";
import { State, state } from "./state";
import { Mutations, mutations } from "./mutations";
import createPersistedState from "vuex-persistedstate";

export const store = createStore<State>({
  plugins: [createPersistedState()],
  // process.env.NODE_ENV === "development"
  //   ? [createLogger(), createPersistedState()]
  //   : [createPersistedState()],
  state,
  mutations,
  // actions,
  // getters
});

export function useStore() {
  return store as Store;
}

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};
