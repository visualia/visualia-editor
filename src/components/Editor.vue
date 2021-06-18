<script setup lang="ts">
import { defineProps, defineEmit, ref, onMounted, watch } from "vue";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

const props =
  defineProps<{
    modelValue?: string;
  }>();

const emit = defineEmit<(e: "update:modelValue", value: string) => string>();

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const editorRef = ref(null);

onMounted(() => {
  const editor = monaco.editor.create(editorRef.value, {
    language: "typescript",
    theme: "vs-dark",
    fontSize: "15px",
    wordWrap: "wordWrapColumn",
    wordWrapColumn: 70,
    lineNumbers: "off",
    minimap: {
      enabled: false,
    },
  });
  const model = editor.getModel();
  model.updateOptions({ tabSize: 2 });

  editor.onDidChangeModelContent((e) => {
    emit("update:modelValue", editor.getValue());
  });

  watch(
    () => props.modelValue,
    (content) => {
      if (content !== editor.getValue()) {
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: content,
            },
          ]
        );
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <div ref="editorRef"></div>
</template>
