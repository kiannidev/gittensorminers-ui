/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gt: {
          bg: '#0b0f14',
          surface: '#121820',
          border: '#1e2a38',
          accent: '#3b82f6',
          accent2: '#06b6d4',
          muted: '#94a3b8',
          text: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
