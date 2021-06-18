<script setup lang="ts">
import { ref } from "vue";

import Editor from "./components/Editor.vue";
import Compiler from "./components/Compiler.vue";

import { useCompiler } from "./lib";

const content = ref("Hello world");
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100vh;
      border: 2px solid red;
    "
  >
    <Editor v-model="content" />
    <Compiler :markdown="content" />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
