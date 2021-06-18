<script setup lang="ts">
import { defineProps, defineEmit, ref, onMounted, watch } from "vue";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

const props =
  defineProps<{
    modelValue?: string;
  }>();

const emit = defineEmit<(e: "update:modelValue", value: string) => string>();

// Set up Monaco workers

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "html") {
      return new htmlWorker();
    }
    return new editorWorker();
  },
};

// Set up a custom visualia language

// https://github.com/microsoft/monaco-languages/blob/master/src/markdown/markdown.ts
// https://github.com/microsoft/monaco-languages/blob/master/src/html/html.ts#L17

const editorRef = ref(null);

onMounted(() => {
  const editor = monaco.editor.create(editorRef.value!, {
    language: "html",
    theme: "vs-dark",
    fontSize: 15,
    wordWrap: "wordWrapColumn",
    wordWrapColumn: 70,
    lineNumbers: "off",
    renderLineHighlight: "none",
    minimap: {
      enabled: false,
    },
    padding: { top: 24 },
  });
  const model = editor.getModel();
  if (model) {
    model.updateOptions({ tabSize: 2 });
  }
  editor.onDidChangeModelContent((e) => {
    emit("update:modelValue", editor.getValue());
  });

  watch(
    () => props.modelValue,
    (content) => {
      if (content !== editor.getValue()) {
        if (model) {
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: content || "",
              },
            ],
            () => null
          );
        }
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <div ref="editorRef"></div>
</template>
