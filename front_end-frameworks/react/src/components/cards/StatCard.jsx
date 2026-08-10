function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
      <dd className="text-3xl font-black text-white">{value}</dd>
      <dt className="mt-1 text-xs text-slate-400">{label}</dt>
    </div>
  );
}

export default StatCard;
