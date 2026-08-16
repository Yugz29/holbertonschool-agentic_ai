function formatTicketDate(watchedOn) {
  if (!watchedOn) {
    return "";
  }

  const [year, month, day] = watchedOn.split("-");

  return `${day}.${month}.${year.slice(2)}`;
}

function MovieCard({ movie, onToggleFavorite, onViewDetails }) {
  function handleToggleFavorite(event) {
    event.stopPropagation();
    onToggleFavorite(movie.id);
  }

  function handleViewDetails() {
    onViewDetails(movie);
  }

  return (
    <article className="group relative flex flex-col">
      <button
        type="button"
        onClick={handleViewDetails}
        aria-label={`Voir le détail de ${movie.title}`}
        className="flex w-full flex-col gap-3 text-left"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface">
          <img
            src={movie.posterImage}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

          {movie.watchedOn && (
            <span className="absolute bottom-3 left-3 rounded-md border border-dashed border-gold/50 bg-bg/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold backdrop-blur">
              {formatTicketDate(movie.watchedOn)}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="font-display text-2xl uppercase leading-tight tracking-[0.08em] text-text">
            {movie.title}
          </h2>

          <p className="flex items-baseline gap-1.5 text-gold">
            <span className="text-lg leading-none">&#9733;</span>
            <span className="text-3xl font-bold leading-none">
              {movie.personalRating}
            </span>
            <span className="text-sm font-semibold text-muted">/ 10</span>
          </p>

          {movie.personalNote && (
            <p className="line-clamp-2 text-xs italic leading-relaxed text-muted">
              {movie.personalNote}
            </p>
          )}
        </div>
      </button>

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
    </article>
  );
}

export default MovieCard;
