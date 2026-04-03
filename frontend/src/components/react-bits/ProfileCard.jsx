import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ProfileCard = ({ image, title, subtitle, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div className="absolute inset-0 z-0 bg-[#111]" />
      <img src={image} alt={title} className="w-full h-[300px] object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      <div className="absolute bottom-6 left-6 right-6 z-20" style={{ transform: "translateZ(30px)" }}>
        <h3 className="font-display text-2xl tracking-[0.1em] text-[var(--bright-white)] mb-1">{title}</h3>
        <p className="font-meta text-[10px] tracking-widest text-[#c8b89a] uppercase">{subtitle}</p>
      </div>
    </motion.div>
  );
};
