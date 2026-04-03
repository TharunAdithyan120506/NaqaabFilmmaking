import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CardSwap = ({ cards, width = 300, height = 450 }) => {
  const [index, setIndex] = useState(0);

  const nextCard = () => setIndex((prev) => (prev + 1) % cards.length);

  return (
    <div
      className="relative cursor-pointer perspective-1000"
      style={{ width, height, perspective: "1000px" }}
      onClick={nextCard}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => {
          // Calculate relative position to top card
          const relativeIndex = (i - index + cards.length) % cards.length;
          // Only show top 3 cards for performance
          if (relativeIndex > 3) return null;
          
          return (
            <motion.div
              key={card.id || i}
              className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
              style={{ transformOrigin: "bottom center" }}
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{
                scale: 1 - relativeIndex * 0.05,
                y: relativeIndex * 20,
                opacity: 1 - relativeIndex * 0.2,
                zIndex: cards.length - relativeIndex,
              }}
              exit={{ scale: 1.1, y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {card.content}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
