import { styled } from "@stitches/react";

export const Container = styled("div", {
  display: " flex",
  width: " 100%",
  maxWidth: " 1180px",
  margin: " 0px auto",
  justifyContent: " end",
  paddingBottom: "2rem",

  div: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",

    svg: {
      color: "$gray300",
    },

    select: {
      padding: ".5rem",
      border: "1px solid $gray300",
      borderRadius: "6px",
      background: "$gray900",
      color: "$gray300",
    },
  },
});
