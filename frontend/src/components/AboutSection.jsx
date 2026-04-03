import ScrollReveal from "@/components/ScrollReveal";

export default function AboutSection() {
  const filmFrames = [
    "MANNPASAND",
    "SUPERSTAR",
    "CROSS ROADS",
    "20 MINUTES",
  ];

  return (
    <div
      data-testid="about-section"
      className="relative py-24 md:py-32"
      style={{ background: "var(--off-black)" }}
    >
      {/* Diagonal top break */}
      <div
        className="absolute top-0 left-0 right-0 h-16"
        style={{
          background: "var(--black)",
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <ScrollReveal>
            <div>
              <p
                className="font-serif italic text-base md:text-lg mb-6"
                style={{ color: "var(--gold)" }}
              >
                "It began with a late-night conversation."
              </p>

              <h2
                className="font-display text-4xl sm:text-5xl lg:text-6xl mb-8"
                style={{ color: "var(--white)" }}
              >
                WHO WE ARE
              </h2>

              <div
                className="font-body text-sm leading-[1.9] mb-10 space-y-4"
                style={{ color: "var(--dim-white)" }}
              >
                <p>
                  Naqaab is the official filmmaking club of MIT Manipal
                  — a community built from a shared passion for visual
                  storytelling. Founded on the belief that cinema is for
                  everyone, our mission is to foster a vibrant filmmaking
                  culture, one frame at a time.
                </p>
                <p>
                  What started as a spontaneous, late-night conversation
                  between two friends turned into a three-hour eureka moment
                  — and Naqaab was born. We provide a space for learning,
                  creativity, and collaboration, transforming ideas into reality
                  through projects, workshops, and shared endeavors.
                </p>
              </div>

              {/* Gold rule */}
              <div
                className="w-16 h-[2px] mb-10"
                style={{ background: "var(--gold)" }}
              />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { number: "200+", label: "MEMBERS" },
                  { number: "15+", label: "FILMS MADE" },
                  { number: "3+", label: "AWARDS WON" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-display text-3xl md:text-4xl mb-1"
                      style={{ color: "var(--gold)" }}
                    >
                      {stat.number}
                    </p>
                    <p
                      className="font-meta text-[9px] md:text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: "var(--dim-white)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Film strip */}
          <ScrollReveal delay={200}>
            <div className="relative">
              <div
                className="relative overflow-hidden mx-auto"
                style={{ maxWidth: "320px" }}
              >
                {/* Sprocket holes */}
                <div className="absolute top-0 bottom-0 left-0 w-6 z-10 flex flex-col justify-between py-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 mx-auto"
                      style={{
                        background: "var(--black)",
                        border: "1px solid var(--ash)",
                        borderRadius: "1px",
                      }}
                    />
                  ))}
                </div>
                <div className="absolute top-0 bottom-0 right-0 w-6 z-10 flex flex-col justify-between py-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 mx-auto"
                      style={{
                        background: "var(--black)",
                        border: "1px solid var(--ash)",
                        borderRadius: "1px",
                      }}
                    />
                  ))}
                </div>

                {/* Film frames */}
                <div className="flex flex-col gap-3 px-8">
                  {filmFrames.map((title, i) => (
                    <div
                      key={title}
                      className="relative h-44 flex items-center justify-center overflow-hidden"
                      style={{
                        background: "var(--black)",
                        border: "1px solid var(--deep-grey)",
                        filter: "sepia(0.3)",
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at ${30 + i * 15}% ${40 + i * 10}%, rgba(201,168,76,0.08) 0%, transparent 60%)`,
                        }}
                      />
                      <p
                        className="font-display text-2xl tracking-[0.15em] relative z-[1]"
                        style={{ color: "var(--white)", opacity: 0.6 }}
                      >
                        {title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
