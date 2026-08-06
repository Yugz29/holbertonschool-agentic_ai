import features from "../data/features";
import FeatureCard from "../components/FeatureCard";

function Features() {
  return (
    <section id="features-section" className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
          ✦ Features ✦
        </p>

        <h2 className="mt-6 text-4xl leading-none font-black tracking-tight md:text-5xl">
          Everything you need to build
          <br />
          <span className="text-violet-300">With powerful AI agents</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
          From autonomous decision-making to enterprise-grade security, explore
          the core capabilities that power modern AI agents.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;
