/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
	fontFamily: {
      primary: ['OpenSans', 'sans-serif'],
      secondary: ['Lato', 'sans-serif']
    },
    keyframes: {
      rotate: {
        "0%": {
          transform: "scale(1) rotate(360deg)",
        },
        "50%": {
          transform: "scale(0.8) rotate(-360deg)",
        },
        "100%": {
          transform: "scale(1) rotate(360deg)",
        },
      },
    },
    animation: {
      rotate: "rotate 5s linear infinite",
    },
    extend: {},
  },
  plugins: [],
}
