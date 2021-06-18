<script setup lang="ts">
import { state } from "visualia";
import { computed, ref } from "vue";
const formattedState = computed(() =>
  Object.entries(state)
    .map(([key, value]) => `${stateName.value}.${key} = ${value}`)
    .join("\n")
);
const index = ref(0);
const stateName = computed(() => ["v", "vvv", "data"][index.value % 3]);
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
    @click="index++"
  >
    {{ formattedState ? formattedState : stateName + " is empty" }}
  </div>
</template>
