<script>
  /** @type {{ href?: string, variant?: string, class?: string, children?: import('svelte').Snippet }} */
  let {
    href,
    variant = "primary",
    class: className = "",
    children,
    ...rest
  } = $props();

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition-colors";
  const variantClasses = $derived(
    variant === "primary"
      ? "bg-violet-600 shadow-lg shadow-violet-600/40 hover:bg-violet-700"
      : "border border-slate-800 bg-slate-950 hover:bg-slate-900",
  );

  const classes = $derived(`${baseClasses} ${variantClasses} ${className}`);
</script>

{#if href}
  <a {href} class={classes} {...rest}>
    {@render children?.()}
  </a>
{:else}
  <button class={classes} {...rest}>
    {@render children?.()}
  </button>
{/if}
