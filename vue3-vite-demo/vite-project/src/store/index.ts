import { createStore } from "vuex";
import { modules } from "./modules";
import { userState } from "./modules/user/store";
export type State = {
  user: userState;
};

const store = createStore<State>({
  modules,
});

export default store;
