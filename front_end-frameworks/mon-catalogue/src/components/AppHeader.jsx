function AppHeader({ favoritesCount, currentView, onNavigate }) {
  const baseLink =
    "shrink-0 rounded-xl px-4 py-3 text-sm font-semibold transition sm:px-5";
  const activeLink = "bg-accent text-text";
  const inactiveLink =
    "border border-white/10 bg-white/5 text-text hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-bg/70 backdrop-blur">
      <div className="flex h-20 w-full items-center justify-between gap-3 px-4 md:px-8">
        <button
          type="button"
          onClick={() => onNavigate("films")}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent font-display text-2xl text-text">
            M
          </span>
          <span className="hidden font-display text-3xl uppercase tracking-[0.2em] text-text sm:inline">
            Mon Catalogue
          </span>
        </button>

        <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onNavigate("films")}
            className={`${baseLink} ${
              currentView === "films" ? activeLink : inactiveLink
            }`}
          >
            Films
          </button>
          <button
            type="button"
            onClick={() => onNavigate("favorites")}
            className={`${baseLink} flex items-center gap-2 ${
              currentView === "favorites" ? activeLink : inactiveLink
            }`}
          >
            <span
              className={
                currentView === "favorites" ? "text-text" : "text-accent"
              }
            >
              &#9829;
            </span>
            <span>Favoris</span>
            <span
              className={
                currentView === "favorites" ? "text-text/70" : "text-muted"
              }
            >
              {favoritesCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
