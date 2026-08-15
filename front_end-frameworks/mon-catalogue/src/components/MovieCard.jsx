function MovieCard({ movie, onToggleFavorite, onViewDetails }) {
  function handleToggleFavorite(event) {
    event.stopPropagation();
    onToggleFavorite(movie.id);
  }

  function handleViewDetails(event) {
    event.stopPropagation();
    onViewDetails(movie);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="relative aspect-[2/3] overflow-hidden bg-bg">
        <img
          src={movie.posterImage}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-lg bg-bg/80 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur">
          &#9733; {movie.personalRating}
        </span>

        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-pressed={movie.favorite}
          aria-label={
            movie.favorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-lg backdrop-blur transition hover:bg-bg ${
            movie.favorite ? "text-accent" : "text-muted"
          }`}
        >
          &#9829;
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="font-display text-2xl uppercase leading-tight tracking-[0.08em] text-text">
          {movie.title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-muted">
          <span>{movie.year}</span>
          <span className="text-muted/50">&bull;</span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold text-muted">
            {movie.category}
          </span>
        </div>

        <button
          type="button"
          onClick={handleViewDetails}
          className="mt-auto rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-text transition hover:opacity-90"
        >
          Voir le détail
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
