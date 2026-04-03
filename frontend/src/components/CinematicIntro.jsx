import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicIntro({ onComplete, onSkip }) {
  const [phase, setPhase] = useState(0); // 0=counter, 1=logo, 2=text, 3=subtitle, 4=wipe, 5=done
  const [counter, setCounter] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [showSkip, setShowSkip] = useState(false);
  const fullText = "naqaab FILMMAKING";

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 500);
    return () => clearTimeout(skipTimer);
  }, []);

  // Phase 0: Film counter (1-2-3-4)
  useEffect(() => {
    if (phase === 0) {
      const interval = setInterval(() => {
        setCounter((c) => {
          if (c >= 4) {
            clearInterval(interval);
            setPhase(1);
            return 4;
          }
          return c + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Phase 1: Logo appears for 600ms
  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Phase 2: Typewriter text
  useEffect(() => {
    if (phase === 2) {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypedText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setPhase(3), 200);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Phase 3: Subtitle → Phase 4
  useEffect(() => {
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Phase 4: Wipe out → done
  useEffect(() => {
    if (phase === 4) {
      const t = setTimeout(() => {
        setPhase(5);
        onComplete();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          data-testid="cinematic-intro"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "#000" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Film counter */}
          {phase === 0 && (
            <motion.div
              className="font-display text-[var(--dim-white)] text-8xl tracking-widest"
              key="counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {counter}
            </motion.div>
          )}

          {/* Logo + text */}
          {phase >= 1 && phase < 4 && (
            <div className="flex flex-col items-center gap-6">
              <motion.img
                src="/assets/images/logo.png"
                alt="Naqaab Logo"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {phase >= 2 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="font-display text-4xl md:text-6xl tracking-[0.3em] text-[var(--white)]">
                    <span className="font-wordmark text-3xl md:text-5xl tracking-[0.15em]">
                      {typedText.slice(0, 7)}
                    </span>
                    {typedText.length > 7 && (
                      <span className="font-display ml-2 tracking-[0.25em]">
                        {typedText.slice(7)}
                      </span>
                    )}
                    <span
                      className="inline-block w-[2px] h-[1em] ml-1 align-middle"
                      style={{
                        background: "var(--gold)",
                        animation: "blink-cursor 0.8s infinite",
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {phase >= 3 && (
                <motion.p
                  className="font-meta text-xs md:text-sm tracking-[0.25em] text-[var(--dim-white)] uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Manipal Institute of Technology
                </motion.p>
              )}
            </div>
          )}

          {/* Scanline wipe */}
          {phase === 4 && (
            <motion.div
              className="absolute inset-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                transformOrigin: "left",
                height: "2px",
                top: "50%",
              }}
            />
          )}

          {/* Skip button */}
          {showSkip && phase < 4 && (
            <button
              data-testid="skip-intro-btn"
              onClick={onSkip}
              className="absolute top-6 right-6 font-meta text-xs tracking-[0.2em] text-[var(--dim-white)] hover:text-[var(--gold)] transition-colors uppercase border border-[var(--deep-grey)] px-4 py-2"
            >
              SKIP
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
