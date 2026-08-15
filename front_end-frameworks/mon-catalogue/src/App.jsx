import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import AppFooter from "./components/AppFooter.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

const CATEGORIES = ["Tous", "Action", "Comédie", "Science-fiction", "Animation"];

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentView, setCurrentView] = useState("films");
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function loadMovies() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(`${import.meta.env.BASE_URL}data/movies.json`);

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

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tous" || movie.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const favoriteMovies = movies.filter((movie) => movie.favorite);
  const favoritesCount = favoriteMovies.length;
  const openedMovie = selectedMovie
    ? movies.find((movie) => movie.id === selectedMovie.id)
    : null;

  function resetFilters() {
    setSearch("");
    setSelectedCategory("Tous");
  }

  function toggleFavorite(movieId) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  }

  function renderGrid(list) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {list.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={toggleFavorite}
            onViewDetails={setSelectedMovie}
          />
        ))}
      </div>
    );
  }

  function renderFavorites() {
    if (favoriteMovies.length === 0) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 px-6 py-16 text-center">
          <p className="text-sm font-medium text-slate-400">
            Aucun favori pour le moment.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView("films")}
            className="rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Parcourir les films
          </button>
        </div>
      );
    }

    return renderGrid(favoriteMovies);
  }

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

    if (currentView === "favorites") {
      return renderFavorites();
    }

    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative lg:w-80">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
              &#9906;
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un film..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 py-3 pl-12 pr-4 text-sm font-medium text-slate-100 placeholder:text-slate-500 focus:border-rose-500/50 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white"
                    : "border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredMovies.length > 0 ? (
          renderGrid(filteredMovies)
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 px-6 py-16 text-center">
            <p className="text-sm font-medium text-slate-400">
              Aucun film ne correspond à votre recherche.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <AppHeader
        favoritesCount={favoritesCount}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

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

      {openedMovie && (
        <MovieDetails
          movie={openedMovie}
          onClose={() => setSelectedMovie(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;
