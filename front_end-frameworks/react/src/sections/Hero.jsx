function Hero() {
  return (
    <section id="hero-section" className="bg-black pt-36 pb-24 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
          The future of coding
        </p>
        <h1 className="mt-6 text-5xl leading-none font-black tracking-tight md:text-7xl">
          Build smarter workflows
          <br />
          <span className="text-violet-300">with Agentic AI</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-sm text-slate-300 md:text-base">
          Agentic AI refers to artificial intelligence systems designed to
          pursue goals, make decisions, use tools, and adapt their actions
          across multiple steps.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row">
          <a
            href="#"
            className="rounded-md bg-violet-500 px-4 py-2 font-semibold text-white shadow-lg shadow-violet-500/40 hover:bg-violet-600"
          >
            Start learning with Holberton School
          </a>
          <a
            href="#"
            className="rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold text-white hover:bg-slate-900"
          >
            Methodology
          </a>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <dd className="text-3xl font-black text-white">10K+</dd>
            <dt className="mt-1 text-xs text-slate-400">Active agents</dt>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <dd className="text-3xl font-black text-white">99.9%</dd>
            <dt className="mt-1 text-xs text-slate-400">Uptime</dt>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <dd className="text-3xl font-black text-white">50M+</dd>
            <dt className="mt-1 text-xs text-slate-400">Tasks automated</dt>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center shadow-xl shadow-slate-950/40">
            <dd className="text-3xl font-black text-white">24/7</dd>
            <dt className="mt-1 text-xs text-slate-400">Support</dt>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default Hero;
