import { useState, useEffect } from "react";
import { getInsights } from "../services/insightsService";
import InsightCard from "../components/InsightCard";
import SectionBadge from "../components/ui/SectionBadge";
import SectionTitle from "../components/ui/SectionTitle";

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
    <section id="insights-section" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionBadge>✦ Insights ✦</SectionBadge>

          <SectionTitle
            line1="Explore Agentic AI"
            line2="Through real-world scenes"
          />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
