import React, { useState, useCallback, memo } from 'react';

const TiltCard = memo(({ children, className }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const ref = React.useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      y: ((x - centerX) / centerX) * 5,
      x: ((y - centerY) / centerY) * -5,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setRotate({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className={className}
    >
      {children}
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

export { TiltCard };