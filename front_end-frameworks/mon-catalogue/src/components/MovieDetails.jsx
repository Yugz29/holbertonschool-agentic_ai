import { useEffect } from "react";

function formatWatchedOn(watchedOn) {
  if (!watchedOn) {
    return "";
  }

  const [year, month, day] = watchedOn.split("-");

  return `${day}/${month}/${year}`;
}

function MovieDetails({ movie, onClose, onToggleFavorite }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la fenêtre"
        className="absolute inset-0 h-full w-full cursor-default bg-bg/80 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={movie.title}
        className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-surface shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-lg text-muted backdrop-blur transition hover:bg-bg hover:text-text"
        >
          &times;
        </button>

        <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
          <img
            src={movie.posterImage}
            alt={movie.title}
            className="mx-auto w-40 shrink-0 rounded-xl bg-bg object-cover sm:w-48 md:mx-0 md:w-56"
          />

          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="pr-12 font-display text-4xl uppercase tracking-[0.08em] text-text">
                {movie.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="font-bold text-gold">
                  &#9733; {movie.personalRating}
                </span>
                <span className="text-muted/50">&bull;</span>
                <span>{movie.year}</span>
                <span className="text-muted/50">&bull;</span>
                <span>{movie.duration}</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold text-muted">
                  {movie.category}
                </span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-text/80">
              {movie.description}
            </p>

            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-accent-soft p-4">
              {movie.watchedOn && (
                <p className="text-sm font-semibold text-text">
                  Vu le {formatWatchedOn(movie.watchedOn)}
                </p>
              )}

              {movie.personalNote && (
                <p className="text-sm italic leading-relaxed text-muted">
                  &laquo; {movie.personalNote} &raquo;
                </p>
              )}
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onToggleFavorite(movie.id)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-90 ${
                  movie.favorite
                    ? "border border-accent/40 bg-accent-soft text-accent"
                    : "bg-accent text-text"
                }`}
              >
                {movie.favorite
                  ? "♥ Retirer des favoris"
                  : "♡ Ajouter aux favoris"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-text transition hover:bg-white/10"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
