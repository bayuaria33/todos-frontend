/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineThrough: {
        textDecoration: 'line-through',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
 },
};
