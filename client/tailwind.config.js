/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'custom-shadow-1': '1px 0px 0px 0px rgba(0, 0, 0, 0.1)',
        'custom-shadow-2': '0 1px 0px 0px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

