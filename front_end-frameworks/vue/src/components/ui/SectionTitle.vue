<script setup>
import { computed } from "vue";

const props = defineProps({
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "section",
  },
  accent: {
    type: String,
    default: null,
  },
});

const isHero = computed(() => props.variant === "hero");
const tag = computed(() => (isHero.value ? "h1" : "h2"));
const accentClass = computed(
  () => props.accent ?? (isHero.value ? "text-violet-300" : "text-violet-400"),
);
</script>

<template>
  <component
    :is="tag"
    :class="[
      'mt-6 leading-none font-black tracking-tight text-white',
      isHero ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl',
    ]"
  >
    {{ line1 }}
    <br />
    <span :class="accentClass">{{ line2 }}</span>
  </component>
</template>
