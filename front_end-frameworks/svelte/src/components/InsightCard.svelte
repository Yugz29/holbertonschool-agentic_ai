<script>
  /** @type {{ category: string, title: string, description: string, image: string, index: number }} */
  let { category, title, description, image, index } = $props();

  const isFeatured = $derived(index === 0);
</script>

<article
  class={`group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 ${
    isFeatured ? "sm:col-span-2" : ""
  }`}
>
  <div
    class={`relative w-full overflow-hidden ${isFeatured ? "h-64" : "h-56"}`}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
    />

    <div
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-60"
    ></div>

    <span
      class="absolute bottom-4 left-4 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300 backdrop-blur-sm"
    >
      {category}
    </span>
  </div>

  <div class="p-8">
    <h3 class={`font-bold text-slate-50 ${isFeatured ? "text-2xl" : "text-xl"}`}>
      {title}
    </h3>
    <p class="mt-2 text-sm text-slate-300 md:text-base">{description}</p>
  </div>
</article>
