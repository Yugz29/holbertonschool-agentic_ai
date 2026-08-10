function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
        <Icon className="h-6 w-6 text-white" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}

export default FeatureCard;
