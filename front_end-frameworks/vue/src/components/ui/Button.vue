<script setup>
defineProps({
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: "primary",
  },
});

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition-colors";
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="[
      baseClasses,
      variant === 'primary'
        ? 'bg-violet-600 shadow-lg shadow-violet-600/40 hover:bg-violet-700'
        : 'border border-slate-800 bg-slate-950 hover:bg-slate-900',
    ]"
  >
    <slot />
  </a>
  <button
    v-else
    :class="[
      baseClasses,
      variant === 'primary'
        ? 'bg-violet-600 shadow-lg shadow-violet-600/40 hover:bg-violet-700'
        : 'border border-slate-800 bg-slate-950 hover:bg-slate-900',
    ]"
  >
    <slot />
  </button>
</template>
