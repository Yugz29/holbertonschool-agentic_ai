import { useState, useEffect } from "react";
import { getInsights } from "../services/insightsService";
import InsightCard from "../components/InsightCard";

function Insights() {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInsights() {
      try {
        const data = await getInsights();
        setInsights(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load insights. Please try again later.");
      }
    }
    loadInsights();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            ✦ Insights ✦
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
            Explore Agentic AI
            <br />
            <span className="text-violet-400">Through real-world scenes</span>
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              index={index}
              category={insight.category}
              title={insight.title}
              description={insight.description}
              image={insight.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Insights;