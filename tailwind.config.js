const { primary, secondary, third, fourth } = {
  primary: '#F0E9D2',
  secondary: '#ECE1C1',
  third: '#678983',
  fourth: '#181D31',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        primary,
        secondary,
        third,
        fourth,
      },
      textColor: {
        primary: third,
        secondary: fourth,
        third: primary,
        fourth: secondary,
      },
      borderColor: {
        primary,
        secondary,
        third,
        fourth,
      },
    },
  },
  plugins: [],
};
