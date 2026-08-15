function AppHeader({ favoritesCount, currentView, onNavigate }) {
  const baseLink =
    "shrink-0 rounded-xl px-4 py-3 text-sm font-semibold transition sm:px-5";
  const activeLink = "bg-gradient-to-br from-rose-500 to-pink-600 text-white";
  const inactiveLink =
    "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate("films")}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-xl font-black text-white">
            M
          </span>
          <span className="hidden text-2xl font-extrabold tracking-tight text-white sm:inline">
            MOVIE NIGHT
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
                currentView === "favorites" ? "text-white" : "text-rose-500"
              }
            >
              &#9829;
            </span>
            <span>Favoris</span>
            <span
              className={
                currentView === "favorites" ? "text-white/70" : "text-slate-400"
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
