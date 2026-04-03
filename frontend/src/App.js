import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "@/App.css";
import CinematicIntro from "@/components/CinematicIntro";
import FilmGrain from "@/components/FilmGrain";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilmsRail from "@/components/FilmsRail";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import NaqaabPicks from "@/components/NaqaabPicks";
import TeamSection from "@/components/TeamSection";
import MemberPortal from "@/components/MemberPortal";
import SocialFooter from "@/components/SocialFooter";
import InterestFormModal from "@/components/InterestFormModal";
import LoginModal from "@/components/LoginModal";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } }
};

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smooth: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("naqaab_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("naqaab_user", JSON.stringify(userData));
    setShowLogin(false);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("naqaab_user");
  }, []);

  const handleSkipIntro = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="App" style={{ background: "var(--black)" }}>
      <FilmGrain />

      {!introComplete && (
        <CinematicIntro
          onComplete={() => setIntroComplete(true)}
          onSkip={handleSkipIntro}
        />
      )}

      <div style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Navbar
          user={user}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
        />

        <main>
          <motion.section id="hero" variants={fadeUp} initial="hidden" animate={introComplete ? "visible" : "hidden"}>
            <HeroSection
              onExploreClick={() => {
                document.getElementById("films")?.scrollIntoView({ behavior: "smooth" });
              }}
              onJoinClick={() => setShowInterestForm(true)}
            />
          </motion.section>

          <motion.section id="films" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <FilmsRail />
          </motion.section>

          <motion.section id="stats" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <StatsSection />
          </motion.section>

          <motion.section id="about" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <AboutSection />
          </motion.section>

          <motion.section id="events" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <EventsSection />
          </motion.section>

          <motion.section id="picks" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <NaqaabPicks />
          </motion.section>

          <motion.section id="team" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <TeamSection />
          </motion.section>

          <motion.section id="portal" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <MemberPortal
              user={user}
              onJoinClick={() => setShowInterestForm(true)}
              onLoginClick={() => setShowLogin(true)}
              onLogout={handleLogout}
            />
          </motion.section>

          <motion.section id="connect" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <SocialFooter />
          </motion.section>
        </main>
      </div>

      <InterestFormModal
        isOpen={showInterestForm}
        onClose={() => setShowInterestForm(false)}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
