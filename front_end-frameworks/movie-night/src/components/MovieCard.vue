<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-slate-700"
  >
    <button
      type="button"
      class="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-red-600 hover:text-white"
      aria-label="Ajouter aux favoris"
    >
      <span>♡</span>
    </button>
    <div class="rounded-xl bg-slate-900 p-4">
      <div class="relative overflow-hidden">
        <img :src="movie.image" :alt="movie.title" class="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <h3 class="mt-2 font-bold text-white">{{ movie.title }}</h3>
      <p class="text-sm text-slate-400">
        ★ {{ movie.rating }} · {{ movie.year }}
      </p>
      <p class="text-xs text-slate-500">{{ movie.category }}</p>
    </div>
    <button
    type="button"
    class="mt-3 w-full rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
    
    >
        Voir le détail
    </button>
  </div>
</template>
