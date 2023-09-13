module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkmode: "class",
  // main color setting 가능
  theme: {
    screens: {},
    extend: {
      colors: {
        primary: {
          YellowGreen: "#608D00",
          Gray: "#8D8D8D",
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
};
