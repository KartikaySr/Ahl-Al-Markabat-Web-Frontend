import React from 'react';
import { useApp } from '../../context/AppContext';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'light' | 'dark' | 'full' | 'badge';
  mode?: 'main' | 'night' | 'auto';
  showText?: boolean;
  showBadge?: boolean;
  subtitle?: string;
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  mode = 'auto',
  showText = true,
  showBadge = false,
  subtitle,
  className = '',
  imgClassName = '',
  onClick,
}) => {
  const { language } = useApp();

  const isNight = mode === 'night' || (mode === 'auto' && variant === 'dark');
  const isLight = variant === 'light';
  const isFull = variant === 'full';

  // Sizing definitions for icon badge
  const iconSizes: Record<string, string> = {
    xs: 'w-7 h-7 rounded-lg',
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl',
    '2xl': 'w-28 h-28 rounded-3xl',
  };

  // Full image sizing (when variant='full')
  const fullSizes: Record<string, string> = {
    xs: 'h-8',
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-28',
    '2xl': 'h-40',
  };

  const titleSizes: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm font-bold',
    md: 'text-lg font-black',
    lg: 'text-2xl font-black',
    xl: 'text-3xl font-black',
    '2xl': 'text-4xl font-black',
  };

  const subSizes: Record<string, string> = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
    '2xl': 'text-lg',
  };

  const logoSrc = isNight ? '/logo-night.png' : '/logo-main.png';

  if (isFull) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center select-none transition-transform duration-200 hover:scale-105 cursor-pointer ${className}`}
      >
        <img
          src={logoSrc}
          alt="Ahl Al Markabat | أهل المركبات"
          className={`object-contain rounded-2xl shadow-md ${fullSizes[size] || fullSizes.md} ${imgClassName}`}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none transition-transform duration-200 group ${className}`}
    >
      {/* Official Brand Logo Icon Badge */}
      <div
        className={`relative shrink-0 overflow-hidden shadow-lg border ${
          isNight
            ? 'border-amber-400/30 group-hover:border-amber-400/60'
            : 'border-slate-200 bg-white group-hover:border-blue-400/50'
        } group-hover:scale-105 transition-all duration-300 ${iconSizes[size] || iconSizes.md} ${imgClassName}`}
      >
        <img
          src={logoSrc}
          alt="Ahl Al Markabat | أهل المركبات"
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-2">
            <span
              className={`tracking-tight transition-colors ${titleSizes[size] || titleSizes.md} ${
                isLight ? 'text-slate-950 font-black' : 'text-white'
              }`}
            >
              {language === 'ar' ? 'أهل المركبات' : 'Ahl Al Markabat'}
            </span>
          </div>
          <span
            className={`font-medium tracking-wide leading-tight ${subSizes[size] || subSizes.md} ${
              isLight ? 'text-slate-500' : 'text-slate-300'
            }`}
          >
            {subtitle || (language === 'ar' ? 'خدمات وصيانة المركبات' : 'Automotive Services Platform')}
          </span>
        </div>
      )}
    </div>
  );
};
