<script setup>
import Brand from "../ui/Brand.vue";
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-[#090b1f]">
    <div class="mx-auto grid h-20 max-w-7xl grid-cols-2 items-center px-6 md:grid-cols-3 md:px-8">
      <Brand href="#top" variant="header" />

      <nav class="hidden md:block">
        <ul class="flex items-center justify-center gap-12">
          <li>
            <a
              href="#about-section"
              class="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#features-section"
              class="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Features
            </a>
          </li>

          <li>
            <a
              href="#insights-section"
              class="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Insights
            </a>
          </li>

          <li>
            <a
              href="#contact-section"
              class="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <a
        href="#contact-section"
        class="justify-self-end rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
      >
        Enroll now
      </a>
    </div>
  </header>
</template>
