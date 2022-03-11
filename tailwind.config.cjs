module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "#202020",
        tertiary: "#171717",
        dispatch: "#800080",
        background: "#4c4c4c",
        sidebar: "#252525",
        search: "#454545",
        searchHover: "#403d3d",
        modalBack: "rgba(128, 128, 128, 0.5)",

        "prof-info-background": "rgb(48, 48, 48)",
        "prof-info-heading": "rgb(187, 187, 187)",
        "prof-lower-background": "rgb(2, 2, 2)",
        "button-hover": "rgb(85, 0, 85)",
        "edit-prof-background": "rgba(0, 0, 0, 0.9)",
        "edit-attr-background": "#2b2b2b",
        editPicture: "rgba(47, 79, 79, 0.9)",

        //input styles
        "input-bg": "#181818",
        "input-border": "#080808",
        save: "purple",
        error: "rgb(220 38 38)",
        disabled: "#525252",
        "edit-picture-background": "#403d3d",
        focus: "#006eff"
      },
      fontSize: {
        h1: "32px"
      },
      fontFamily: {
        heading: "font-family: Arial, Helvetica, sans-serif",
      },
      height: {
        app: "90vh",
      },
      width: {
        app: "90vw",
      },
      spacing: {
        108: "27rem"
      },
      boxShadow: {
        register: "0px 0px 5px 5px #454545",
        app: "0px 0px 40px 6px #000"
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
        "fade-out": {
          "0%": {
            opacity: 1
          },
          "100%": {
            opacity: 0
          }
        }
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-in",
        "fade-out": "fade-out 0.2s ease-out"
      }
    },
  },
  plugins: [],
}
