<script>
  import { onMount } from "svelte";
  import { getInsights } from "../services/insightsService";
  import InsightCard from "../components/InsightCard.svelte";
  import SectionBadge from "../components/ui/SectionBadge.svelte";
  import SectionTitle from "../components/ui/SectionTitle.svelte";

  let insights = $state([]);
  let error = $state(null);

  onMount(async () => {
    try {
      insights = await getInsights();
    } catch (err) {
      console.error(err);
      error = "Unable to load insights. Please try again later.";
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else}
  <section id="insights-section" class="py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <SectionBadge>✦ Insights ✦</SectionBadge>

        <SectionTitle
          line1="Explore Agentic AI"
          line2="Through real-world scenes"
        />
      </div>

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each insights as insight, index}
          <InsightCard
            {index}
            category={insight.category}
            title={insight.title}
            description={insight.description}
            image={insight.image}
          />
        {/each}
      </div>
    </div>
  </section>
{/if}
