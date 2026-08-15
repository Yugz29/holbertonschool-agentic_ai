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
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/80 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={movie.title}
        className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-lg text-slate-300 backdrop-blur transition hover:bg-slate-950 hover:text-white"
        >
          &times;
        </button>

        <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
          <img
            src={movie.posterImage}
            alt={movie.title}
            className="mx-auto w-40 shrink-0 rounded-xl bg-slate-800 object-cover sm:w-48 md:mx-0 md:w-56"
          />

          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="pr-12 text-3xl font-extrabold tracking-tight text-white">
                {movie.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <span className="font-bold text-amber-400">
                  &#9733; {movie.personalRating}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span>{movie.year}</span>
                <span className="text-slate-600">&bull;</span>
                <span>{movie.duration}</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold text-slate-300">
                  {movie.category}
                </span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-slate-300">
              {movie.description}
            </p>

            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              {movie.watchedOn && (
                <p className="text-sm font-semibold text-slate-300">
                  Vu le {formatWatchedOn(movie.watchedOn)}
                </p>
              )}

              {movie.personalNote && (
                <p className="text-sm italic leading-relaxed text-slate-400">
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
                    ? "border border-rose-500/40 bg-rose-500/10 text-rose-400"
                    : "bg-gradient-to-br from-rose-500 to-pink-600 text-white"
                }`}
              >
                {movie.favorite
                  ? "♥ Retirer des favoris"
                  : "♡ Ajouter aux favoris"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
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
