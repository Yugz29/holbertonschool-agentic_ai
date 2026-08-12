<script setup>
import { ref, onMounted } from "vue";
import { getInsights } from "../services/insightsService";
import InsightCard from "../components/InsightCard.vue";
import SectionBadge from "../components/ui/SectionBadge.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";

const insights = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await getInsights();
    insights.value = data;
  } catch (err) {
    console.error(err);
    error.value = "Unable to load insights. Please try again later.";
  }
});
</script>

<template>
  <p v-if="error">{{ error }}</p>

  <section v-else id="insights-section" class="py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="text-center">
        <SectionBadge>✦ Insights ✦</SectionBadge>
        <SectionTitle
          line1="Explore Agentic AI"
          line2="Through real-world scenes"
        />
      </div>

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCard
          v-for="(insight, index) in insights"
          :key="index"
          :index="index"
          :category="insight.category"
          :title="insight.title"
          :description="insight.description"
          :image="insight.image"
        />
      </div>
    </div>
  </section>
</template>
