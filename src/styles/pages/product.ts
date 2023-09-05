import { styled } from "..";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "stretch",
  gap: "4rem",
  justifyItems: "center",

  "@media(min-width: 1200px)": {
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "unset",
  },

  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: "calc(656 - .5rem)",

  padding: ".25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
    width: "280px",
    height: "240px",

    "@media(min-width: 1024px)": {
      width: "520px",
      height: "480px",
    },
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$xl",
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
    fontSize: "$sm",
    lineHeight: "1.6",
    color: "$gray300",
  },

  button: {
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    transition: "all .07s linear",

    marginTop: "1.5rem",

    "@media(min-width: 1024px)": {
      marginTop: "auto",
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});
