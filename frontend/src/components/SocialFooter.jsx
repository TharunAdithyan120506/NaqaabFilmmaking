import ScrollReveal from "@/components/ScrollReveal";
import { Instagram, Mail, Phone, MapPin, Film } from "lucide-react";

export default function SocialFooter() {
  return (
    <div
      data-testid="social-footer"
      className="relative py-24 md:py-32"
      style={{ background: "var(--black)" }}
    >
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Film reel background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 18px, var(--white) 18px, var(--white) 20px),
            repeating-linear-gradient(90deg, transparent, transparent 28px, var(--white) 28px, var(--white) 30px)
          `,
          backgroundSize: "30px 20px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p
            className="font-meta text-[10px] tracking-[0.4em] uppercase mb-3 text-center"
            style={{ color: "var(--dim-white)" }}
          >
            ROLL CREDITS
          </p>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl mb-16 text-center"
            style={{ color: "var(--white)" }}
          >
            CONNECT WITH US
          </h2>
        </ScrollReveal>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16">
          {/* Col 1: Follow */}
          <ScrollReveal delay={0}>
            <div className="text-center">
              <a
                href="https://www.instagram.com/naqaabfilms/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="instagram-link"
                className="inline-flex flex-col items-center gap-4 group"
              >
                <Instagram
                  size={48}
                  className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(245,240,235,0.3)]"
                  style={{ color: "var(--dim-white)" }}
                />
                <p className="font-display text-lg tracking-[0.1em] group-hover:text-[var(--white)] transition-colors duration-300" style={{ color: "var(--dim-white)" }}>
                  @naqaabfilms
                </p>
                <p className="font-body text-xs" style={{ color: "var(--dim-white)" }}>
                  Follow our journey
                </p>
              </a>
            </div>
          </ScrollReveal>

          {/* Col 2: Naqaab Picks */}
          <ScrollReveal delay={100}>
            <div className="text-center">
              <a
                href="https://www.instagram.com/naqaabpicks/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="naqaabpicks-link"
                className="inline-flex flex-col items-center gap-4 group"
              >
                <Film
                  size={48}
                  className="transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(245,240,235,0.3)]"
                  style={{ color: "var(--dim-white)" }}
                />
                <p className="font-display text-lg tracking-[0.1em] group-hover:text-[var(--white)] transition-colors duration-300" style={{ color: "var(--dim-white)" }}>
                  @naqaabpicks
                </p>
                <p className="font-body text-xs" style={{ color: "var(--dim-white)" }}>
                  Film reviews & recommendations
                </p>
              </a>
            </div>
          </ScrollReveal>

          {/* Col 3: Contact */}
          <ScrollReveal delay={200}>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Mail size={16} style={{ color: "var(--dim-white)" }} />
                <a
                  href="mailto:naqaabfilms.mit@manipal.edu"
                  data-testid="email-link"
                  className="font-body text-xs hover:text-[var(--white)] transition-colors duration-300"
                  style={{ color: "var(--dim-white)" }}
                >
                  naqaabfilms.mit@manipal.edu
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={16} style={{ color: "var(--dim-white)" }} />
                <a
                  href="tel:+918274076737"
                  data-testid="phone-link"
                  className="font-body text-xs hover:text-[var(--white)] transition-colors duration-300"
                  style={{ color: "var(--dim-white)" }}
                >
                  +91 82740 76737
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin size={16} style={{ color: "var(--dim-white)" }} />
                <p className="font-body text-xs" style={{ color: "var(--dim-white)" }}>
                  MIT Manipal, Manipal — 576104
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom row */}
        <div
          className="pt-8 text-center space-y-2"
          style={{ borderTop: "1px solid var(--deep-grey)" }}
        >
          <p className="font-meta text-[10px] tracking-[0.1em]" style={{ color: "var(--dim-white)" }}>
            Faculty Advisor: Mr. Nithesh Kumar KS &middot; Asst. Professor, Dept. of Humanities & Management
          </p>
          <p className="font-meta text-[10px] tracking-[0.1em]" style={{ color: "var(--dim-white)" }}>
            &copy; {new Date().getFullYear()} naqaab FILMMAKING &middot; Manipal Institute of Technology
          </p>
          <p className="font-meta text-[10px] tracking-[0.1em]" style={{ color: "var(--dim-white)", opacity: 0.4 }}>
            Made with film by Naqaab
          </p>
        </div>
      </div>

      {/* "ROLL CAMERA" floating badge — white border */}
      <button
        data-testid="roll-camera-btn"
        onClick={() => document.getElementById("films")?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-[80] flex items-center gap-2 px-4 py-2 transition-all duration-500 hover:bg-[var(--white)] hover:text-[var(--black)] group"
        style={{
          background: "rgba(5,5,5,0.9)",
          border: "1px solid rgba(245,240,235,0.15)",
          color: "var(--dim-white)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "var(--crimson)" }}
        />
        <span className="font-meta text-[9px] tracking-[0.15em] uppercase">
          ROLL CAMERA
        </span>
      </button>
    </div>
  );
}
