import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",

  padding: "2rem",

  "@media(min-width: 1200px)": {
    padding: "0rem",
  },
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "& > div": {
    backgroundColor: "$gray800",
    padding: ".75rem",
    borderRadius: "8px",
    cursor: "pointer",
    filter: "brightness(.9)",

    position: "relative",

    transition: "all .15s linear",

    svg: {
      color: "$$svgColor",
    },

    "&:hover": {
      filter: "brightness(1)",
    },

    "& > div ": {
      position: "absolute",
      top: "-10px",
      right: "-10px",

      padding: ".25rem",
      backgroundColor: "$green300",
      textAlign: "center",
      borderRadius: "50%",
      width: "25px",
      height: "25px",
      color: "$white",
    },
  },
});
