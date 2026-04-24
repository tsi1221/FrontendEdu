import { memo, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const formulas = [
  { text: "a² + b² = c²", color: "#0056D2", scale: 1 },
  { text: "E = mc²", color: "#4a6ee0", scale: 0.9 },
  { text: "x = -b ± √(b²-4ac) / 2a", color: "#0056D2", scale: 0.75 },
  { text: "y = mx + b", color: "#2a4ad0", scale: 0.85 },
  { text: "x²", color: "#6366f1", scale: 0.9 },
  { text: "ψ(x,t)", color: "#6366f1", scale: 0.9 },
  { text: "v = u + at", color: "#f39c12", scale: 0.75 },
];

const rand = (min, max) => Math.random() * (max - min) + min;

const estimateWidth = (text) => {
  const base = text.length * 1.8;
  return Math.min(Math.max(base, 8), 24);
};

const generateLayout = () => {
  const placed = [];
  const maxAttempts = 200;

  formulas.forEach((item, index) => {
    let created = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const left = rand(8, 92);
      const top = rand(8, 92);
      const width = estimateWidth(item.text);
      const height = 8;

      const hasCollision = placed.some((p) => {
        const dx = Math.abs(p.left - left);
        const dy = Math.abs(p.top - top);
        return dx < width && dy < height;
      });

      if (!hasCollision) {
        const depth = rand(0, 1);

        created = {
          ...item,
          id: index,
          left,
          top,
          duration: rand(6, 14),
          delay: rand(0, 2),
          blur: depth > 0.7 ? 1.4 : depth > 0.4 ? 0.6 : 0,
          opacity: depth > 0.7 ? 0.35 : depth > 0.4 ? 0.55 : 0.9,
          driftX: rand(8, 20),
          driftY: rand(10, 28),
          rotate: rand(-8, 8),
        };

        break;
      }
    }

    if (!created) {
      created = {
        ...item,
        id: index,
        left: rand(10, 90),
        top: rand(10, 90),
        duration: rand(6, 14),
        delay: rand(0, 2),
        blur: 0,
        opacity: 0.7,
        driftX: rand(8, 20),
        driftY: rand(10, 28),
        rotate: rand(-6, 6),
      };
    }

    placed.push(created);
  });

  return placed;
};

const FloatingFormulas = memo(({ className = "" }) => {
  const reduceMotion = useReducedMotion();

  // initialize state directly (no sync setState in effect)
  const [items, setItems] = useState(() => generateLayout());

  useEffect(() => {
    const onResize = () => {
      setItems(generateLayout());
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* glow background */}
      <div className="absolute left-[10%] top-[15%] h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute right-[12%] top-[25%] h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute left-[30%] bottom-[10%] h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            reduceMotion
              ? { opacity: item.opacity }
              : {
                  opacity: [0, item.opacity, item.opacity * 0.8],
                  x: [0, item.driftX, -item.driftX, 0],
                  y: [0, -item.driftY, item.driftY / 2, 0],
                  rotate: [0, item.rotate, -item.rotate, 0],
                  scale: [item.scale, item.scale * 1.05, item.scale],
                }
          }
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute font-mono font-bold select-none whitespace-nowrap text-xl md:text-2xl lg:text-3xl"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            color: item.color,
            filter: `blur(${item.blur}px)`,
            transform: `translate3d(-50%, -50%, 0) scale(${item.scale})`,
            textShadow:
              "0 0 8px rgba(255,255,255,0.15), 0 0 18px rgba(99,102,241,0.15)",
            willChange: "transform, opacity",
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
});

FloatingFormulas.displayName = "FloatingFormulas";

export { FloatingFormulas };