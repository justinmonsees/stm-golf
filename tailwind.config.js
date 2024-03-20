/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--raleway)", "Arial", "sans-serif"],
      lobster: ["var(--lobster)", "Arial"],
      noto: ["var(--notoSerif)", "serif"],
    },
    extend: {
      colors: {
        "stm-red": {
          DEFAULT: "#560505",
        },
        stmred: {
          DEFAULT: "#560505",
        },
      },
    },

    plugins: [],
  },
});
