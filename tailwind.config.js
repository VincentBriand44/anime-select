/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#FFEAC5',
        secondary: '#FFDBB5',
        third: '#6C4E31',
        fourth: '#603F26',
      },
      textColor: {
        primary: '#6C4E31',
        secondary: '#603F26',
        third: '#FFEAC5',
        fourth: '#FFDBB5',
      },
    },
  },
  plugins: [],
};
