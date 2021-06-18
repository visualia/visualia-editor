<script setup lang="ts">
import { ref } from "vue";

import Editor from "./components/Editor.vue";
import Compiler from "./components/Compiler.vue";
import Debug from "./components/Debug.vue";

const content = ref("Hello world");
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh">
    <Editor v-model="content" />
    <Compiler :markdown="content" />
  </div>
  <Debug />
</template>

<style>
:root {
  --sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  --mono: "SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono",
    "DejaVu Sans Mono", "Courier New", monospace;
}
body {
  margin: 0;
  font-family: var(--sans-serif);
  color: #2c3e50;
}
pre,
code {
  font-family: var(--mono);
  font-feature-settings: "liga" 0, "calt" 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  font-weight: 600;
}
p {
  margin: 0 0 1rem 0;
  line-height: 1.7;
}
</style>
