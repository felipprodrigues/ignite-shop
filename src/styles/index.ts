import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: "#fff",

      gray900: "#121214",
      gray800: "#202024",
      gray500: "#8d8d94",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875f",
      green300: "#00b37e",
    },
    fontSizes: {
      sm: "clamp(0.875rem, 3vw, 1.125rem)",
      md: "clamp(1.125rem, 3vw, 1.25rem)",
      lg: "clamp(1.25rem, 3vw, 1.5rem)",
      xl: "clamp(1.5rem, 3vw, 2rem)",
      "2xl": "2rem",
    },
  },
});
