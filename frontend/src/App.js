import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import CinematicIntro from "@/components/CinematicIntro";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilmsRail from "@/components/FilmsRail";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import NaqaabPicks from "@/components/NaqaabPicks";
import TeamSection from "@/components/TeamSection";
import MemberPortal from "@/components/MemberPortal";
import SocialFooter from "@/components/SocialFooter";
import InterestFormModal from "@/components/InterestFormModal";
import LoginModal from "@/components/LoginModal";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

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
      <CustomCursor />

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
          <section id="hero">
            <HeroSection
              onExploreClick={() => {
                document.getElementById("films")?.scrollIntoView({ behavior: "smooth" });
              }}
              onJoinClick={() => setShowInterestForm(true)}
            />
          </section>

          <section id="films">
            <FilmsRail />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <section id="events">
            <EventsSection />
          </section>

          <section id="picks">
            <NaqaabPicks />
          </section>

          <section id="team">
            <TeamSection />
          </section>

          <section id="portal">
            <MemberPortal
              user={user}
              onJoinClick={() => setShowInterestForm(true)}
              onLoginClick={() => setShowLogin(true)}
              onLogout={handleLogout}
            />
          </section>

          <section id="connect">
            <SocialFooter />
          </section>
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
