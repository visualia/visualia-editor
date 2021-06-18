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

// Set up Monaco workers

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
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

// Set up a custom visualia language

// https://github.com/microsoft/monaco-languages/blob/master/src/markdown/markdown.ts
// https://github.com/microsoft/monaco-languages/blob/master/src/html/html.ts#L17

monaco.languages.register({ id: "visualia" });

//@ts-ignore
monaco.languages
  .getLanguages()
  .filter(({ id }) => id == "markdown")[0]
  .loader()
  .then(({ language, conf }) => {
    // https://github.com/microsoft/monaco-languages/blob/master/src/html/html.ts#L17
    conf.wordPattern =
      /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g;
    monaco.languages.setLanguageConfiguration("visualia", conf);

    language.tokenizer.html = [
      [/<([\w-]+)\/>/, "tag"],
      [
        /<([\w-]+)/,
        {
          cases: {
            "@empty": { token: "tag", next: "@tag.$1" },
            "@default": { token: "tag", next: "@tag.$1" },
          },
        },
      ],
      [/<\/([\w-]+)\s*>/, { token: "tag" }],
      [/<!--/, "comment", "@comment"],
    ];
    monaco.languages.setMonarchTokensProvider("visualia", language);
  });
const editorRef = ref(null);

onMounted(() => {
  const editor = monaco.editor.create(editorRef.value!, {
    language: "visualia",
    theme: "vs-dark",
    fontSize: 15,
    wordWrap: "wordWrapColumn",
    wordWrapColumn: 70,
    lineNumbers: "off",
    minimap: {
      enabled: false,
    },
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
