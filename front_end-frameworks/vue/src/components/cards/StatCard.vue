<script setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40"
  >
    <dd class="text-3xl font-black text-white">{{ value }}</dd>
    <dt class="mt-1 text-xs text-slate-400">{{ label }}</dt>
  </div>
</template>
