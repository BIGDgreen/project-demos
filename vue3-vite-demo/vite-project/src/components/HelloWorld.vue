<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
// import { useStore } from "vuex";
// import type { State } from "../store";
import { useDemoStore } from "../hooks/use-store";
const { state: demoState, getters } = useDemoStore();

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
// const { state: demoState, getters } = useStore<State>();
console.log("vuex数据", demoState.user);
console.log("getters", getters["user/isLogin"]);
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
