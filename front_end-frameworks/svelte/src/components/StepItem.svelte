<script>
  let { number, title, description } = $props();
</script>

<li class="flex items-start gap-4">
  <span
    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 font-semibold text-white shadow-lg shadow-violet-600/40"
  >
    {number}
  </span>

  <div>
    <h3 class="text-base font-semibold text-white">{title}</h3>

    <p class="mt-1 text-sm leading-6 text-slate-400">{description}</p>
  </div>
</li>
