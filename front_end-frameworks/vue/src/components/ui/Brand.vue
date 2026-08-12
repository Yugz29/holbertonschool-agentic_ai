<script setup>
import { computed } from "vue";
import { Sparkles } from "lucide-vue-next";

const props = defineProps({
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: "header",
  },
});

const isHeader = computed(() => props.variant === "header");
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="flex items-center gap-3 justify-self-start"
  >
    <span
      :class="[
        'flex items-center justify-center text-white shadow-lg shadow-violet-600/25',
        isHeader
          ? 'h-10 w-10 rounded-xl bg-violet-600'
          : 'h-9 w-9 rounded-lg bg-violet-500',
      ]"
    >
      <Sparkles :size="isHeader ? 20 : 18" />
    </span>
    <span
      :class="[
        'font-semibold text-white',
        isHeader ? 'text-base md:text-lg' : 'text-sm',
      ]"
    >
      Agentic AI
    </span>
  </a>
  <div v-else class="flex items-center gap-2">
    <span
      :class="[
        'flex items-center justify-center text-white shadow-lg shadow-violet-600/25',
        isHeader
          ? 'h-10 w-10 rounded-xl bg-violet-600'
          : 'h-9 w-9 rounded-lg bg-violet-500',
      ]"
    >
      <Sparkles :size="isHeader ? 20 : 18" />
    </span>
    <span
      :class="[
        'font-semibold text-white',
        isHeader ? 'text-base md:text-lg' : 'text-sm',
      ]"
    >
      Agentic AI
    </span>
  </div>
</template>
