/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#93C5FD',
          glow: '#61a0ff',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#047857',
          light: '#6EE7B7',
          glow: '#34d399',
        },
        dark: {
          DEFAULT: '#1F2937',
          light: '#374151',
          darker: '#111827',
        },
        futuristic: {
          blue: '#0ea5e9',
          purple: '#8b5cf6',
          pink: '#ec4899',
          cyan: '#06b6d4',
          teal: '#14b8a6',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
          '100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-futuristic': 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #3B82F6, 0 0 15px #3B82F6',
        'neon-green': '0 0 5px #10B981, 0 0 15px #10B981',
        'neon-purple': '0 0 5px #8B5CF6, 0 0 15px #8B5CF6',
      },
    },
  },
  plugins: [],
}
