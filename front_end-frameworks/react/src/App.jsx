import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import Insights from "./sections/Insights";
import Contact from "./sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="bg-black">
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
  );
}

export default App;
