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

export function compileMarkdown(markdown: string) {
  const errors: CompilerError[] = [];
  let compiledMarkdown: RenderFunction | undefined = undefined;
  const parsedMarkdown = marked(markdown, {
    breaks: true,
  });
  try {
    const compilingdMarkdown = compile(parsedMarkdown, {
      onError: (error) => {
        errors.push(error);
      },
    });
    compiledMarkdown = compilingdMarkdown;
  } catch (e) {
    errors.push(e);
  }
  return { compiledMarkdown, errors };
}

export function useCompiledMarkdown(markdown: Ref) {
  return computed(() =>
    defineComponent({
      components,
      setup() {
        onErrorCaptured((e) => console.log(e));
        return { ...utils };
      },
      render: compileMarkdown(markdown.value).compiledMarkdown,
    })
  );
}
