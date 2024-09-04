/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('assets/images/hero-bg-square.jpg')",
        bean80: "url('assets/images/coffee-bean-80.svg')",
        bean100: "url('assets/images/coffee-bean-100.svg')",
        bean150: "url('assets/images/coffee-bean-150.svg')",
        bean200: "url('assets/images/coffee-bean-200.svg')",
      },
    },
    fontFamily: {
      primary: ['Hind'],
      secondary: ['Josefin Sans'],
    },
    fontSize: {
      xl: '1.25rem',
      '4xl': '2.5rem',
    },
    colors: {
      'primary/100': '#7D8D71',
      'secondary/100': '#2B2B2B',
      'gray/100': '#6B6A6A',
      'gray/30': '#A6A5A5',
      'gray/10': '#F2F2F2',
      'focused/100': '#C9D1B5',
      'default/100': '#ACB29D',
      'disabled/100': '#B4B6AE',
      'background/100': '#DDD8CB',
      black: '#000000',
    },
  },
  plugins: [],
};
