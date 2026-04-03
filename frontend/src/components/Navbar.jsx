import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "FILMS", href: "#films" },
  { label: "EVENTS", href: "#events" },
  { label: "TEAM", href: "#team" },
  { label: "JOIN", href: "#portal" },
];

export default function Navbar({ user, onLoginClick, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-60px 0px 0px 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic Island expands on hover or when scrolled
  const isExpanded = hovered || !scrolled;

  return (
    <>
      {/* Dynamic Island Dock */}
      <motion.nav
        data-testid="navbar"
        className="fixed top-4 left-1/2 z-[1000] flex items-center justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ x: "-50%" }}
        animate={{
          width: isExpanded ? "min(90vw, 900px)" : "220px",
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="relative w-full flex items-center justify-between overflow-hidden"
          style={{
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          animate={{
            borderRadius: isExpanded ? "18px" : "50px",
            paddingLeft: isExpanded ? "24px" : "16px",
            paddingRight: isExpanded ? "24px" : "16px",
            paddingTop: isExpanded ? "14px" : "10px",
            paddingBottom: isExpanded ? "14px" : "10px",
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Left: Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group flex-shrink-0"
            data-testid="navbar-logo"
          >
            <img
              src="/assets/images/logo.png"
              alt="Naqaab"
              className="h-[28px] w-[28px] object-contain transition-all duration-300"
              style={{ filter: "invert(1)" }}
            />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  className="font-wordmark text-lg tracking-wider whitespace-nowrap"
                  style={{ color: "#e8e4d9" }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  naqaab
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Center: Desktop links (only visible when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="hidden md:flex items-center gap-8 mx-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    data-testid={`nav-link-${link.label.toLowerCase()}`}
                    className="nav-link relative font-meta uppercase transition-all duration-300 whitespace-nowrap"
                    style={{
                      color: "#e8e4d9",
                      letterSpacing: "0.12em",
                      fontSize: "0.7rem",
                      opacity: activeLink === link.href ? 1 : 0.6,
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => {
                      if (activeLink !== link.href) e.target.style.opacity = 0.6;
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right: Login/Logout (only visible when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="hidden md:flex items-center flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                {user ? (
                  <button
                    data-testid="logout-btn"
                    onClick={onLogout}
                    className="font-meta text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300 whitespace-nowrap"
                    style={{ color: "#e8e4d9", opacity: 0.6 }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => (e.target.style.opacity = 0.6)}
                  >
                    LOGOUT
                  </button>
                ) : (
                  <button
                    data-testid="member-login-btn"
                    onClick={onLoginClick}
                    className="font-meta text-[0.65rem] tracking-[0.12em] uppercase px-4 py-1.5 transition-all duration-400 whitespace-nowrap"
                    style={{
                      color: "#e8e4d9",
                      border: "1px solid rgba(232,228,217,0.3)",
                      borderRadius: "20px",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(232,228,217,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    LOGIN
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile hamburger */}
          <button
            data-testid="mobile-menu-btn"
            className="md:hidden flex-shrink-0 ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#e8e4d9" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] pt-20 px-6 flex flex-col gap-4 md:hidden"
            style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-display text-3xl tracking-[0.15em] uppercase text-[var(--white)] text-left py-3 opacity-80 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                {link.label}
              </motion.button>
            ))}
            <hr className="border-[var(--deep-grey)] my-4" />
            {user ? (
              <button
                onClick={onLogout}
                className="font-meta text-sm tracking-[0.15em] uppercase text-[var(--white)] text-left py-2"
              >
                LOGOUT
              </button>
            ) : (
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false); }}
                className="font-meta text-sm tracking-[0.15em] uppercase text-[var(--white)] text-left py-2"
              >
                MEMBER LOGIN
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
