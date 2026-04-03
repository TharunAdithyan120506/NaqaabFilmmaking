import { useState, useEffect } from "react";
import { WORKSHOP_DATA, COMPETITION_DATA, MOCK_SUBMISSIONS } from "@/data";
import ScrollReveal from "@/components/ScrollReveal";
import { Star, Calendar, Users, Trophy, FileText, PlusCircle } from "lucide-react";

export default function MemberPortal({ user, onJoinClick, onLoginClick, onLogout }) {
  if (!user) {
    return <PortalCTA onJoinClick={onJoinClick} onLoginClick={onLoginClick} />;
  }

  return <PortalDashboard user={user} onLogout={onLogout} />;
}

function PortalCTA({ onJoinClick, onLoginClick }) {
  return (
    <div
      data-testid="portal-cta"
      className="py-24 md:py-32"
      style={{ background: "var(--off-black)" }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <ScrollReveal>
          <p className="font-display text-lg tracking-[0.2em] mb-4" style={{ color: "var(--gold)" }}>
            WANT TO BE PART OF NAQAAB?
          </p>
          <p className="font-serif italic text-base md:text-lg mb-6" style={{ color: "var(--dim-white)" }}>
            "Cinema is for everyone."
          </p>
          <p className="font-body text-sm mb-10 leading-relaxed" style={{ color: "var(--dim-white)" }}>
            Fill out our interest form and we'll reach out before the next recruitment drive.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              data-testid="submit-interest-btn"
              onClick={onJoinClick}
              className="font-meta text-xs tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300 hover:bg-[var(--white)] hover:text-[var(--black)]"
              style={{ background: "var(--gold)", color: "var(--black)" }}
            >
              SUBMIT YOUR INTEREST &rarr;
            </button>
            <button
              data-testid="portal-login-btn"
              onClick={onLoginClick}
              className="font-meta text-xs tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--black)]"
              style={{ border: "1px solid var(--gold)", color: "var(--gold)", background: "transparent" }}
            >
              MEMBER LOGIN
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function PortalDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("events");
  const [rsvps, setRsvps] = useState(() => {
    const saved = localStorage.getItem("naqaab_rsvps");
    return saved ? JSON.parse(saved) : {};
  });
  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem("naqaab_registrations");
    return saved ? JSON.parse(saved) : {};
  });
  const [boardEvents, setBoardEvents] = useState(() => {
    const saved = localStorage.getItem("naqaab_board_events");
    return saved ? JSON.parse(saved) : [];
  });

  const tabs = [
    { id: "events", label: "UPCOMING EVENTS", icon: Calendar },
    { id: "workshops", label: "WORKSHOPS", icon: FileText },
    { id: "competitions", label: "COMPETITIONS", icon: Trophy },
  ];

  if (user.role === "board") {
    tabs.push({ id: "admin", label: "ADMIN PANEL", icon: Users });
  }

  const toggleRsvp = (eventId) => {
    const newRsvps = { ...rsvps, [eventId]: !rsvps[eventId] };
    setRsvps(newRsvps);
    localStorage.setItem("naqaab_rsvps", JSON.stringify(newRsvps));
  };

  const toggleRegistration = (workshopId) => {
    const newRegs = { ...registrations, [workshopId]: !registrations[workshopId] };
    setRegistrations(newRegs);
    localStorage.setItem("naqaab_registrations", JSON.stringify(newRegs));
  };

  const upcomingEvents = [
    { id: "gbm-feb", name: "General Body Meeting", date: "Feb 15, 2026", venue: "AB-3", description: "Monthly GBM with all members. Upcoming projects discussion." },
    { id: "shoot-mannpasand", name: "Mannpasand — Final Shoot", date: "Feb 20-22, 2026", venue: "MIT Campus", description: "Final shooting sessions for the Mannpasand short film." },
    { id: "ifp-prep", name: "IFP Preparation Session", date: "Mar 1, 2026", venue: "KEF R&D Centre", description: "Strategy session for India Film Project participation." },
    ...boardEvents.map((e, i) => ({ ...e, id: `board-${i}` })),
  ];

  return (
    <div
      data-testid="member-portal"
      className="py-24 md:py-32"
      style={{ background: "var(--off-black)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-display text-sm tracking-[0.4em] uppercase mb-2" style={{ color: "var(--teal)" }}>
              THE SCREENING ROOM
            </p>
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--white)" }}>
              MEMBER PORTAL
            </h2>
          </div>
          <button
            data-testid="portal-logout-btn"
            onClick={onLogout}
            className="font-meta text-xs tracking-[0.15em] uppercase px-5 py-2 transition-all hover:bg-[var(--gold)] hover:text-[var(--black)]"
            style={{ color: "var(--gold)", border: "1px solid var(--gold)" }}
          >
            LOGOUT
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-10" style={{ borderBottom: "1px solid var(--deep-grey)" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                data-testid={`portal-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 font-meta text-[10px] md:text-xs tracking-[0.15em] uppercase pb-3 transition-all relative"
                style={{ color: activeTab === tab.id ? "var(--gold)" : "var(--dim-white)" }}
              >
                <Icon size={14} />
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                  style={{ width: activeTab === tab.id ? "100%" : "0%", background: "var(--gold)" }}
                />
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-5"
                style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}
              >
                <p className="font-meta text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--gold)" }}>
                  {event.date}
                </p>
                <h4 className="font-display text-lg mb-1" style={{ color: "var(--white)" }}>
                  {event.name.toUpperCase()}
                </h4>
                <p className="font-meta text-[10px] mb-3" style={{ color: "var(--dim-white)" }}>
                  {event.venue}
                </p>
                <p className="font-body text-xs mb-4 leading-relaxed" style={{ color: "var(--dim-white)" }}>
                  {event.description}
                </p>
                <button
                  onClick={() => toggleRsvp(event.id)}
                  className="flex items-center gap-2 font-meta text-[10px] tracking-[0.1em] uppercase transition-colors"
                  style={{ color: rsvps[event.id] ? "var(--gold)" : "var(--dim-white)" }}
                >
                  <Star size={14} fill={rsvps[event.id] ? "var(--gold)" : "none"} />
                  {rsvps[event.id] ? "RSVP'D" : "RSVP"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "workshops" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WORKSHOP_DATA.map((ws, i) => (
              <div
                key={i}
                className="p-5"
                style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}
              >
                <h4 className="font-display text-lg mb-2" style={{ color: "var(--white)" }}>
                  {ws.name.toUpperCase()}
                </h4>
                <p className="font-meta text-[10px] mb-1" style={{ color: "var(--dim-white)" }}>
                  Facilitator: {ws.facilitator}
                </p>
                <p className="font-meta text-[10px] mb-4" style={{ color: "var(--gold)" }}>
                  {ws.date}
                </p>
                <button
                  onClick={() => toggleRegistration(`ws-${i}`)}
                  className="font-meta text-[10px] tracking-[0.15em] uppercase px-4 py-2 transition-all"
                  style={{
                    background: registrations[`ws-${i}`] ? "var(--teal)" : "transparent",
                    color: registrations[`ws-${i}`] ? "var(--black)" : "var(--teal)",
                    border: "1px solid var(--teal)",
                  }}
                >
                  {registrations[`ws-${i}`] ? "REGISTERED" : "REGISTER"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "competitions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMPETITION_DATA.map((comp, i) => (
              <div
                key={i}
                className="p-5"
                style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}
              >
                <h4 className="font-display text-lg mb-2" style={{ color: "var(--white)" }}>
                  {comp.name.toUpperCase()}
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="font-meta text-[8px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>THEME</p>
                    <p className="font-meta text-[10px]" style={{ color: "var(--white)" }}>{comp.theme}</p>
                  </div>
                  <div>
                    <p className="font-meta text-[8px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>DEADLINE</p>
                    <p className="font-meta text-[10px]" style={{ color: "var(--gold)" }}>{comp.deadline}</p>
                  </div>
                  <div>
                    <p className="font-meta text-[8px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>TEAM SIZE</p>
                    <p className="font-meta text-[10px]" style={{ color: "var(--white)" }}>{comp.teamSize}</p>
                  </div>
                  <div>
                    <p className="font-meta text-[8px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>PRIZE</p>
                    <p className="font-meta text-[10px]" style={{ color: "var(--teal)" }}>{comp.prize}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "admin" && user.role === "board" && (
          <AdminPanel
            boardEvents={boardEvents}
            setBoardEvents={setBoardEvents}
          />
        )}
      </div>
    </div>
  );
}

function AdminPanel({ boardEvents, setBoardEvents }) {
  const [form, setForm] = useState({ name: "", date: "", venue: "", description: "" });
  const submissions = JSON.parse(localStorage.getItem("naqaab_submissions") || "null") || MOCK_SUBMISSIONS;

  const addEvent = () => {
    if (!form.name || !form.date) return;
    const newEvents = [...boardEvents, form];
    setBoardEvents(newEvents);
    localStorage.setItem("naqaab_board_events", JSON.stringify(newEvents));
    setForm({ name: "", date: "", venue: "", description: "" });
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <div className="p-5" style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}>
          <p className="font-display text-3xl" style={{ color: "var(--gold)" }}>200+</p>
          <p className="font-meta text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>MEMBERS</p>
        </div>
        <div className="p-5" style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}>
          <p className="font-display text-3xl" style={{ color: "var(--teal)" }}>{submissions.length}</p>
          <p className="font-meta text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>SUBMISSIONS</p>
        </div>
        <div className="p-5" style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}>
          <p className="font-display text-3xl" style={{ color: "var(--white)" }}>15+</p>
          <p className="font-meta text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>FILMS MADE</p>
        </div>
        <div className="p-5" style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}>
          <p className="font-display text-3xl" style={{ color: "var(--crimson)" }}>3+</p>
          <p className="font-meta text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--dim-white)" }}>AWARDS</p>
        </div>
      </div>

      {/* Submissions */}
      <h3 className="font-display text-xl mb-5" style={{ color: "var(--white)" }}>INTEREST FORM SUBMISSIONS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {submissions.map((sub, i) => (
          <div key={i} className="p-5" style={{ background: "var(--black)", border: "1px solid var(--deep-grey)" }}>
            <p className="font-serif text-base mb-1" style={{ color: "var(--white)" }}>{sub.name}</p>
            <p className="font-meta text-[10px] mb-2" style={{ color: "var(--dim-white)" }}>{sub.regNo} &middot; {sub.dept} &middot; {sub.year} Year</p>
            <p className="font-body text-xs mb-2 leading-relaxed" style={{ color: "var(--dim-white)" }}>"{sub.reason}"</p>
            <div className="flex flex-wrap gap-1">
              {sub.interests.map((int) => (
                <span key={int} className="font-meta text-[8px] px-1.5 py-0.5" style={{ background: "var(--deep-grey)", color: "var(--teal)" }}>
                  {int}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Event */}
      <h3 className="font-display text-xl mb-5" style={{ color: "var(--white)" }}>ANNOUNCE NEW EVENT</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {["name", "date", "venue", "description"].map((field) => (
          <div key={field}>
            <label className="block font-meta text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "var(--dim-white)" }}>
              {field.toUpperCase()}
            </label>
            <input
              data-testid={`admin-event-${field}`}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full p-3 font-body text-sm bg-transparent outline-none transition-colors focus:border-[var(--gold)]"
              style={{ background: "var(--black)", border: "1px solid var(--deep-grey)", color: "var(--white)" }}
              placeholder={field === "date" ? "e.g. Mar 15, 2026" : ""}
            />
          </div>
        ))}
      </div>
      <button
        data-testid="admin-add-event-btn"
        onClick={addEvent}
        className="flex items-center gap-2 font-meta text-xs tracking-[0.15em] uppercase px-6 py-3 transition-all hover:bg-[var(--white)] hover:text-[var(--black)]"
        style={{ background: "var(--gold)", color: "var(--black)" }}
      >
        <PlusCircle size={14} />
        ADD EVENT
      </button>
    </div>
  );
}
