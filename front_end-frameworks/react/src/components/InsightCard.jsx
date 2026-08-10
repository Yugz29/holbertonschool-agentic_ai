function InsightCard({ category, title, description, image, index }) {
  const isFeatured = index === 0;

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 ${
        isFeatured ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden ${isFeatured ? "h-64" : "h-56"}`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

        <span className="absolute bottom-4 left-4 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300 backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="p-8">
        <h3
          className={`font-bold text-slate-50 ${isFeatured ? "text-2xl" : "text-xl"}`}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-300 md:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}

export default InsightCard;
