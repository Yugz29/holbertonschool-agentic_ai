<script>
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import Button from "../ui/Button.svelte";
  import StatCard from "../cards/StatCard.svelte";

  const stats = [
    { value: "10K+", label: "Active agents" },
    { value: "99.9%", label: "Uptime" },
    { value: "50M+", label: "Tasks automated" },
    { value: "24/7", label: "Support" },
  ];
</script>

<section
  id="hero-section"
  class="relative overflow-hidden pt-36 pb-24 text-white"
>
  <!-- Base gradient with violet (top-left) and blue (bottom-right) glows -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]"
  ></div>

  <!-- Grid overlay -->
  <div
    class="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30"
  ></div>

  <!-- Fade to black at the bottom -->
  <div
    class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"
  ></div>

  <!-- Radial vignette to darken the edges -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]"
  ></div>

  <div class="relative mx-auto max-w-6xl px-6 text-center">
    <SectionBadge>✦ The future of coding ✦</SectionBadge>

    <SectionTitle
      variant="hero"
      line1="Build smarter workflows"
      line2="with Agentic AI"
    />

    <p class="mx-auto mt-6 max-w-3xl text-sm text-slate-300 md:text-base">
      Agentic AI refers to artificial intelligence systems designed to pursue
      goals, make decisions, use tools, and adapt their actions across multiple
      steps.
    </p>

    <div class="mt-8 flex flex-col justify-center gap-4 md:flex-row">
      <Button href="#" variant="primary">
        Start learning with Holberton School
      </Button>
      <Button href="#" variant="secondary">Methodology</Button>
    </div>

    <dl class="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
      {#each stats as stat (stat.label)}
        <StatCard value={stat.value} label={stat.label} />
      {/each}
    </dl>
  </div>
</section>
