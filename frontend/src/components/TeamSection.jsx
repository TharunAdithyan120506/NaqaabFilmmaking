import { useRef } from "react";
import { BOARD_MEMBERS, CREATIVE_MEMBERS, MANAGEMENT_MEMBERS } from "@/data";
import ScrollReveal from "@/components/ScrollReveal";
import { User } from "lucide-react";

export default function TeamSection() {
  return (
    <div
      data-testid="team-section"
      className="relative py-24 md:py-32"
      style={{ background: "var(--black)" }}
    >
      {/* Diagonal top */}
      <div
        className="absolute top-0 left-0 right-0 h-16"
        style={{
          background: "var(--off-black)",
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p
            className="font-display text-sm tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--dim-white)" }}
          >
            MEET THE CREW
          </p>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl mb-12"
            style={{ color: "var(--white)" }}
          >
            EXECUTIVE BOARD 2025-2026
          </h2>
        </ScrollReveal>

        {/* Board Members */}
        <div className="relative mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BOARD_MEMBERS.map((member, i) => (
              <ScrollReveal key={member.name + member.role} delay={i * 80}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
          <p
            className="font-display text-5xl md:text-7xl absolute -bottom-6 right-0 select-none pointer-events-none"
            style={{ color: "var(--white)", opacity: 0.03 }}
          >
            EXECUTIVE BOARD
          </p>
        </div>

        {/* Creative & Production */}
        <div className="relative mb-20">
          <ScrollReveal>
            <h3 className="font-display text-xl tracking-[0.2em] mb-8" style={{ color: "var(--gold)" }}>
              CREATIVE & PRODUCTION
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CREATIVE_MEMBERS.map((member, i) => (
              <ScrollReveal key={member.name + member.role} delay={i * 80}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
          <p
            className="font-display text-5xl md:text-7xl absolute -bottom-6 right-0 select-none pointer-events-none"
            style={{ color: "var(--white)", opacity: 0.03 }}
          >
            CREATIVE
          </p>
        </div>

        {/* Management & Operations */}
        <div className="relative mb-20">
          <ScrollReveal>
            <h3 className="font-display text-xl tracking-[0.2em] mb-8" style={{ color: "var(--gold)" }}>
              MANAGEMENT & OPERATIONS
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {MANAGEMENT_MEMBERS.map((member, i) => (
              <ScrollReveal key={member.name + member.role} delay={i * 80}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
          <p
            className="font-display text-5xl md:text-7xl absolute -bottom-6 right-0 select-none pointer-events-none"
            style={{ color: "var(--white)", opacity: 0.03 }}
          >
            MANAGEMENT
          </p>
        </div>

        {/* Faculty Advisor */}
        <ScrollReveal>
          <div
            className="max-w-md mx-auto text-center p-8"
            style={{
              border: "1px solid var(--gold)",
              background: "var(--off-black)",
            }}
          >
            <p
              className="font-display text-sm tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--gold)" }}
            >
              FACULTY ADVISOR
            </p>
            <p className="font-serif italic text-xl mb-2" style={{ color: "var(--white)" }}>
              Mr. Nithesh Kumar KS
            </p>
            <p className="font-meta text-[10px] tracking-[0.1em] leading-relaxed" style={{ color: "var(--dim-white)" }}>
              Assistant Professor &middot; Dept. of Humanities & Management
              <br />
              Manipal Institute of Technology
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function TeamCard({ member }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      data-testid={`team-card-${member.name.replace(/\s+/g, "-").toLowerCase()}`}
      className="group p-5 transition-all duration-300"
      style={{
        background: "var(--off-black)",
        border: "1px solid var(--deep-grey)",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar placeholder */}
      <div
        className="w-full aspect-square mb-5 flex items-center justify-center overflow-hidden transition-all duration-500"
        style={{
          background: "var(--black)",
          border: "1px solid var(--deep-grey)",
          filter: "grayscale(1)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(1)"; }}
      >
        <User
          size={64}
          style={{ color: "var(--ash)", opacity: 0.5 }}
        />
      </div>

      {/* Role tag */}
      <div className="flex items-center gap-2 mb-2">
        <p className="font-display text-sm tracking-[0.15em]" style={{ color: "var(--gold)" }}>
          {member.role.toUpperCase()}
        </p>
        <span className="font-meta text-[8px] tracking-[0.1em] px-1.5 py-0.5" style={{ color: "var(--dim-white)", background: "var(--deep-grey)" }}>
          {member.group.toUpperCase()}
        </span>
      </div>

      {/* Name */}
      <p
        className="font-serif text-lg mb-3 transition-colors group-hover:text-[var(--gold)]"
        style={{ color: "var(--white)" }}
      >
        {member.name}
      </p>

      {/* Quote */}
      <p
        className="font-script text-sm mb-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all"
        style={{ color: "var(--dim-white)" }}
      >
        "{member.quote}"
      </p>

      {/* Fav films */}
      <div>
        <p className="font-meta text-[8px] tracking-[0.15em] uppercase mb-1" style={{ color: "var(--dim-white)" }}>
          FAV FILMS:
        </p>
        <p className="font-meta text-[10px]" style={{ color: "var(--dim-white)", opacity: 0.7 }}>
          {member.films.join(" \u00B7 ")}
        </p>
      </div>
    </div>
  );
}
