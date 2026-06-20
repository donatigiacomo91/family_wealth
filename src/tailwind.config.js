/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F7F6F3',
          100: '#EEECE5',
          200: '#DEDACE',
          300: '#C2BCAA',
          400: '#9C9480',
          500: '#736B58',
          600: '#544D3E',
          700: '#3D372C',
          800: '#28241D',
          900: '#181511',
          950: '#0E0C09',
        },
        sage: {
          50: '#EEF3EA',
          100: '#D8E5CE',
          200: '#B3CC9F',
          300: '#8AB16D',
          400: '#699449',
          500: '#4F7733',
          600: '#3D5E26',
          700: '#2F491D',
        },
        terracotta: {
          50: '#FBEEE7',
          100: '#F4D3C0',
          200: '#E7AA8A',
          300: '#D67E54',
          400: '#C25E33',
          500: '#A4471F',
          600: '#7E3617',
          700: '#5D2811',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px 0 rgba(24, 21, 17, 0.04), 0 1px 1px 0 rgba(24, 21, 17, 0.03)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
};
