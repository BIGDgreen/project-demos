import { GET_DATA } from "./constant";
import { ActionContext } from "vuex";
import { userState } from "./store";

export default {
  [GET_DATA]({ commit }: ActionContext<userState, unknown>): void {
    console.log("action 执行成功");
    setTimeout(() => {
      const payload = false;
      commit(GET_DATA, payload);
    }, 500);
  },
};
