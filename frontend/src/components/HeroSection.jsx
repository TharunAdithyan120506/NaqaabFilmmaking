import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TICKER_FILMS } from "@/data";

export default function HeroSection({ onExploreClick, onJoinClick }) {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (sectionRef.current) {
        sectionRef.current.style.backgroundPositionY = `${y * 0.4}px`;
      }
      // Parallax for floating elements
      elementsRef.current.forEach((el, i) => {
        if (el) {
          const speed = 0.1 + i * 0.08;
          el.style.transform = `translateY(${y * speed}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tickerContent = TICKER_FILMS.join("  \u00B7  ");

  // Generate particle positions once
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      animDuration: `${8 + Math.random() * 12}s`,
      animDelay: `${Math.random() * 10}s`,
      size: `${1 + Math.random() * 2}px`,
    }))
  , []);

  return (
    <div
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden vignette scanlines"
      style={{ background: "var(--black)" }}
    >
      {/* Monochrome Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(245,240,235,0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(245,240,235,0.02) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(245,240,235,0.01) 0%, transparent 40%),
              linear-gradient(180deg, var(--black) 0%, #060606 100%)
            `,
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animationDuration: p.animDuration,
            animationDelay: p.animDelay,
          }}
        />
      ))}

      {/* Floating parallax geometric elements */}
      <div
        ref={(el) => (elementsRef.current[0] = el)}
        className="absolute top-[15%] left-[8%] w-[1px] h-[120px] z-[3] hidden md:block"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(245,240,235,0.1), transparent)",
          willChange: "transform",
        }}
      />
      <div
        ref={(el) => (elementsRef.current[1] = el)}
        className="absolute bottom-[20%] right-[12%] w-[80px] h-[1px] z-[3] hidden md:block"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(245,240,235,0.08), transparent)",
          willChange: "transform",
        }}
      />
      <div
        ref={(el) => (elementsRef.current[2] = el)}
        className="absolute top-[30%] right-[8%] w-[60px] h-[60px] z-[3] hidden md:block"
        style={{
          border: "1px solid rgba(245,240,235,0.04)",
          rotate: "45deg",
          willChange: "transform",
        }}
      />

      {/* Letterbox bars */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />

      {/* Vertical white lines */}
      <motion.div
        className="absolute left-[10%] md:left-[15%] w-[1px] z-[3]"
        style={{ background: "var(--white)", opacity: 0.06, top: "10%", bottom: "10%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
      />
      <motion.div
        className="absolute right-[10%] md:right-[15%] w-[1px] z-[3]"
        style={{ background: "var(--white)", opacity: 0.06, top: "10%", bottom: "10%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-[5] text-center px-6 max-w-4xl mx-auto">
        {/* Small label */}
        <motion.p
          className="font-meta text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: "var(--dim-white)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          MANIPAL INSTITUTE OF TECHNOLOGY &middot; EST. 2023
        </motion.p>

        {/* Massive title with glitch — pure white */}
        <motion.h1
          className="glitch-text font-display leading-[0.9] mb-6"
          data-text="NAQAAB"
          style={{
            fontSize: "clamp(4rem, 15vw, 12rem)",
            color: "var(--bright-white)",
            letterSpacing: "0.08em",
            textShadow: "0 0 80px rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          NAQAAB
        </motion.h1>

        <motion.h2
          className="font-display tracking-[0.35em] mb-8"
          style={{
            fontSize: "clamp(1.2rem, 4vw, 3rem)",
            color: "var(--dim-white)",
            opacity: 0.7,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          FILMMAKING
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="font-serif italic text-base md:text-lg mb-12"
          style={{ color: "var(--dim-white)", opacity: 0.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          "a community forged from a shared passion for visual storytelling"
        </motion.p>

        {/* CTAs — B&W scheme */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button
            data-testid="explore-films-btn"
            onClick={onExploreClick}
            className="shimmer-btn font-meta text-[10px] tracking-[0.2em] uppercase px-8 py-3 transition-all duration-500"
            style={{
              color: "var(--white)",
              border: "1px solid rgba(245,240,235,0.3)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--white)";
              e.target.style.color = "var(--black)";
              e.target.style.borderColor = "var(--white)";
              e.target.style.boxShadow = "0 0 30px rgba(245,240,235,0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--white)";
              e.target.style.borderColor = "rgba(245,240,235,0.3)";
              e.target.style.boxShadow = "none";
            }}
          >
            EXPLORE OUR FILMS &rarr;
          </button>
          <button
            data-testid="join-club-btn"
            onClick={onJoinClick}
            className="font-meta text-[10px] tracking-[0.2em] uppercase px-8 py-3 transition-all duration-500"
            style={{
              color: "var(--black)",
              background: "var(--white)",
              boxShadow: "0 0 20px rgba(245,240,235,0.08)",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 40px rgba(245,240,235,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(245,240,235,0.08)";
            }}
          >
            JOIN THE CLUB
          </button>
        </motion.div>
      </div>

      {/* Film ticker at bottom */}
      <div className="absolute bottom-16 left-0 right-0 z-[5] overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker" style={{ color: "var(--white)", opacity: 0.12 }}>
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
        <ChevronDown size={20} style={{ color: "var(--white)", opacity: 0.3 }} />
      </motion.div>
    </div>
  );
}
