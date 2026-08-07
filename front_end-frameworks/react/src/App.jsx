import Header from "./components/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Features from "./sections/Features";
import Insights from "./sections/Insights";

function App() {
  return (
    <div className="bg-black">
      <Header />
      <Hero />
      <About />
      <Features />
      <Insights />
    </div>
  );
}

export default App;
