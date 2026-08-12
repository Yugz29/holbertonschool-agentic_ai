<script setup>
import { ref, onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import MovieCard from "./components/MovieCard.vue";

const movies = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

async function loadMovies() {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch("/data/movies.json");

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des films.");
    }

    const data = await response.json();
    movies.value = data;
  } catch (error) {
    errorMessage.value = "Une erreur est survenue pendant le chargement.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadMovies();
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-950 text-slate-100">
    <AppHeader :favorites-count="0" />

    <main class="mx-auto w-full max-w-6xl flex-1 px-6 py-12 lg:px-8">
      <!-- Intro -->
      <section class="mb-10">
        <h1 class="text-4xl font-extrabold tracking-tight text-white">
          Que voulez-vous regarder ce soir ?
        </h1>
        <p class="mt-3 text-lg text-slate-400">
          Parcourez, filtrez et gardez vos films préférés.
        </p>
      </section>

      <!-- Catalogue -->
      <section id="catalogue">
        <!-- État chargement -->
        <div
          v-if="isLoading"
          class="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-8"
        >
          <div
            class="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-pink-600"
          ></div>
          <p class="text-xl font-bold text-slate-200">
            Chargement des films...
          </p>
          <p class="text-sm text-slate-400">Préparation de votre sélection</p>
        </div>

        <!-- Placeholder (sera remplacé par la vraie grille à l'étape 4) -->
        <div
          v-else-if="errorMessage"
          class="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center"
        >
          <p class="text-xl font-bold text-slate-200">
            Impossible de charger les films
          </p>
          <p class="text-sm text-slate-400">{{ errorMessage }}</p>
          <button
            type="button"
            class="mt-2 rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-500"
            @click="loadMovies"
          >
            Réessayer
          </button>
        </div>
        <div
          v-else
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
      </section>
      <!-- A delete -->
    </main>

    <AppFooter />
  </div>
</template>
