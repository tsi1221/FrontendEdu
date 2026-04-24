import { memo } from 'react';
import logo from '../../assets/logo.png';

const sizeClasses = {
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto',
  lg: 'h-10 w-auto',
};

const Logo = memo(({ className = '', size = 'md' }) => (
  <img
    src={logo}
    alt="EduTwin"
    className={`${sizeClasses[size]} ${className}`}
    loading="eager"
    onError={(e) => {
      e.currentTarget.style.display = 'none';
      const span = document.createElement('span');
      span.className = 'font-bold text-xl text-[#193CB8]';
      span.textContent = 'EduTwin';
      e.currentTarget.parentElement?.appendChild(span);
    }}
  />
));

Logo.displayName = 'Logo';

export { Logo };