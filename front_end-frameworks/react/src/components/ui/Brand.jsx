import { Sparkles } from "lucide-react";

function Brand({ href, variant = "header" }) {
  const isHeader = variant === "header";

  const logo = (
    <>
      <span
        className={`flex items-center justify-center text-white shadow-lg shadow-violet-600/25 ${
          isHeader
            ? "h-10 w-10 rounded-xl bg-violet-600"
            : "h-9 w-9 rounded-lg bg-violet-500"
        }`}
      >
        <Sparkles size={isHeader ? 20 : 18} />
      </span>
      <span
        className={`font-semibold text-white ${
          isHeader ? "text-base md:text-lg" : "text-sm"
        }`}
      >
        Agentic AI
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-3 justify-self-start">
        {logo}
      </a>
    );
  }

  return <div className="flex items-center gap-2">{logo}</div>;
}

export default Brand;
