function SectionBadge({ children }) {
  return (
    <p className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
      {children}
    </p>
  );
}

export default SectionBadge;
