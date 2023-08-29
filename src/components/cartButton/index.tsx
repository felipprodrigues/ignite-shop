import { Handbag } from "phosphor-react";
import { Container } from "./styles";
import { useContext } from "react";
import { CartContext } from "@/pages/_app";

import { CartButtonProps } from "@/interfaces";

export default function CartButton({
  color,
  svgColor,
  product,
}: CartButtonProps) {
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
