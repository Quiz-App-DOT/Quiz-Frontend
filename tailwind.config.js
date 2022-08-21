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
      pulse: {
        "0%": {
          opacity: 1
        },
        "50%": {
          opacity: 0.5
        },
        "100%": {
          opacity: 1
        }
      }
    },
    animation: {
      rotate: "rotate 5s linear infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    },
    extend: {},
  },
  plugins: [],
}
