<script setup>
import steps from "../data/steps";
import SectionBadge from "../components/ui/SectionBadge.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import StepItem from "../components/StepItem.vue";
</script>

<template>
  <section id="about-section" class="bg-black py-24 text-white">
    <div class="mx-auto max-w-6xl px-6">
      <header class="mx-auto max-w-3xl text-center">
        <SectionBadge>✦ What is Agentic AI? ✦</SectionBadge>

        <SectionTitle
          line1="AI that does more than answer"
          line2="It acts with purpose"
          accent="text-violet-300"
        />

        <p
          class="mt-6 text-sm leading-6 text-slate-300 md:text-base md:leading-7"
        >
          Agentic AI refers to artificial intelligence systems designed to
          pursue goals, make decisions, use tools, and adapt their actions
          across multiple steps. Instead of only responding to a single prompt,
          an AI agent can break down a task, plan a strategy, execute actions,
          evaluate results, and continue until the objective is reached.
        </p>
      </header>

      <div class="mt-16 grid items-center gap-12 lg:grid-cols-2">
        <article
          class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
        >
          <div class="border-b border-slate-800 pb-6">
            <h3 class="text-lg font-semibold">Traditional AI</h3>

            <p class="mt-2 text-sm leading-6 text-slate-400">
              Responds to direct instructions, generates content, answers
              questions, or analyzes information within a limited interaction.
            </p>
          </div>

          <div class="pt-6">
            <h3 class="text-lg font-semibold text-violet-300">Agentic AI</h3>

            <p class="mt-2 text-sm leading-6 text-slate-400">
              Understands a goal, chooses actions, uses external tools, follows
              a plan, and adjusts its behavior based on feedback.
            </p>
          </div>
        </article>

        <ol class="space-y-8">
          <StepItem
            v-for="step in steps"
            :key="step.number"
            :number="step.number"
            :title="step.title"
            :description="step.description"
          />
        </ol>
      </div>
    </div>
  </section>
</template>
