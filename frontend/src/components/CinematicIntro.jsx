import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  { text: "LIGHTS.", hold: 400 },
  { text: "CAMERA.", hold: 400 },
  { text: "ACTION.", hold: 700 },
];

export default function CinematicIntro({ onComplete, onSkip }) {
  const [stage, setStage] = useState(0);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (stage < STAGES.length) {
      // 400ms fade in + hold length + 400ms fade out = total stage time
      const totalTime = 400 + STAGES[stage].hold + 400;
      const timer = setTimeout(() => {
        setStage(s => s + 1);
      }, totalTime);
      return () => clearTimeout(timer);
    } else if (stage === STAGES.length) {
      // Trigger flash
      setShowFlash(true);
      const flashTimer = setTimeout(() => {
        onComplete();
      }, 300); // Wait for flash to peek before completing
      return () => clearTimeout(flashTimer);
    }
  }, [stage, onComplete]);

  return (
    <motion.div
      data-testid="cinematic-intro"
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Intro localized film grain overlay (5%) */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          animation: "grain-shift 0.15s steps(1) infinite"
        }}
      />

      <AnimatePresence mode="wait">
        {stage < STAGES.length && (
          <motion.div
            key={stage}
            className="z-10 text-center font-display uppercase text-[#e8e4d9]"
            style={{
              fontWeight: 800,
              fontSize: "clamp(4rem, 10vw, 9rem)",
              letterSpacing: "0.3em",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1], // cinematic curve
            }}
          >
            {STAGES[stage].text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* White Flash ending */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 z-50 bg-[#e8e4d9]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onAnimationComplete={() => onComplete()}
          />
        )}
      </AnimatePresence>

      {/* Skip button visible on delay */}
      {!showFlash && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 font-meta text-[10px] tracking-[0.2em] text-[var(--dim-white)] hover:text-[#e8e4d9] uppercase border border-[rgba(232,228,217,0.1)] px-4 py-2 hover:border-[rgba(232,228,217,0.4)] transition-all duration-300"
        >
          SKIP
        </motion.button>
      )}
    </motion.div>
  );
}
