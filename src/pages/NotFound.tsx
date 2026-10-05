import CustomCursor from "@/components/CustomCursor";

/**
 * 404 page. Prerendered to dist/404.html (served by the host, with a 404 status, for unknown
 * URLs) and hydrated on the client, which is what mounts the custom cursor.
 */
const NotFound = () => (
  <main className="noise-overlay bg-black relative min-h-screen flex flex-col overflow-hidden py-6 sm:py-8">
    <CustomCursor />
    <div className="relative z-10 flex flex-col flex-1 justify-between">
      <div className="px-5 sm:px-8 my-auto">
        <h1 className="font-display text-[clamp(3.5rem,15vw,6rem)] md:text-[clamp(2.8rem,12vw,13rem)] leading-[0.88] tracking-tight text-center md:text-left">
          <span className="metallic-text block pt-4" aria-hidden="true">
            404
          </span>
          <span className="md:stroke-text metallic-text block">Not Found</span>
          <span className="sr-only"> (404): this page does not exist</span>
        </h1>

        <div className="justify-items-center md:justify-items-start mt-6 sm:mt-8">
          <p className="font-mono-accent font-light text-[1rem] text-white/50 md:text-white/60 max-w-[300px] sm:max-w-sm mt-6 sm:mt-8 leading-relaxed text-center md:text-left">
            The page you are looking for{" "}
            <span className="text-foreground/90 md:text-silver-bright">doesn't exist</span> or was{" "}
            <span className="text-foreground/90 md:text-silver-bright">moved</span>.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-5">
            <a href="/" className="group flex items-center gap-3">
              <span className="font-mono-accent font-normal text-xs text-foreground/70 uppercase group-hover:text-silver-bright transition-colors duration-500">
                Back to home
              </span>
              <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500">
                <svg
                  className="w-3.5 h-3.5 text-foreground/50 group-hover:text-background transition-colors duration-500 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="/#contact"
              className="font-mono-accent font-normal text-xs text-white/[0.55] uppercase hover:text-silver-bright transition-colors duration-500"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound;
