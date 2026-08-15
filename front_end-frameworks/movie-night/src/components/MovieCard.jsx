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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-amber-400 backdrop-blur">
          &#9733; {movie.rating}
        </span>

        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-pressed={movie.favorite}
          aria-label={
            movie.favorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-lg backdrop-blur transition hover:bg-slate-950 ${
            movie.favorite ? "text-rose-500" : "text-slate-400"
          }`}
        >
          &#9829;
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-lg font-bold leading-tight text-white">
          {movie.title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{movie.year}</span>
          <span className="text-slate-600">&bull;</span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold text-slate-300">
            {movie.category}
          </span>
        </div>

        <button
          type="button"
          onClick={handleViewDetails}
          className="mt-auto rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Voir le détail
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
