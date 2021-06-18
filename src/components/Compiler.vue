<script lang="ts">
import { defineComponent, h, onErrorCaptured, toRefs } from "vue";
import { useCompiler } from "../lib";

export default defineComponent({
  props: { markdown: { type: String, default: "" } },
  setup(props) {
    onErrorCaptured((e) => console.log(e));
    const { markdown } = toRefs(props);
    const compiledMarkdown = useCompiler(markdown);
    return () =>
      h("div", { style: { padding: "24px" } }, h(compiledMarkdown.value));
  },
});
</script>
