module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "#202020",
        dispatch: "#800080",
        background: "#4c4c4c",
        sidebar: "#252525",
        search: "#454545",
        searchHover: "#403d3d",

        //input styles
        "input-bg": "#181818",
        "input-border": "#080808",
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
        "fade-out": "fade-out 0.2s"
      }
    },
  },
  plugins: [],
}
