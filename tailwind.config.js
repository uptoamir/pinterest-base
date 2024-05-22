/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/core/**/*.{js,ts,jsx,tsx}",
  ],
  // safelist:
  //   process.env.NODE_ENV === "development"
  //     ? [{ pattern: /./ }]
  //     : [{ pattern: /./ }],
  theme: {
    screens: {
      default: "0px",
      xxs: "318px",
      xs: "430px",
      sm: "600px",
      fablet: "672px",
      md: "768px",
      "mid-lg": "865px",
      lg: "982px",
      tb: "1056px",
      xl: "1200px",
    },
    colors: {
      primary: "#006666",
      white: "#ffffff",
    },
    extend: {
      spacing: {
        px: "1px",
        0: "0px",
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
        "8px": "8px",
        "9px": "9px",
        "11px": "11px",
        "18px": "18px",
        "19px": "19px",
        "20px": "20px",
        "25px": "25px",
        zeroPlus: "0.1rem",
        0.5: "0.125rem",
        0.8: "0.20rem",
        1: "0.25rem",
        1.25: "0.3rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.25: "0.8rem",
        3.5: "0.875rem",
        4: "1rem",
        4.75: "1.2rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        11.5: "2.8rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        16: "4rem",
        17.5: "4.4rem",
        18: "4.5rem",
        20: "5rem",
        22: "5.5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        53: "13.25rem",
        56: "14rem",
        58: "14.5rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        76: "19rem",
        80: "20rem",
        85: "22rem",
        92: "23rem",
        96: "24rem",
        100: "25rem",
        104: "26rem",
        106: "26.5rem",
        112: "28rem",
        120: "30rem",
        144: "36rem",
        200: "50rem",
        300: "75rem",
        "268px": "268px",
        "353px": "353px",
        "1/2": "50%",
        "1/4": "25%",
        "3/4": "75%",
        "1/3": "33%",
        "2/3": "66%",
      },
      fontFamily: {
        body: ["Kalameh", "sans-serif"],
      },
      fontWeight: {
        "extra-light": 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        "extra-bold": 800,
        black: 900,
      },
      fontSize: {
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
        42: "42px",
      },
      letterSpacing: {
        tight: "-0.075rem",
        tighter: "-0.05rem",
        zero: "0px",
        wide: "0.025rem",
        wider: "0.05rem",
        widest: "0.1rem",
      },
      borderRadius: {
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
        40: "40px",
        94: "94px",
        quarter: "25%",
        half: "50%",
        full: "100%",
      },

      margin: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
      }),
      borderWidth: {
        0: "0",
        0.5: "0.5px",
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        primary: "#006666",
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
        weather: "#dbf7f7",
      }),
      boxShadow: {
        primary: "0px 10px 34px rgba(0, 0, 0, 0.05)",
        small: "0px 0px 20px rgba(0, 0, 0, 0.09)",
        button: "0px 12px 34px rgba(0, 142, 255, 0.15)",
        bottom: "0 8px 6px -6px rgba(0, 0, 0, 0.7)",
        picturePrimary: "0 35px 60px -15px rgba(0,0,0,0.3)",
        up: "0px -5px 34px rgba(0, 0, 0, 0.05)",
      },
      gridTemplateColumns: {
        3: "repeat(3, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        footer: "200px minmax(900px, 1fr) 100px",
      },
      width: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      minWidth: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      height: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      minHeight: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      maxHeight: (theme) => ({
        ...theme("spacing"),
        "5px": "5px",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      aspectRatio: {
        "17/20": "17 / 20",
      },
      backdropBlur: {
        xs: "2px",
      },
      lineHeight: {
        13.5: "54.4px",
      },
      zIndex: {
        1200: "1200",
        1600: "1600",
      },
    },
  },

  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwind-scrollbar-hide"),
  ],
};
