/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        bsrf: {
          primary: '#0A0A0A',
          surface: '#111111',
          card: '#181818',
          green: '#00C46A',
          'bd-green': '#006A4E',
          red: '#F42A41',
          muted: '#888888',
          border: '#2A2A2A',
          gold: '#e7c188',
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'scroll-up': 'scroll-up-smooth linear infinite',
        'scroll-down': 'scroll-down-smooth linear infinite',
        'bsrf-hero-spin': 'bsrf-hero-spin 24s linear infinite',
        'bsrf-hero-spin-slow': 'bsrf-hero-spin 40s linear infinite',
        'bsrf-marquee': 'bsrf-marquee 30s linear infinite',
        'bsrf-fade-up': 'bsrf-fade-up 0.8s ease forwards',
      },
      keyframes: {
        'scroll-up-smooth': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'scroll-down-smooth': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'bsrf-hero-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'bsrf-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'bsrf-fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
