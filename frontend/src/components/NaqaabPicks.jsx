import { NAQAAB_PICKS } from "@/data";
import ScrollReveal from "@/components/ScrollReveal";

export default function NaqaabPicks() {
  const allPicks = [...NAQAAB_PICKS, ...NAQAAB_PICKS];

  return (
    <div
      data-testid="naqaab-picks"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--off-black)" }}
    >
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            {/* 3D glasses icon */}
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="opacity-60">
              <rect x="1" y="4" width="10" height="8" rx="1" stroke="var(--white)" strokeWidth="1.5" fill="none" />
              <rect x="17" y="4" width="10" height="8" rx="1" stroke="var(--dim-white)" strokeWidth="1.5" fill="none" />
              <path d="M11 8H17" stroke="var(--dim-white)" strokeWidth="1.5" />
              <path d="M1 8H0" stroke="var(--dim-white)" strokeWidth="1.5" />
              <path d="M28 8H27" stroke="var(--dim-white)" strokeWidth="1.5" />
            </svg>
            <p
              className="font-meta text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "var(--dim-white)" }}
            >
              NAQAAB PICKS
            </p>
          </div>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl"
            style={{ color: "var(--white)" }}
          >
            THE CRITICS' TABLE
          </h2>
        </ScrollReveal>
      </div>

      {/* Horizontal ticker */}
      <div className="ticker-wrap">
        <div
          className="flex gap-5"
          style={{ animation: "scroll-left 40s linear infinite" }}
        >
          {allPicks.map((pick, i) => (
            <PickCard key={`${pick.film}-${i}`} pick={pick} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PickCard({ pick }) {
  return (
    <a
      href="https://www.instagram.com/naqaabpicks/"
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`pick-card-${pick.film.replace(/\s+/g, "-").toLowerCase()}`}
      className="group flex-shrink-0 w-[280px] h-[400px] relative flex flex-col justify-end overflow-hidden transition-all duration-500 hover:-translate-y-2 rounded-sm"
      style={{
        background: "var(--black)",
        border: "1px solid var(--deep-grey)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(245,240,235,0.25)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(245,240,235,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--deep-grey)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Movie Poster Background */}
      {pick.poster && (
        <img
          src={pick.poster}
          alt={pick.film}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.5) grayscale(0.4)" }}
          onMouseEnter={(e) => { e.target.style.filter = "brightness(0.65) grayscale(0)"; }}
          onMouseLeave={(e) => { e.target.style.filter = "brightness(0.5) grayscale(0.4)"; }}
          loading="lazy"
        />
      )}

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Date badge */}
      <div
        className="absolute top-4 right-4 font-meta text-[9px] tracking-[0.15em] uppercase px-2 py-1 z-[2]"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "var(--dim-white)", borderRadius: "2px" }}
      >
        {pick.date}
      </div>

      {/* Content */}
      <div className="relative z-[2] p-5">
        <h3
          className="font-display text-2xl md:text-3xl mb-4 leading-tight drop-shadow-lg"
          style={{ color: "var(--white)" }}
        >
          {pick.film.toUpperCase()}
        </h3>

        <p
          className="font-meta text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[var(--white)]"
          style={{ color: "var(--dim-white)" }}
        >
          READ REVIEW &rarr;
        </p>
      </div>
    </a>
  );
}
