<script>
  let { icon: Icon, title, description } = $props();
</script>

<article
  class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
>
  <div
    class="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40"
  >
    <Icon class="h-6 w-6 text-white" />
  </div>

  <h3 class="mt-6 text-lg font-semibold text-white">{title}</h3>

  <p class="mt-2 text-sm leading-6 text-slate-400">{description}</p>
</article>
