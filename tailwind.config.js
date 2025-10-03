
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ee2b8c",
        "background-light": "#f8f6f7",
        "background-dark": "#221019",
        "content-light": "#221019",
        "content-dark": "#f8f6f7",
        "subtle-light": "#e4dbe0",
        "subtle-dark": "#3c2933"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
