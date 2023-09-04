import React from "react";
import { useContext } from "react";

import { CartContext } from "../../pages/_app";

import { CartButtonProps } from "../../interfaces";

import { Handbag } from "phosphor-react";
import { Container } from "./styles";

export default function CartButton({ color, svgColor, product }: any) {
  const { handleAddItemToCart } = useContext(CartContext);

  return (
    <Container
      css={{ $$bgColor: color, $$svgColor: svgColor }}
      onClick={() => {
        handleAddItemToCart(product);
      }}
    >
      <Handbag size={24} />
    </Container>
  );
}
