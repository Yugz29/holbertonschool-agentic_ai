<script>
  import Header from "./components/layout/Header.svelte";
  import Hero from "./components/sections/Hero.svelte";
  import About from "./sections/About.svelte";
  import Features from "./sections/Features.svelte";
  import Insights from "./sections/Insights.svelte";
  import Contact from "./sections/Contact.svelte";
  import Footer from "./components/layout/Footer.svelte";
</script>

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
