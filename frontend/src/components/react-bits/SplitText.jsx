import { motion } from "framer-motion";

export const SplitText = ({ children, delay = 0.05, className = "", style = {} }) => {
  const characters = typeof children === "string" ? children.split("") : [];

  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {characters.map((char, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: i * delay + 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
