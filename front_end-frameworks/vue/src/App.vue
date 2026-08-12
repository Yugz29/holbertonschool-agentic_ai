<script setup>
import Header from "./components/layout/Header.vue";
import Hero from "./components/sections/Hero.vue";
import About from "./sections/About.vue";
import Features from "./sections/Features.vue";
import Insights from "./sections/Insights.vue";
import Contact from "./sections/Contact.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <div class="bg-black">
    <Header />
    <main>
      <Hero />
      <About />
      <Features />
      <Insights />
      <Contact />
    </main>
    <Footer />
  </div>
</template>
