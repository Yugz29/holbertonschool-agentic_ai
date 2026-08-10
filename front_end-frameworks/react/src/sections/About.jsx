import steps from "../data/steps";
import SectionBadge from "../components/ui/SectionBadge";
import SectionTitle from "../components/ui/SectionTitle";
import StepItem from "../components/StepItem";

function About() {
  return (
    <section id="about-section" className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <SectionBadge>✦ What is Agentic AI? ✦</SectionBadge>

          <SectionTitle
            line1="AI that does more than answer"
            line2="It acts with purpose"
            accent="text-violet-300"
          />

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
              <StepItem
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default About;
