import { styled } from "@stitches/react";

export const Container = styled("div", {
  backgroundColor: "$$bgColor",
  padding: ".75rem",
  borderRadius: "8px",
  cursor: "pointer",
  filter: "brightness(.9)",

  transition: "all .15s linear",

  svg: {
    color: "$$svgColor",
  },

  "&:hover": {
    filter: "brightness(1)",
  },
});
