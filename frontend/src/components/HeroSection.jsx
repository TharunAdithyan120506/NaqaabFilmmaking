import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TICKER_FILMS } from "@/data";

export default function HeroSection({ onExploreClick, onJoinClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const y = window.scrollY;
        sectionRef.current.style.backgroundPositionY = `${y * 0.4}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tickerContent = TICKER_FILMS.join("  \u00B7  ");

  return (
    <div
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden vignette scanlines"
      style={{ background: "var(--black)" }}
    >
      {/* CSS Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(29,224,204,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(201,168,76,0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(192,57,43,0.03) 0%, transparent 40%),
              linear-gradient(180deg, var(--black) 0%, #080808 100%)
            `,
          }}
        />
      </div>

      {/* Letterbox bars */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />

      {/* Vertical gold lines */}
      <motion.div
        className="absolute left-[10%] md:left-[15%] w-[1px] z-[3]"
        style={{ background: "var(--gold)", opacity: 0.2, top: "10%", bottom: "10%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
      <motion.div
        className="absolute right-[10%] md:right-[15%] w-[1px] z-[3]"
        style={{ background: "var(--gold)", opacity: 0.2, top: "10%", bottom: "10%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-[5] text-center px-6 max-w-4xl mx-auto">
        {/* Small label */}
        <motion.p
          className="font-meta text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: "var(--gold)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          MANIPAL INSTITUTE OF TECHNOLOGY &middot; EST. 2023
        </motion.p>

        {/* Massive title with glitch */}
        <motion.h1
          className="glitch-text font-display leading-[0.9] mb-6"
          data-text="NAQAAB"
          style={{
            fontSize: "clamp(4rem, 15vw, 12rem)",
            color: "var(--white)",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          NAQAAB
        </motion.h1>

        <motion.h2
          className="font-display tracking-[0.3em] mb-8"
          style={{
            fontSize: "clamp(1.2rem, 4vw, 3rem)",
            color: "var(--white)",
            opacity: 0.85,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          FILMMAKING
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="font-serif italic text-base md:text-lg mb-12"
          style={{ color: "var(--dim-white)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          "a community forged from a shared passion for visual storytelling"
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button
            data-testid="explore-films-btn"
            onClick={onExploreClick}
            className="font-meta text-xs tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--black)]"
            style={{
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              background: "transparent",
            }}
          >
            EXPLORE OUR FILMS &rarr;
          </button>
          <button
            data-testid="join-club-btn"
            onClick={onJoinClick}
            className="font-meta text-xs tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300 hover:bg-[var(--white)] hover:text-[var(--black)]"
            style={{
              color: "var(--black)",
              background: "var(--gold)",
            }}
          >
            JOIN THE CLUB
          </button>
        </motion.div>
      </div>

      {/* Film ticker at bottom */}
      <div className="absolute bottom-16 left-0 right-0 z-[5] overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker" style={{ color: "var(--gold)", opacity: 0.25 }}>
            <span className="font-meta text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              {tickerContent}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{tickerContent}&nbsp;&nbsp;&middot;&nbsp;&nbsp;
            </span>
            <span className="font-meta text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              {tickerContent}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{tickerContent}&nbsp;&nbsp;&middot;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} style={{ color: "var(--dim-white)", opacity: 0.6 }} />
      </motion.div>
    </div>
  );
}
