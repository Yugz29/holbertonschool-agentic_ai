import steps from "../data/steps";

function About() {
  return (
    <section id="about-section" className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
            ✦ What is Agentic AI? ✦
          </p>

          <h2 className="mt-6 text-4xl leading-none font-black tracking-tight md:text-5xl">
            AI that does more than answer
            <br />
            <span className="text-violet-300">It acts with purpose</span>
          </h2>

          <p className="mt-6 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
            Agentic AI refers to artificial intelligence systems designed to
            pursue goals, make decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single
            prompt, an AI agent can break down a task, plan a strategy, execute
            actions, evaluate results, and continue until the objective is
            reached.
          </p>
        </header>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
            <div className="border-b border-slate-800 pb-6">
              <h3 className="text-lg font-semibold">Traditional AI</h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Responds to direct instructions, generates content, answers
                questions, or analyzes information within a limited interaction.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-semibold text-violet-300">
                Agentic AI
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Understands a goal, chooses actions, uses external tools,
                follows a plan, and adjusts its behavior based on feedback.
              </p>
            </div>
          </article>

          <ol className="space-y-8">
            {steps.map((step) => (
              <li key={step.number} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500 font-semibold text-white shadow-lg shadow-violet-500/40">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-base font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default About;
