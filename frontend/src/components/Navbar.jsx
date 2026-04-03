import { useState, useEffect } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="fixed top-0 left-0 right-0 z-[90] h-[60px] flex items-center justify-between px-6 md:px-10 transition-all duration-300"
      style={{
        background: "rgba(5,5,5,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid var(--gold)" : "1px solid transparent",
      }}
    >
      {/* Left: Logo + wordmark */}
      <button
        onClick={() => scrollTo("#hero")}
        className="flex items-center gap-3 group"
        data-testid="navbar-logo"
      >
        <img
          src="/assets/images/logo.png"
          alt="Naqaab"
          className="w-6 h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <span className="font-wordmark text-xl text-[var(--white)] tracking-wider">
          naqaab
        </span>
      </button>

      {/* Center: Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            data-testid={`nav-link-${link.label.toLowerCase()}`}
            className="relative font-meta text-xs tracking-[0.2em] uppercase transition-colors"
            style={{
              color: activeLink === link.href ? "var(--gold)" : "var(--dim-white)",
            }}
          >
            {link.label}
            <span
              className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
              style={{
                width: activeLink === link.href ? "100%" : "0%",
                background: "var(--gold)",
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
            className="font-meta text-xs tracking-[0.15em] uppercase text-[var(--gold)] hover:text-[var(--white)] transition-colors"
          >
            LOGOUT ({user.role})
          </button>
        ) : (
          <button
            data-testid="member-login-btn"
            onClick={onLoginClick}
            className="font-meta text-xs tracking-[0.15em] uppercase px-5 py-2 transition-all duration-300"
            style={{
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--gold)";
              e.target.style.color = "var(--black)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--gold)";
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
          style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(16px)" }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-meta text-sm tracking-[0.2em] uppercase text-[var(--dim-white)] hover:text-[var(--gold)] transition-colors text-left py-2"
            >
              {link.label}
            </button>
          ))}
          <hr className="border-[var(--deep-grey)]" />
          {user ? (
            <button
              onClick={onLogout}
              className="font-meta text-sm tracking-[0.15em] uppercase text-[var(--gold)] text-left py-2"
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={() => { onLoginClick(); setMobileOpen(false); }}
              className="font-meta text-sm tracking-[0.15em] uppercase text-[var(--gold)] text-left py-2"
            >
              MEMBER LOGIN
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
