import { useState } from "react";
import { PAST_EVENTS } from "@/data";
import ScrollReveal from "@/components/ScrollReveal";

const CATEGORY_COLORS = {
  Competition: "var(--gold)",
  Content: "var(--teal)",
  Internal: "var(--dim-white)",
  Outreach: "var(--gold)",
  Collab: "var(--teal)",
  Screening: "var(--crimson)",
  "Social Impact": "var(--teal)",
  Workshop: "var(--gold)",
  Achievement: "var(--gold)",
};

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("past");

  return (
    <div
      data-testid="events-section"
      className="relative py-24 md:py-32"
      style={{ background: "var(--black)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p
            className="font-display text-sm tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--dim-white)" }}
          >
            BEHIND THE SCENES
          </p>
          <h2
            className="font-display text-3xl md:text-5xl lg:text-6xl mb-10"
            style={{ color: "var(--white)" }}
          >
            EVENTS & ACTIVITIES
          </h2>
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex gap-8 mb-10" style={{ borderBottom: "1px solid var(--deep-grey)" }}>
          {["past", "upcoming"].map((tab) => (
            <button
              key={tab}
              data-testid={`events-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className="font-meta text-xs tracking-[0.2em] uppercase pb-3 transition-all duration-300 relative"
              style={{
                color: activeTab === tab ? "var(--gold)" : "var(--dim-white)",
              }}
            >
              {tab === "past" ? "PAST" : "UPCOMING"}
              <span
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                style={{
                  width: activeTab === tab ? "100%" : "0%",
                  background: "var(--gold)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "past" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {PAST_EVENTS.map((event, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 flex flex-col items-center justify-center h-48"
                style={{
                  background: "var(--off-black)",
                  border: "1px solid var(--deep-grey)",
                  animation: "pulse-gold 3s infinite",
                }}
              >
                <p className="font-display text-lg mb-2" style={{ color: "var(--gold)" }}>
                  COMING SOON
                </p>
                <p className="font-meta text-xs" style={{ color: "var(--dim-white)" }}>
                  Stay tuned @naqaabfilms
                  <span className="animate-pulse">...</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const catColor = CATEGORY_COLORS[event.category] || "var(--dim-white)";

  return (
    <div
      data-testid={`event-card-${event.name.replace(/\s+/g, "-").toLowerCase()}`}
      className="group p-6 transition-all duration-300 hover:bg-[#141414]"
      style={{
        background: "var(--off-black)",
        borderLeft: "0px solid transparent",
        borderTop: "1px solid var(--deep-grey)",
        borderRight: "1px solid var(--deep-grey)",
        borderBottom: "1px solid var(--deep-grey)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeft = `3px solid var(--gold)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeft = "0px solid transparent";
      }}
    >
      <p
        className="font-meta text-[10px] tracking-[0.15em] uppercase mb-3"
        style={{ color: "var(--gold)" }}
      >
        {event.date}
      </p>

      <h3
        className="font-display text-xl md:text-2xl mb-3 leading-tight"
        style={{ color: "var(--white)" }}
      >
        {event.name.toUpperCase()}
      </h3>

      <p
        className="font-body text-xs leading-relaxed mb-4"
        style={{ color: "var(--dim-white)" }}
      >
        {event.description}
      </p>

      <span
        className="inline-flex items-center gap-1.5 font-meta text-[9px] tracking-[0.15em] uppercase px-2 py-1"
        style={{
          color: catColor,
          background: `${catColor}10`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
        {event.category.toUpperCase()}
      </span>
    </div>
  );
}
