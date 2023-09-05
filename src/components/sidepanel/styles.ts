import { styled } from "@stitches/react";

export const Container = styled("aside", {
  width: "100%",
  padding: "2rem",
  height: "100vh",
  gap: "1rem",

  maxWidth: "70%",

  "@media(min-width: 1024px)": {
    maxWidth: "50%",
  },

  "@media(min-width: 1200px)": {
    maxWidth: "30%",
  },

  background: "$gray800",

  flexDirection: "column",

  position: "fixed",
  right: 0,
  zIndex: 1,

  transition: "all .15s linear",

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

  "& > div:last-of-type": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  div: {
    display: "flex",
    gap: "1rem",
  },

  h2: {
    fontSize: "$lg",
  },
});

export const ProductImage = styled("div", {
  background: "linear-gradient(180deg, #1ea4b3 0%, #7465d4 100%)",
  borderRadius: 8,
});

export const ProductInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  span: {
    fontSize: "$md",
  },

  "span:first-of-type": {
    color: "$gray300",
  },

  "span:last-of-type": {
    color: "$white",
    fontWeight: "bold",
  },

  a: {
    color: "$green500",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all .25s linear",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ProductCheckout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  div: {
    display: "flex",
    justifyContent: "space-between",

    span: {
      fontSize: "$sm",
    },

    "span:not(:last-of-type)": {
      color: "$gray300",
    },
  },

  "div:last-of-type": {
    "span, h2": {
      fontWeight: "bold",
      color: "$white",
    },

    h2: {
      fontSize: "$lg",
    },
  },

  "& > button": {
    marginTop: "1.5rem",
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
    textAlign: "center",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});
