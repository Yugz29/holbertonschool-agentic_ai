import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import AppFooter from "./components/AppFooter.jsx";
import MovieCard from "./components/MovieCard.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadMovies() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/data/movies.json");

      if (!response.ok) {
        throw new Error(
          `Impossible de charger les films (erreur ${response.status}).`
        );
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setErrorMessage(error.message || "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function renderContent() {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 px-6 py-16">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-rose-500" />
          <p className="text-sm font-medium text-slate-400">
            Chargement des films...
          </p>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-rose-500/30 bg-slate-900 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white">
            Oups, le catalogue n'a pas pu être chargé.
          </p>
          <p className="text-sm text-slate-400">{errorMessage}</p>
          <button
            type="button"
            onClick={loadMovies}
            className="rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Réessayer
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <AppHeader favoritesCount={0} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 lg:px-8">
        <section className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Que voulez-vous regarder ce soir ?
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Parcourez, filtrez et gardez vos films préférés.
          </p>
        </section>

        {renderContent()}
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
