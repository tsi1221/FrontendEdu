import { memo, useState } from 'react';
import logo from '../../assets/logo.png';

const sizeClasses = {
  xs: 'h-5 w-auto',
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto',
  lg: 'h-10 w-auto',
  xl: 'h-14 w-auto',
  '2xl': 'h-20 w-auto',
};

const Logo = memo(({ 
  className = '', 
  size = 'md', 
  customSize = '' // optional override like "h-24"
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className={`font-bold text-[#193CB8] text-lg ${className}`}>
        EduTwin
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt="EduTwin"
      loading="eager"
      onError={() => setError(true)}
      className={`
        ${customSize || sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
    />
  );
});

Logo.displayName = 'Logo';

export { Logo };