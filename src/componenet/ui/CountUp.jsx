import { useState, useEffect, useRef, memo } from 'react';
import { useInView } from 'framer-motion';

const CountUp = memo(({ end, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(1, (currentTime - startTime) / (duration * 1000));
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-4xl font-bold text-[#0056D2]">
      {count}
      {suffix}
    </span>
  );
});

CountUp.displayName = 'CountUp';

export { CountUp };