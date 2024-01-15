const plugin = require("tailwindcss/plugin");
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-20": {
      transform: "rotateY(20deg)",
    },
    ".rotate-y-40": {
      transform: "rotateY(40deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-80": {
      transform: "rotateY(80deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".rotate-y-360": {
      transform: "rotateY(360deg)",
    },
  });
});

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkmode: "class",
  // main color setting 가능
  theme: {
    screens: {},
    extend: {
      boxShadow: {
        Ver1: "10px 10px 20px -10px #525252",
        Ver2: "0px 0px 5px 2px rgba(141, 141, 141, 0.1)",
      },
      colors: {
        primary: {
          YellowGreen: "#608D00",
          Gray: "#8D8D8D",
          DarkGray: "#6F6F6F",
          Yellow: "rgba(257, 203, 83)",
        },
        secondary: {},
      },
      spacing: {
        mobileWidth: "375px",
      },
    },
    fontFamily: {
      NotoSansCJK: ["NotoSansCJK KR"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
    },
  },
  plugins: [rotateY],
};
