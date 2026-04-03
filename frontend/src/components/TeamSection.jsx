import { BOARD_MEMBERS, CREATIVE_MEMBERS, MANAGEMENT_MEMBERS } from "@/data";
import { ProfileCard } from "./react-bits/ProfileCard";
import { motion } from "framer-motion";

const ALL_MEMBERS = [...BOARD_MEMBERS, ...CREATIVE_MEMBERS, ...MANAGEMENT_MEMBERS];

export default function TeamSection() {
  return (
    <div
      data-testid="team-section"
      className="py-32 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="font-meta text-[10px] tracking-[0.4em] text-[var(--dim-white)] uppercase mb-6">
            MEET THE CREW
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wide text-[var(--white)] mb-8">
            THE CREATIVES
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--dim-white)] to-transparent mx-auto opacity-30" />
        </motion.div>

        {/* Executive Board */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-meta text-[10px] tracking-[0.3em] text-[#c8b89a] uppercase mb-8">
            EXECUTIVE BOARD 2025–2026
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BOARD_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <ProfileCard
                  image={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=111111&textColor=e8e4d9`}
                  title={member.name}
                  subtitle={member.role}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creative & Production */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-meta text-[10px] tracking-[0.3em] text-[#c8b89a] uppercase mb-8">
            CREATIVE & PRODUCTION
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CREATIVE_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <ProfileCard
                  image={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=111111&textColor=e8e4d9`}
                  title={member.name}
                  subtitle={member.role}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Management & Operations */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-meta text-[10px] tracking-[0.3em] text-[#c8b89a] uppercase mb-8">
            MANAGEMENT & OPERATIONS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {MANAGEMENT_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <ProfileCard
                  image={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=111111&textColor=e8e4d9`}
                  title={member.name}
                  subtitle={member.role}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Faculty Advisor */}
        <motion.div
          className="max-w-md mx-auto text-center p-8 border border-[rgba(232,228,217,0.15)]"
          style={{ background: "var(--off-black)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-meta text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--dim-white)" }}>
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
        </motion.div>
      </div>
    </div>
  );
}
