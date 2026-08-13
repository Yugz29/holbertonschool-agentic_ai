<script>
  import Brand from "../ui/Brand.svelte";

  const currentYear = new Date().getFullYear();
</script>

{#snippet instagramIcon()}
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
{/snippet}

{#snippet tikTokIcon()}
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M16.6 5.82c-.86-.85-1.35-2-1.4-3.22h-3.1v14.35a3.03 3.03 0 1 1-2.14-2.9v-3.16a6.15 6.15 0 1 0 5.24 6.08V9.4a8.16 8.16 0 0 0 4.77 1.53V7.83a4.85 4.85 0 0 1-3.37-2.01Z"
    />
  </svg>
{/snippet}

{#snippet xIcon()}
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.1 22H1l8.1-9.3L1 2h7.3l5 6.3L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z"
    />
  </svg>
{/snippet}

{#snippet youTubeIcon()}
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
    />
  </svg>
{/snippet}

<footer class="border-t border-slate-800 bg-black py-16">
  <div class="mx-auto max-w-6xl px-6">
    <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Brand variant="footer" />
        <p class="mt-4 text-sm text-slate-400">
          Explore the future of development with Agentic AI.
        </p>

        <div class="mt-6 flex items-center gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="text-slate-400 hover:text-violet-400"
          >
            {@render instagramIcon()}
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            class="text-slate-400 hover:text-violet-400"
          >
            {@render tikTokIcon()}
          </a>
          <a
            href="https://www.x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            class="text-slate-400 hover:text-violet-400"
          >
            {@render xIcon()}
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            class="text-slate-400 hover:text-violet-400"
          >
            {@render youTubeIcon()}
          </a>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-slate-50">Navigation</h3>
        <ul class="mt-4 space-y-3 text-sm text-slate-400">
          <li>
            <a href="#hero-section" class="hover:text-violet-400">
              Hero section
            </a>
          </li>
          <li>
            <a href="#about-section" class="hover:text-violet-400"> About </a>
          </li>
          <li>
            <a href="#features-section" class="hover:text-violet-400">
              Features
            </a>
          </li>
          <li>
            <a href="#insights-section" class="hover:text-violet-400">
              Insights
            </a>
          </li>
          <li>
            <a href="#contact-section" class="hover:text-violet-400">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-slate-50">Holberton School</h3>
        <ul class="mt-4 space-y-3 text-sm text-slate-400">
          <li>
            <a
              href="https://www.holbertonschool.com"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-violet-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://www.holbertonschool.com/methodology"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-violet-400"
            >
              Methodology
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-slate-50">Curriculum</h3>
        <ul class="mt-4 space-y-3 text-sm text-slate-400">
          <li>
            <a
              href="https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-violet-400"
            >
              Bachelor
            </a>
          </li>
          <li>
            <a
              href="https://github.com/fchavonet/curriculum-holbertonschool-front_end-frameworks"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-violet-400"
            >
              Program
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-400 sm:flex-row"
    >
      <p>© {currentYear} Yann Duzelier</p>
      <p>Built for the Holberton School Front-end Frameworks curriculum.</p>
    </div>
  </div>
</footer>
