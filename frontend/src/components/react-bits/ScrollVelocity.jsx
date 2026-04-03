import { useRef, useEffect, useState } from "react";

export const ScrollVelocity = ({ children, baseVelocity = 2, className = "" }) => {
  const [offset, setOffset] = useState(0);
  const animRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      const velocityBoost = 1 + Math.min(Math.abs(scrollVelocity.current) * 0.05, 3);
      const direction = scrollVelocity.current < 0 ? -1 : 1;
      setOffset(prev => {
        let next = prev - baseVelocity * velocityBoost * direction * 0.016;
        // Reset seamlessly
        if (next < -25) next += 25;
        if (next > 0) next -= 25;
        return next;
      });
      scrollVelocity.current *= 0.95; // decay
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [baseVelocity]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} style={{ width: "100%" }}>
      <div
        className="inline-flex whitespace-nowrap"
        style={{ transform: `translateX(${offset}%)`, willChange: "transform" }}
      >
        <span style={{ flexShrink: 0 }}>{children}</span>
        <span style={{ flexShrink: 0 }}>{children}</span>
        <span style={{ flexShrink: 0 }}>{children}</span>
        <span style={{ flexShrink: 0 }}>{children}</span>
        <span style={{ flexShrink: 0 }}>{children}</span>
        <span style={{ flexShrink: 0 }}>{children}</span>
      </div>
    </div>
  );
};
