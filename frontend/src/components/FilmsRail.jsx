import { FILMS } from "@/data";
import { CardSwap } from "./react-bits/CardSwap";
import { motion } from "framer-motion";

export default function FilmsRail() {
  const cards = FILMS.map((film, i) => ({
    id: film.id || i,
    content: (
      <div className="w-full h-full relative group">
        <img 
          src={film.thumbnail || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop"} 
          alt={film.title}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-8 right-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#e8e4d9] text-[#080808] font-meta text-[10px] tracking-[0.2em] uppercase rounded-sm mb-4">
            {film.year}
          </span>
          <h3 className="font-display text-4xl text-[#e8e4d9] tracking-wider mb-2 drop-shadow-2xl">
            {film.title}
          </h3>
          {film.director && (
            <p className="font-serif italic text-[#c8b89a] text-sm drop-shadow-md">
              dir. {film.director}
            </p>
          )}
        </div>
      </div>
    )
  }));

  return (
    <div
      data-testid="films-section"
      className="py-32 px-6 md:px-20 min-h-screen flex items-center relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: 40% Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.p
            className="font-meta text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--dim-white)" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            01 &mdash; FROM THE LENS
          </motion.p>
          
          <motion.h2 
            className="font-display text-6xl md:text-8xl tracking-[0.05em] mb-8"
            style={{ color: "var(--bright-white)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            PRODUCTIONS
          </motion.h2>

          <motion.p 
            className="font-serif italic text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "var(--dim-white)", opacity: 0.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every frame is a canvas, every cut a pulse. Explore our award-winning short films, documentaries, and experimental projects crafted by the creative visionaries of Naqaab.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="font-meta text-[10px] tracking-[0.2em] uppercase text-[#080808] bg-[#e8e4d9] px-8 py-3 hover:bg-[#c8b89a] transition-colors duration-300">
              EXPLORE ALL
            </button>
          </motion.div>
        </div>

        {/* Right Side: 60% CardSwap */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Provide explicit width and height to CardSwap */}
            <CardSwap cards={cards} width={400} height={550} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
