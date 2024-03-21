/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f8fafc",
        secondary: "#white"
        // primary: "#1e293b",
        // secondary: "#313d52"
      },
      colors: {
        primary: "black",
        secondary: "#313d52",
        lightgray: "#111827",
        gradientblue: "linear-gradient(to right,  #06b6d4, #3b82f6)",

      },
      backgroundImage: {
        primarygradient: "linear-gradient(to right,  #06b6d4, #3b82f6)"
      }
    },
  },
  plugins: [],
}

