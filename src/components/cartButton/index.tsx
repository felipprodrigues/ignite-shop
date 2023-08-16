import { Handbag } from "phosphor-react";
import { Container } from "./styles";
import { useContext } from "react";
import { CartContext } from "@/pages/_app";
import { HomeProps } from "@/pages";

interface CartButtonProps {
  color: string;
  svgColor: string;
  product?: HomeProps | undefined;
}

export default function CartButton({
  color,
  svgColor,
  product,
}: CartButtonProps) {
  const { handleAddItemToCart } = useContext(CartContext);

  return (
    <Container
      css={{ $$bgColor: color, $$svgColor: svgColor }}
      onClick={() => handleAddItemToCart(product)}
    >
      <Handbag size={24} />
    </Container>
  );
}
