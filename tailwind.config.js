/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./theme/**/*.liquid", 
    "./theme/**/*.js",
    "./theme/assets/*.liquid",
    "./theme/snippets/*.liquid",
    "./theme/sections/*.liquid",
    "./theme/layout/*.liquid"
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
}

