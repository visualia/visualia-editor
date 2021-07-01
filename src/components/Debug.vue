<script setup lang="ts">
import { v } from "visualia";
import { computed, ref } from "vue";
const formattedV = computed(() =>
  Object.entries(v)
    .map(([key, value]) => `v.${key} = ${value}`)
    .join("\n")
);
</script>

<template>
  <div
    v-show="formattedV"
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
    {{ formattedV }}
  </div>
</template>
