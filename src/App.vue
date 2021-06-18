<script setup lang="ts">
import { ref } from "vue";
import Editor from "./components/Editor.vue";
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
    <pre>{{ content }}</pre>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
