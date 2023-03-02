import { createTheme, globalFontFace, globalStyle, style } from "@vanilla-extract/css";

const [themeClass, vars] = createTheme({
  colors: {
    white: "#FFF",
    primary: "#A0AAFF",
    secondary: "#E1E0EC",
    background: "#FFF",
    backgroundSecondary: "#F9F9FF",
  },
  fontColors: {
    dark: "#38383D",
    light: "#FFF",
    hint: "#C5C5C5",
  },
  fontSize: {
    label: "14px",
    caption: "18px",
  },
  borderRadius: {
    medium: "16px",
  },
  margins: {
    small: "8px",
    medium: "12px",
    high: "24px",
  },
  transition: ".15s ease-in-out",
  fontFamily: "'Source Code Pro', sans-serif",
  contentWidth: "1000px",
  shadow: "0px 0px 16px #E1E0EC",
});

globalFontFace("Source Code Pro", {
  src: 'url("./font/SourceCodePro-Regular.ttf")',
});

globalStyle("body", {
  margin: "0",
  minHeight: "100vh",
  background: "#FCFCFF",
  fontSize: "14px",
  fontFamily: "'Source Code Pro', sans-serif",
});

const baseClass = style([
  themeClass,
  {
    color: vars.fontColors.dark,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
]);

const contentContainer = style({
  maxWidth: vars.contentWidth,
  width: `calc(100% - ${vars.margins.medium} * 2)`,
  margin: "0 auto",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: vars.margins.high,
  padding: `${vars.margins.high} ${vars.margins.medium}`,
  "@media": {
    "(max-width: 660px)": {
      gap: vars.margins.medium,
    },
  },
});

export { baseClass, contentContainer, vars };
