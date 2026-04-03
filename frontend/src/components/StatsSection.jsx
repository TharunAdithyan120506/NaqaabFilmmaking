import { AnimatedCounter } from "./react-bits/AnimatedCounter";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <div className="py-24 border-y border-[rgba(255,255,255,0.05)] text-center relative overflow-hidden" style={{ background: "var(--black)" }}>
      {/* Moving gradient behind stats */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.03]"
        style={{ background: "var(--white)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="font-display text-5xl md:text-7xl text-[#e8e4d9] mb-2 flex items-baseline">
            <AnimatedCounter value={12} duration={2} />
            <span className="text-3xl ml-1 text-[#c8b89a]">+</span>
          </div>
          <p className="font-meta text-[9px] tracking-[0.2em] uppercase text-[var(--dim-white)]">Original Films</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="font-display text-5xl md:text-7xl text-[#e8e4d9] mb-2 flex items-baseline">
            <AnimatedCounter value={50} duration={2.5} />
            <span className="text-3xl ml-1 text-[#c8b89a]">+</span>
          </div>
          <p className="font-meta text-[9px] tracking-[0.2em] uppercase text-[var(--dim-white)]">Active Members</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="font-display text-5xl md:text-7xl text-[#e8e4d9] mb-2 flex items-baseline">
            <AnimatedCounter value={8} duration={2} />
          </div>
          <p className="font-meta text-[9px] tracking-[0.2em] uppercase text-[var(--dim-white)]">Departments</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="font-display text-5xl md:text-7xl text-[#e8e4d9] mb-2 flex items-baseline">
            <AnimatedCounter value={24} duration={3} />
            <span className="text-3xl ml-1 text-[#c8b89a]">M</span>
          </div>
          <p className="font-meta text-[9px] tracking-[0.2em] uppercase text-[var(--dim-white)]">Views Generated</p>
        </div>
      </div>
    </div>
  );
}
