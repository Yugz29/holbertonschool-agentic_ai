<script>
  let { line1, line2, variant = "section", accent } = $props();

  const isHero = $derived(variant === "hero");
  const Tag = $derived(isHero ? "h1" : "h2");
  const accentClass = $derived(
    accent ?? (isHero ? "text-violet-300" : "text-violet-400"),
  );
</script>

<svelte:element
  this={Tag}
  class={`mt-6 leading-none font-black tracking-tight text-white ${
    isHero ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
  }`}
>
  {line1}
  <br />
  <span class={accentClass}>{line2}</span>
</svelte:element>
