import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import AppFooter from "./components/AppFooter.jsx";
import Hero from "./components/Hero.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
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

  const sortedMovies = [...movies].sort((a, b) =>
    (b.watchedOn || "").localeCompare(a.watchedOn || "")
  );

  const filteredMovies = sortedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const favoriteMovies = sortedMovies.filter((movie) => movie.favorite);
  const coupsDeCoeur = sortedMovies.filter((movie) => movie.coupDeCoeur);
  const favoritesCount = favoriteMovies.length;
  const openedMovie = selectedMovie
    ? movies.find((movie) => movie.id === selectedMovie.id)
    : null;

  function toggleFavorite(movieId) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  }

  function renderGrid(list) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-surface px-6 py-16 text-center">
          <p className="text-sm font-medium text-muted">
            Aucun favori pour le moment.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView("films")}
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-text transition hover:opacity-90"
          >
            Parcourir les films
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <h1 className="font-display text-4xl uppercase tracking-[0.12em] text-text">
          Mes favoris
        </h1>

        {renderGrid(favoriteMovies)}
      </div>
    );
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-surface px-6 py-16">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
          <p className="text-sm font-medium text-muted">
            Chargement des films...
          </p>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-surface px-6 py-16 text-center">
          <p className="text-lg font-semibold text-text">
            Oups, le catalogue n'a pas pu être chargé.
          </p>
          <p className="text-sm text-muted">{errorMessage}</p>
          <button
            type="button"
            onClick={loadMovies}
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-text hover:opacity-90"
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-display text-4xl uppercase tracking-[0.12em] text-text">
            Tous les films
          </h1>

          <div className="relative w-full lg:w-96">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted">
              &#9906;
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un film..."
              className="w-full rounded-xl border border-white/10 bg-surface py-3 pl-12 pr-4 text-sm font-medium text-text placeholder:text-muted focus:border-accent/50 focus:outline-none"
            />
          </div>
        </div>

        {filteredMovies.length > 0 ? (
          renderGrid(filteredMovies)
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-surface px-6 py-16 text-center">
            <p className="text-sm font-medium text-muted">
              Aucun film ne correspond à votre recherche.
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-text transition hover:opacity-90"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>
    );
  }

  const showHero = currentView === "films" && !isLoading && !errorMessage;

  return (
    <div className="flex min-h-screen flex-col bg-bg font-sans text-text">
      <AppHeader
        favoritesCount={favoritesCount}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className="w-full flex-1">
        {showHero && <Hero featuredMovies={coupsDeCoeur} />}

        <div className="w-full px-4 py-10 md:px-8">{renderContent()}</div>
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
