import { useEffect, useState } from "react";

function Hero({ featuredMovies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % featuredMovies.length
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [featuredMovies.length]);

  if (featuredMovies.length === 0) {
    return null;
  }

  const currentMovie = featuredMovies[currentIndex % featuredMovies.length];

  return (
    <section className="relative isolate h-96 w-full overflow-hidden border-b border-white/10 bg-surface lg:h-[70vh]">
      <div
        key={currentMovie.id}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentMovie.backdropImage})` }}
      />

      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(to top, ${currentMovie.themeColor}E6, transparent 65%)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-accent-soft to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 px-4 pb-16 pt-6 md:px-8 lg:pb-20">
        <span className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-text">
          <span className="text-gold">&#9829;</span>
          <span>Coup de cœur</span>
        </span>

        <h2 className="max-w-3xl font-display text-5xl uppercase leading-none tracking-[0.06em] text-text sm:text-6xl lg:text-8xl">
          {currentMovie.title}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold">
            {currentMovie.category}
          </span>
          <span className="text-muted/50">&bull;</span>
          <span>{currentMovie.year}</span>
        </div>

        {currentMovie.personalNote && (
          <p className="line-clamp-2 max-w-2xl text-sm italic leading-relaxed text-text/80 sm:text-base">
            &laquo; {currentMovie.personalNote} &raquo;
          </p>
        )}

        {featuredMovies.length > 1 && (
          <div className="flex items-center gap-2 pt-1">
            {featuredMovies.map((movie, index) => (
              <span
                key={movie.id}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex % featuredMovies.length
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
