import { Handbag } from "phosphor-react";
import { Container } from "./styles";

interface CartButtonProps {
  color: string;
  svgColor: string;
}

export default function CartButton({ color, svgColor }: CartButtonProps) {
  const handleSidepanel = () => {
    console.log("it works");
  };

  return (
    <Container
      css={{ $$bgColor: color, $$svgColor: svgColor }}
      onClick={() => handleSidepanel()}
    >
      <Handbag size={24} />
    </Container>
  );
}
