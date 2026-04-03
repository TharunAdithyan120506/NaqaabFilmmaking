import { motion } from "framer-motion";

export const BlurText = ({ children, className = "" }) => {
  const words = typeof children === "string" ? children.split(" ") : [];

  return (
    <div className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap overflow-visible mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
