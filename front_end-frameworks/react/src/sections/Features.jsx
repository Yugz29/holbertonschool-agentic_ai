import features from "../data/features";
import FeatureCard from "../components/cards/FeatureCard";
import SectionBadge from "../components/ui/SectionBadge";
import SectionTitle from "../components/ui/SectionTitle";

function Features() {
  return (
    <section id="features-section" className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <SectionBadge>✦ Features ✦</SectionBadge>

        <SectionTitle
          line1="Everything you need to build"
          line2="With powerful AI agents"
          accent="text-violet-300"
        />

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
