function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#090b1f]">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-2 items-center px-6 md:grid-cols-3 md:px-8">
        <a href="#top" className="flex items-center gap-3 justify-self-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/25">
            ✣
          </span>

          <span className="text-base font-semibold text-white md:text-lg">
            Agentic AI
          </span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center justify-center gap-12">
            <li>
              <a
                href="#about-section"
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#features-section"
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Features
              </a>
            </li>

            <li>
              <a
                href="#insights-section"
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Insights
              </a>
            </li>

            <li>
              <a
                href="#contact-section"
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <a
          href="#contact-section"
          className="justify-self-end rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Enroll now
        </a>
      </div>
    </header>
  );
}

export default Header;
