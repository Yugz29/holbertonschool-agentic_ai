<script>
  let { children } = $props();
</script>

<p
  class="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300"
>
  {@render children?.()}
</p>
