function AppFooter() {
  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-surface/40">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-8 md:px-8">
        <span className="font-display text-xl uppercase tracking-[0.2em] text-text">
          Mon Catalogue
        </span>
        <span className="text-sm text-muted">
          Vos films, vos notes, vos coups de cœur.
        </span>
      </div>
    </footer>
  );
}

export default AppFooter;
