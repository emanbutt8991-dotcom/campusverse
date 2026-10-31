/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--uni-${name}-rgb) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        uni: {
          primary: v('primary'),
          secondary: v('secondary'),
          accent: v('accent'),
          bg: v('background'),
          surface: v('surface'),
          text: v('text'),
          muted: v('muted'),
          border: v('border'),
          onprimary: v('on-primary'),
          highlight: v('highlight'),
          onhighlight: v('on-highlight'),
          ink: v('ink'),
          soft: v('soft'),
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
        lift: '0 2px 4px rgb(15 23 42 / 0.05), 0 16px 32px -8px rgb(15 23 42 / 0.16)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'none' } },
        pop: { '0%': { opacity: 0, transform: 'scale(.96)' }, '100%': { opacity: 1, transform: 'none' } },
        sweep: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        fadeUp: 'fadeUp .35s ease-out both',
        pop: 'pop .2s ease-out both',
        sweep: 'sweep .9s ease-in-out',
      },
    },
  },
  plugins: [],
};
