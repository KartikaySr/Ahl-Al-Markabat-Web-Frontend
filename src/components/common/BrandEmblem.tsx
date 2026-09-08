import React from 'react';

interface BrandEmblemProps {
  brandId: string;
  className?: string;
  size?: number;
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({ brandId, className = 'w-7 h-7', size = 28 }) => {
  switch (brandId.toLowerCase()) {
    case 'toyota':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="currentColor">
          <ellipse cx="50" cy="50" rx="46" ry="34" fill="none" stroke="#D32F2F" strokeWidth="6" />
          <ellipse cx="50" cy="46" rx="19" ry="24" fill="none" stroke="#D32F2F" strokeWidth="6" />
          <ellipse cx="50" cy="38" rx="34" ry="12" fill="none" stroke="#D32F2F" strokeWidth="5.5" />
        </svg>
      );

    case 'mercedes':
    case 'mercedes-benz':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <circle cx="50" cy="50" r="45" fill="#1E293B" stroke="#CBD5E1" strokeWidth="5" />
          <polygon points="50,14 44,52 50,48" fill="#F8FAFC" />
          <polygon points="50,14 56,52 50,48" fill="#94A3B8" />
          <polygon points="18,72 49,46 50,52" fill="#F8FAFC" />
          <polygon points="18,72 52,58 50,52" fill="#94A3B8" />
          <polygon points="82,72 50,52 48,58" fill="#F8FAFC" />
          <polygon points="82,72 51,46 50,52" fill="#94A3B8" />
        </svg>
      );

    case 'bmw':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#CBD5E1" strokeWidth="5" />
          <circle cx="50" cy="50" r="32" fill="#0F172A" stroke="#F8FAFC" strokeWidth="3" />
          {/* Top-Right: Blue */}
          <path d="M50,50 L50,18 A32,32 0 0,1 82,50 Z" fill="#0066B1" />
          {/* Bottom-Left: Blue */}
          <path d="M50,50 L50,82 A32,32 0 0,1 18,50 Z" fill="#0066B1" />
          {/* Top-Left: White */}
          <path d="M50,50 L18,50 A32,32 0 0,1 50,18 Z" fill="#FFFFFF" />
          {/* Bottom-Right: White */}
          <path d="M50,50 L82,50 A32,32 0 0,1 50,82 Z" fill="#FFFFFF" />
        </svg>
      );

    case 'audi':
      return (
        <svg viewBox="0 0 120 60" className={className} width={size * 1.5} height={size * 0.75}>
          <circle cx="24" cy="30" r="18" fill="none" stroke="#64748B" strokeWidth="4.5" />
          <circle cx="48" cy="30" r="18" fill="none" stroke="#64748B" strokeWidth="4.5" />
          <circle cx="72" cy="30" r="18" fill="none" stroke="#64748B" strokeWidth="4.5" />
          <circle cx="96" cy="30" r="18" fill="none" stroke="#64748B" strokeWidth="4.5" />
        </svg>
      );

    case 'volkswagen':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <circle cx="50" cy="50" r="46" fill="#001E50" stroke="#CBD5E1" strokeWidth="5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" strokeWidth="3.5" />
          {/* V Shape */}
          <path d="M32,26 L44,60 L50,44 L56,60 L68,26" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* W Shape */}
          <path d="M28,42 L42,76 L50,60 L58,76 L72,42" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'hyundai':
      return (
        <svg viewBox="0 0 100 70" className={className} width={size * 1.3} height={size * 0.9}>
          <ellipse cx="50" cy="35" rx="46" ry="30" fill="none" stroke="#002C6C" strokeWidth="5.5" />
          <path d="M30,54 C34,32 38,18 42,16 M60,16 C64,36 68,50 72,54 M35,36 C48,34 56,34 67,36" fill="none" stroke="#002C6C" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case 'kia':
      return (
        <svg viewBox="0 0 110 55" className={className} width={size * 1.4} height={size * 0.7}>
          <rect width="110" height="55" rx="14" fill="#05141F" />
          <text x="55" y="38" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="28" letterSpacing="2">
            KIA
          </text>
        </svg>
      );

    case 'tesla':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <path d="M15,22 C34,16 66,16 85,22 L82,28 C66,23 34,23 18,28 Z" fill="#E82127" />
          <path d="M50,32 C42,32 34,36 26,42 L31,48 C37,44 43,41 50,41 C57,41 63,44 69,48 L74,42 C66,36 58,32 50,32 Z" fill="#E82127" />
          <path d="M47,44 L47,85 C49,88 51,88 53,85 L53,44 Z" fill="#E82127" />
        </svg>
      );

    case 'nissan':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="#C3002F" strokeWidth="6" />
          <rect x="12" y="40" width="76" height="20" rx="3" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
          <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1.5">
            NISSAN
          </text>
        </svg>
      );

    case 'ford':
      return (
        <svg viewBox="0 0 120 70" className={className} width={size * 1.4} height={size * 0.8}>
          <ellipse cx="60" cy="35" rx="55" ry="30" fill="#003478" stroke="#FFFFFF" strokeWidth="3" />
          <text x="60" y="44" textAnchor="middle" fill="#FFFFFF" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold" fontSize="26">
            Ford
          </text>
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <rect x="10" y="10" width="80" height="80" rx="16" fill="none" stroke="#CC0000" strokeWidth="6" />
          <path d="M26,24 L36,76 L44,76 L44,52 L56,52 L56,76 L64,76 L74,24 L64,24 L58,46 L42,46 L36,24 Z" fill="#CC0000" />
        </svg>
      );

    case 'porsche':
      return (
        <svg viewBox="0 0 90 100" className={className} width={size * 0.9} height={size}>
          <path d="M45,8 L78,20 C78,65 55,88 45,95 C35,88 12,65 12,20 Z" fill="#B91C1C" stroke="#F59E0B" strokeWidth="4" />
          <path d="M45,18 L70,26 C70,55 52,75 45,82 C38,75 20,55 20,26 Z" fill="#1E293B" />
          <text x="45" y="42" textAnchor="middle" fill="#F59E0B" fontWeight="900" fontSize="9" letterSpacing="1">
            PORSCHE
          </text>
          <polygon points="45,52 48,58 54,58 49,62 51,68 45,64 39,68 41,62 36,58 42,58" fill="#F59E0B" />
        </svg>
      );

    case 'landrover':
    case 'land-rover':
      return (
        <svg viewBox="0 0 120 65" className={className} width={size * 1.4} height={size * 0.75}>
          <ellipse cx="60" cy="32" rx="56" ry="28" fill="#005A2B" stroke="#D1D5DB" strokeWidth="3" />
          <text x="60" y="28" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="10" letterSpacing="1.5">
            LAND
          </text>
          <text x="60" y="44" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="10" letterSpacing="1.5">
            ROVER
          </text>
        </svg>
      );

    case 'lexus':
      return (
        <svg viewBox="0 0 100 80" className={className} width={size * 1.2} height={size * 0.9}>
          <ellipse cx="50" cy="40" rx="46" ry="34" fill="none" stroke="#475569" strokeWidth="5.5" />
          <path d="M30,22 L30,56 L72,56 C62,44 48,34 38,24 Z" fill="none" stroke="#475569" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );

    case 'peugeot':
      return (
        <svg viewBox="0 0 90 100" className={className} width={size * 0.9} height={size}>
          <path d="M45,6 L80,18 C80,68 55,90 45,96 C35,90 10,68 10,18 Z" fill="#0B132B" stroke="#0055FF" strokeWidth="4" />
          <path d="M45,26 C52,26 58,32 56,40 C54,48 48,52 52,60 C54,64 58,68 62,70 L56,76 C46,74 42,66 40,58 C38,50 42,44 40,36 C38,30 40,26 45,26 Z" fill="#0055FF" />
        </svg>
      );

    case 'skoda':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <circle cx="50" cy="50" r="44" fill="#0E3A2F" stroke="#22C55E" strokeWidth="4" />
          <path d="M32,60 C42,40 60,34 72,30 C64,44 54,58 38,66 Z" fill="#22C55E" />
          <circle cx="42" cy="44" r="5" fill="#FFFFFF" />
        </svg>
      );

    case 'byd':
      return (
        <svg viewBox="0 0 110 60" className={className} width={size * 1.3} height={size * 0.7}>
          <rect width="110" height="60" rx="14" fill="#E11D48" />
          <text x="55" y="40" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="24" letterSpacing="3">
            BYD
          </text>
        </svg>
      );

    case 'jeep':
      return (
        <svg viewBox="0 0 110 50" className={className} width={size * 1.4} height={size * 0.65}>
          <rect width="110" height="50" rx="12" fill="#374151" stroke="#FBBF24" strokeWidth="2.5" />
          <text x="55" y="34" textAnchor="middle" fill="#FBBF24" fontFamily="Impact, Arial Black, sans-serif" fontWeight="bold" fontSize="24" letterSpacing="3">
            Jeep
          </text>
        </svg>
      );

    case 'chevrolet':
      return (
        <svg viewBox="0 0 110 60" className={className} width={size * 1.3} height={size * 0.7}>
          <path d="M42,12 L68,12 L68,26 L102,26 L96,44 L68,44 L68,56 L42,56 L42,44 L8,44 L14,26 L42,26 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
        </svg>
      );

    case 'mazda':
      return (
        <svg viewBox="0 0 100 80" className={className} width={size * 1.2} height={size * 0.9}>
          <ellipse cx="50" cy="40" rx="46" ry="34" fill="none" stroke="#0284C7" strokeWidth="5" />
          <path d="M22,34 C36,46 44,52 50,52 C56,52 64,46 78,34 C64,42 56,44 50,38 C44,44 36,42 22,34 Z" fill="#0284C7" />
        </svg>
      );

    case 'mg':
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size}>
          <polygon points="50,6 88,22 88,78 50,94 12,78 12,22" fill="#DC2626" stroke="#FFFFFF" strokeWidth="4" />
          <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="32">
            MG
          </text>
        </svg>
      );

    case 'renault':
      return (
        <svg viewBox="0 0 80 100" className={className} width={size * 0.8} height={size}>
          <polygon points="40,8 74,48 40,88 6,48" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinejoin="round" />
          <polygon points="40,24 60,48 40,72 20,48" fill="none" stroke="#F59E0B" strokeWidth="5" strokeLinejoin="round" />
        </svg>
      );

    case 'mitsubishi':
      return (
        <svg viewBox="0 0 100 90" className={className} width={size * 1.1} height={size}>
          {/* Top Diamond */}
          <polygon points="50,8 65,34 50,60 35,34" fill="#DC2626" />
          {/* Bottom Left Diamond */}
          <polygon points="35,34 50,60 20,60 5,34" fill="#DC2626" />
          {/* Bottom Right Diamond */}
          <polygon points="65,34 95,34 80,60 50,60" fill="#DC2626" />
        </svg>
      );

    case 'seat':
    case 'cupra':
      return (
        <svg viewBox="0 0 90 90" className={className} width={size} height={size}>
          <rect width="90" height="90" rx="18" fill="#1C1917" />
          <path d="M22,26 L68,26 L68,40 L40,40 L40,50 L68,50 L68,64 L22,64 L22,50 L50,50 L50,40 L22,40 Z" fill="#D97706" />
        </svg>
      );

    default:
      return (
        <div className={`rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs shadow-xs ${className}`}>
          🚗
        </div>
      );
  }
};
