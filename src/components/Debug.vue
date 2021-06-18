<script setup lang="ts">
import { state as data } from "visualia";
import { computed, ref } from "vue";
const formattedData = computed(() =>
  Object.entries(data)
    .map(([key, value]) => `data.${key} = ${value}`)
    .join("\n")
);
</script>

<template>
  <div
    style="
      position: fixed;
      right: 24px;
      bottom: 24px;
      border: 1px solid black;
      padding: 10px;
      font-family: var(--mono);
      font-size: 0.8em;
      font-feature-settings: liga 0, calt 0;
      white-space: pre-wrap;
      opacity: 0.7;
      border-radius: 4px;
      background: black;
      color: white;
      width: 250px;
      overflow: auto;
    "
  >
    {{ formattedData || "data is empty" }}
  </div>
</template>
