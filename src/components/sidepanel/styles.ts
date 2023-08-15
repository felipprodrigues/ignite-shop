import { styled } from "@stitches/react";

export const Container = styled("aside", {
  maxWidth: "30%",
  width: "100%",
  padding: "2rem",
  height: "100vh",

  background: "$gray800",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  position: "absolute",
  right: 0,
  zIndex: 1,

  transform: "translateX(0%)",

  "& > div:first-of-type": {
    display: "flex",
    justifyContent: "flex-end",

    cursor: "pointer",

    svg: {
      color: "$gray300",
    },
  },

  "& > div:first-of-type:hover": {
    svg: {
      transform: "scale(1.2)",
    },
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    transition: "all .07s linear",
    width: "100%",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "flex",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: "1.6",
    color: "$gray300",
  },
});
