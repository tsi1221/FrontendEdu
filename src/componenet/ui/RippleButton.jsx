import { memo, useState, useCallback } from 'react';

const baseClasses = {
  primary: 'bg-[#0056D2] text-white shadow-lg hover:shadow-xl',
  outline: 'border-2 border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2]/10',
  ghost: 'text-[#0056D2] hover:bg-[#0056D2]/10',
};

const RippleButton = memo(({ onClick, children, className = '', variant = 'primary', icon }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick();
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 ${baseClasses[variant]} ${className}`}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute w-20 h-20 bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{ left: r.x - 40, top: r.y - 40 }}
        />
      ))}
      {children}
      {icon}
    </button>
  );
});

RippleButton.displayName = 'RippleButton';

export { RippleButton };