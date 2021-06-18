import {
  compile,
  computed,
  h,
  onErrorCaptured,
  RenderFunction,
  Ref,
  defineComponent,
  toRefs,
  isRef,
} from "vue";
import { CompilerError } from "@vue/compiler-sfc";
import marked from "marked";
import { components, utils } from "visualia";

export const compileMarkdown = (markdown: string) => {
  const errors: CompilerError[] = [];
  let compiledMarkdown: RenderFunction | undefined = undefined;
  const parsedMarkdown = marked(markdown, {
    breaks: true,
  });
  try {
    const compilingdMarkdown = compile(parsedMarkdown, {
      onError: (err) => {
        errors.push(err);
      },
    });
    compiledMarkdown = compilingdMarkdown;
  } catch (e) {
    errors.push(e);
  }
  return { compiledMarkdown, errors };
};

export const useCompiler = (markdown: Ref | string) => {
  const compiledContent = computed(() =>
    defineComponent({
      components,
      setup() {
        onErrorCaptured((e) => console.log(e));
        return { ...utils };
      },
      render: compileMarkdown(isRef(markdown) ? markdown.value : markdown)
        .compiledMarkdown,
    })
  );

  return compiledContent;
};
