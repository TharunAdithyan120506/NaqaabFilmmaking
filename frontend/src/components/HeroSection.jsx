import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TICKER_FILMS } from "@/data";
// Antigravity removed to eliminate canvas-glitch
import { SplitText } from "./react-bits/SplitText";
import { ScrollVelocity } from "./react-bits/ScrollVelocity";

export default function HeroSection({ onExploreClick, onJoinClick }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax calculations using framer-motion useTransform
  // Moving at various speeds downwards as you scroll down
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const tickerContent = TICKER_FILMS.join("  \u00B7  ");

  return (
    <div
      ref={sectionRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden vignette scanlines"
      style={{ background: "var(--black)" }}
    >
      {/* Framer Parallax Background Container */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: bgY, willChange: "transform" }}
      >
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
        
        {/* Antigravity Canvas — removed to fix glitch */}

        {/* Noise overlay */}
        <div style={{
            position: 'absolute', inset: 0, opacity: 0.035, zIndex: 1, pointerEvents: 'none', mixBlendMode: 'overlay',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`
        }} />
      </motion.div>

      {/* Letterbox bars */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />

      {/* Main content */}
      <div className="relative z-[2] text-center px-6 max-w-4xl mx-auto mt-[-5vh]">
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

        {/* Parallax Title wrapper */}
        <motion.div style={{ y: titleY, willChange: "transform" }}>
          <h1
            className="font-display leading-[0.9] mb-6 overflow-hidden"
            style={{
              fontSize: "clamp(5rem, 15vw, 12rem)",
              color: "var(--bright-white)",
              letterSpacing: "0.08em",
              textShadow: "0 0 80px rgba(255,255,255,0.05)",
            }}
          >
            <SplitText delay={0.05}>NAQAAB</SplitText>
          </h1>
        </motion.div>

        {/* Parallax Subtitle wrapper */}
        <motion.div style={{ y: subtitleY, willChange: "transform" }}>
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
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button
            data-testid="explore-films-btn"
            onClick={onExploreClick}
            className="font-meta text-[10px] tracking-[0.2em] uppercase px-8 py-3 transition-all duration-500"
            style={{
              color: "#e8e4d9",
              border: "1px solid rgba(232,228,217,0.4)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(232,228,217,0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            EXPLORE OUR FILMS &rarr;
          </button>
          <button
            data-testid="join-club-btn"
            onClick={onJoinClick}
            className="font-meta text-[10px] tracking-[0.2em] uppercase px-8 py-3 transition-all duration-500"
            style={{
              color: "#080808",
              background: "#e8e4d9",
              boxShadow: "0 0 20px rgba(232,228,217,0.08)",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 40px rgba(232,228,217,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(232,228,217,0.08)";
            }}
          >
            JOIN THE CLUB
          </button>
        </motion.div>
      </div>

      {/* Film ticker at bottom with ScrollVelocity */}
      <div className="absolute bottom-16 left-0 right-0 z-[5] overflow-hidden" 
           style={{ color: "var(--white)", opacity: 0.15, pointerEvents: "none" }}>
        <div className="border-t border-b border-[rgba(255,255,255,0.05)] py-2">
          <ScrollVelocity baseVelocity={0.5} className="font-meta text-xs tracking-[0.3em] uppercase">
             {tickerContent}&nbsp;&nbsp;&middot;&nbsp;&nbsp;
          </ScrollVelocity>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[5]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} style={{ color: "var(--white)", opacity: 0.3 }} />
      </motion.div>
    </div>
  );
}
