/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#050D1C',
          navy: '#0B1B3D',
          navyLight: '#142959',
          navyMuted: '#1E3A78',
          gold: '#FDB813',
          goldHover: '#E5A400',
          goldLight: '#FFF4D6',
          goldMuted: '#8C6800',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'brand-gold': '0 8px 30px -4px rgba(253, 184, 19, 0.45)',
        'brand-glow': '0 0 50px -10px rgba(253, 184, 19, 0.3)',
        'brand-navy-glow': '0 0 60px -15px rgba(20, 41, 89, 0.6)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'radar': 'radar 2s linear infinite',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.25s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'radar': {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'slideUp': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, #142959 0%, #0B1B3D 50%, #050D1C 100%)',
        'gold-metallic': 'linear-gradient(135deg, #FFF0B3 0%, #FDB813 50%, #B88100 100%)',
        'mesh-pattern': 'radial-gradient(rgba(253, 184, 19, 0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
