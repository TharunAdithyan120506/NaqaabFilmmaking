import { useState, useEffect, useCallback } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    setScrollProgress(progress);
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

  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-[90] h-[60px] flex items-center justify-between px-6 md:px-10 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,5,0.75)" : "rgba(5,5,5,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(245,240,235,0.08)" : "1px solid transparent",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Left: Logo + wordmark */}
      <button
        onClick={() => scrollTo("#hero")}
        className="flex items-center gap-3 group"
        data-testid="navbar-logo"
      >
        <img
          src="/assets/images/logo.png"
          alt="Naqaab"
          className="w-7 h-7 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
          style={{
            filter: "drop-shadow(0 0 0px transparent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(245,240,235,0.4))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "drop-shadow(0 0 0px transparent)";
          }}
        />
        <span className="font-wordmark text-xl text-[var(--white)] tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
          naqaab
        </span>
      </button>

      {/* Center: Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            data-testid={`nav-link-${link.label.toLowerCase()}`}
            className="relative font-meta text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
            style={{
              color: activeLink === link.href ? "var(--white)" : "var(--dim-white)",
            }}
            onMouseEnter={(e) => {
              if (activeLink !== link.href) e.target.style.color = "var(--white)";
            }}
            onMouseLeave={(e) => {
              if (activeLink !== link.href) e.target.style.color = "var(--dim-white)";
            }}
          >
            {link.label}
            <span
              className="absolute -bottom-1 left-0 h-[1px] transition-all duration-500"
              style={{
                width: activeLink === link.href ? "100%" : "0%",
                background: "var(--white)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Right: Login/Logout */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <button
            data-testid="logout-btn"
            onClick={onLogout}
            className="font-meta text-[10px] tracking-[0.15em] uppercase text-[var(--dim-white)] hover:text-[var(--white)] transition-colors duration-300"
          >
            LOGOUT ({user.role})
          </button>
        ) : (
          <button
            data-testid="member-login-btn"
            onClick={onLoginClick}
            className="shimmer-btn font-meta text-[10px] tracking-[0.2em] uppercase px-5 py-2 transition-all duration-500"
            style={{
              color: "var(--white)",
              border: "1px solid rgba(245,240,235,0.3)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--white)";
              e.target.style.color = "var(--black)";
              e.target.style.borderColor = "var(--white)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--white)";
              e.target.style.borderColor = "rgba(245,240,235,0.3)";
            }}
          >
            MEMBER LOGIN
          </button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        data-testid="mobile-menu-btn"
        className="md:hidden text-[var(--white)]"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="absolute top-[60px] left-0 right-0 p-6 flex flex-col gap-4 md:hidden"
          style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)" }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-meta text-sm tracking-[0.2em] uppercase text-[var(--dim-white)] hover:text-[var(--white)] transition-colors text-left py-2"
            >
              {link.label}
            </button>
          ))}
          <hr className="border-[var(--deep-grey)]" />
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
        </div>
      )}
    </nav>
  );
}
