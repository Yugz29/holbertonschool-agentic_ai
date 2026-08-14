<script>
  import features from "../data/features";
  import FeatureCard from "../components/cards/FeatureCard.svelte";
  import SectionBadge from "../components/ui/SectionBadge.svelte";
  import SectionTitle from "../components/ui/SectionTitle.svelte";
</script>

<section id="features-section" class="bg-black py-24 text-white">
  <div class="mx-auto max-w-6xl px-6 text-center">
    <SectionBadge>✦ Features ✦</SectionBadge>

    <SectionTitle
      line1="Everything you need to build"
      line2="With powerful AI agents"
      accent="text-violet-300"
    />

    <p
      class="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-300 md:text-base md:leading-7"
    >
      From autonomous decision-making to enterprise-grade security, explore the
      core capabilities that power modern AI agents.
    </p>
  </div>

  <div class="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-3">
    {#each features as feature (feature.title)}
      <FeatureCard
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    {/each}
  </div>
</section>
