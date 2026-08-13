<script>
  import { Sparkles } from "@lucide/svelte";

  /** @type {{ href?: string, variant?: string }} */
  let { href, variant = "header" } = $props();

  const isHeader = $derived(variant === "header");
</script>

{#snippet logo()}
  <span
    class={`flex items-center justify-center text-white shadow-lg shadow-violet-600/25 ${
      isHeader
        ? "h-10 w-10 rounded-xl bg-violet-600"
        : "h-9 w-9 rounded-lg bg-violet-500"
    }`}
  >
    <Sparkles size={isHeader ? 20 : 18} />
  </span>
  <span
    class={`font-semibold text-white ${
      isHeader ? "text-base md:text-lg" : "text-sm"
    }`}
  >
    Agentic AI
  </span>
{/snippet}

{#if href}
  <a {href} class="flex items-center gap-3 justify-self-start">
    {@render logo()}
  </a>
{:else}
  <div class="flex items-center gap-2">
    {@render logo()}
  </div>
{/if}
