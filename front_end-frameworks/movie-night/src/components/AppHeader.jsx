function AppHeader({ favoritesCount }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-xl font-black text-white">
            M
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            MOVIE NIGHT
          </span>
        </a>

        <nav className="flex items-center gap-3">
          <a
            href="#catalogue"
            className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Films
          </a>
          <a
            href="#favoris"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
          >
            <span className="text-rose-500">&#9829;</span>
            Favoris
            <span className="text-slate-400">{favoritesCount}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
