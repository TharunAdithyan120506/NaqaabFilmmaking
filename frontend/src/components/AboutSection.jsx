import { motion } from "framer-motion";
import { Spotlight } from "./react-bits/Spotlight";
import { BlurText } from "./react-bits/BlurText";

export default function AboutSection() {
  return (
    <Spotlight className="py-32 relative text-center min-h-[80vh] flex flex-col justify-center items-center" style={{ background: "#0f0f0f" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 z-[2]">
        <motion.p
          className="font-meta text-[10px] tracking-[0.4em] text-[#c8b89a] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          02 &mdash; OUR MISSION
        </motion.p>
        
        <h2 className="font-display text-4xl md:text-6xl text-[var(--bright-white)] tracking-[0.05em] leading-tight mb-12">
          <BlurText>
            FORGING THE ART OF UNSEEN STORIES, MANIFESTED THROUGH LENS AND LIGHT.
          </BlurText>
        </h2>

        <motion.div
          className="flex justify-center mb-16"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-[1px] h-24" style={{ background: "linear-gradient(180deg, var(--dim-white), transparent)" }} />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h3 className="font-meta text-xs tracking-widest text-[#e8e4d9] mb-4">THE VISION</h3>
            <p className="font-serif italic text-lg text-[var(--dim-white)] leading-relaxed">
              We started Naqaab with a singular focus—to give a cinematic voice to the stories that echo within MIT campus. Our approach blends raw, organic storytelling with high-fidelity visual aesthetics.
            </p>
          </div>
          <div>
            <h3 className="font-meta text-xs tracking-widest text-[#e8e4d9] mb-4">THE CRAFT</h3>
            <p className="font-serif italic text-lg text-[var(--dim-white)] leading-relaxed">
              From experimental soundscapes to meticulous color-grading suites, our members are rigorously trained to execute industry-standard filmmaking workflows, transforming abstract ideas into festival-ready cinema.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative film strips */}
      <div className="absolute top-[10%] -left-12 opacity-10 rotate-[-15deg] pointer-events-none hidden lg:block">
        <img src="https://images.unsplash.com/photo-1485001564903-56e6a18d1847?q=80&w=400&auto=format&fit=crop" alt="film strip" className="w-[300px] h-auto filter grayscale mix-blend-screen" />
      </div>
      <div className="absolute bottom-[10%] -right-12 opacity-10 rotate-[15deg] pointer-events-none hidden lg:block">
        <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&auto=format&fit=crop" alt="film reel" className="w-[300px] h-auto filter grayscale mix-blend-screen" />
      </div>
    </Spotlight>
  );
}
