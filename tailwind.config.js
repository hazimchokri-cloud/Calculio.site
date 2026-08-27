/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F8FAFC',
          alt: '#F1F5F9',
        },
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
          secondary: '#3B82F6',
        },
        border: {
          DEFAULT: '#E2E8F0',
          hover: '#CBD5E1',
          footer: '#1E293B',
        },
        text: {
          main: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          placeholder: '#94A3B8',
        },
        success: '#10B981',
        warning: '#F59E0B',
        purple: '#8B5CF6',
        red: '#EF4444',
        cyan: '#06B6D4',
        orange: '#F97316',
        footer: '#0F172A',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card-sm': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px rgba(15, 23, 42, 0.08)',
        'nav': '0 4px 20px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
}
