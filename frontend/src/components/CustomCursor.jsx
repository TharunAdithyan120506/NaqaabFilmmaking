import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onHoverIn = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.opacity = "0.5";
        ringRef.current.style.transform = `translate(${ringX - 24}px, ${ringY - 24}px)`;
      }
    };

    const onHoverOut = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: "8px",
          height: "8px",
          background: "var(--gold)",
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none transition-[width,height,opacity] duration-200"
        style={{
          width: "32px",
          height: "32px",
          border: "1px solid var(--gold)",
          borderRadius: "50%",
          opacity: 0.6,
        }}
      />
    </>
  );
}
