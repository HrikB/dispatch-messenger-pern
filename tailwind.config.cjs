module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "#202020",
        dispatch: "#800080",
        background: "#000",

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
        register: "0px 0px 5px 5px #454545"
      }
    },
  },
  plugins: [],
}