<template>
  <div class="about">
    <button @click="handleClick">click here</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import to from "@/utils/await-to-js";

@Component({
  name: "About",
})
export default class extends Vue {
  async handleClick() {
    const [err, res] = await to(this.voidFn());
    console.log(err, res);
  }

  async voidFn() {
    await this.asyncFn();
  }

  asyncFn() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("fake 一个请求...");
        // resolve('return a result')
        reject({
          code: 1005,
          data: null,
          msg: "",
        });
      });
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
</script>
