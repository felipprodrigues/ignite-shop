import { GetServerSideProps } from "next";
import { Container } from "./styles";
import { X } from "phosphor-react";

export default function Sidepanel() {
  const formattedUnitPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(2700 / 100);

  return (
    <Container>
      <div>
        <X size={24} />
      </div>

      <div>
        <h2>Sacola de compras</h2>
      </div>

      <div>
        <div>
          <span>Quantidade</span>
          <span>3 itens</span>
        </div>
        <div>
          <span>Valor total</span>
          <h2>{formattedUnitPrice}</h2>
        </div>
      </div>

      <button>Finalizar compra</button>
    </Container>
  );
}
