function SectionTitle({ line1, line2, variant = "section", accent }) {
  const isHero = variant === "hero";
  const Tag = isHero ? "h1" : "h2";
  const accentClass = accent ?? (isHero ? "text-violet-300" : "text-violet-400");

  return (
    <Tag
      className={`mt-6 leading-none font-black tracking-tight text-white ${
        isHero ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
      }`}
    >
      {line1}
      <br />
      <span className={accentClass}>{line2}</span>
    </Tag>
  );
}

export default SectionTitle;
