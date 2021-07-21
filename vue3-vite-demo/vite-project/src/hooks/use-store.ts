import { useStore } from "vuex";
import { State } from "../store";
import Getters from "../store/utils";

interface IUserDemoStore {
  state: State;
  getters: Getters;
}
const useDemoStore = (): IUserDemoStore => {
  const { state, getters }: IUserDemoStore = useStore<State>();
  return { state, getters };
};

export { useDemoStore };
