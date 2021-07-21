<template>
  <div class="home">
    <button @click="handleClick">click here</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import to from "await-to-js";

interface ServerResponse {
  test: string;
}

@Component({
  name: "Home",
})
export default class extends Vue {
  data: string | undefined = "";

  async handleClick() {
    console.log("clicked");
    const [err, res] = await to<ServerResponse>(this.middleFn());
    console.log(err, res);
    this.data = res?.test;
  }

  async middleFn(): Promise<ServerResponse> {
    return await this.asyncFn();
  }

  asyncFn(): Promise<ServerResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("fake 一个请求...");
        resolve({ test: "return a result" });
        // reject("occured an error");
        // reject({
        //   code: 1005,
        //   data: null,
        //   msg: "",
        // });
      });
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return Promise.reject(err);
      }) as Promise<ServerResponse>;
  }
}
</script>
