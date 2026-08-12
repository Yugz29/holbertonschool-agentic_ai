<script setup>
defineProps({
  favoritesCount: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur"
  >
    <div
      class="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8"
    >
      <!-- Logo / Brand -->
      <a href="#" class="flex items-center gap-3">
        <span
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 to-pink-600 text-xl font-black text-white shadow-lg shadow-rose-500/20"
        >
          M
        </span>
        <span class="text-2xl font-extrabold tracking-tight text-white">
          MOVIE NIGHT
        </span>
      </a>

      <!-- Actions -->
      <nav class="flex items-center gap-3">
        <a
          href="#catalogue"
          class="rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/5"
        >
          Films
        </a>
        <a
          href="#favoris"
          class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
        >
          <span class="text-rose-500">&#9829;</span>
          Favoris
          <span class="text-slate-400">{{ favoritesCount }}</span>
        </a>
      </nav>
    </div>
  </header>
</template>
