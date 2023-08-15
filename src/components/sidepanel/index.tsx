import {
  Container,
  ProductCheckout,
  ProductDetails,
  ProductImage,
  ProductInfo,
} from "./styles";
import { X } from "phosphor-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/pages/_app";

interface ProductProps {
  productData: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}
export default function Sidepanel() {
  const { productData } = useContext(CartContext);

  const formattedUnitPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(2700 / 100);

  console.log(productData);
  function handleRemoveItem() {
    console.log("time to remove some items");
  }

  function handlePurchase() {
    console.log("ok vc comprou");
  }

  return (
    <Container>
      <div>
        <X size={24} />
      </div>

      <div>
        <ProductDetails>
          <h2>Sacola de compras</h2>
          {productData.map((product) => {
            return (
              <>
                <div>
                  <ProductImage>
                    <Image
                      src={product.imageUrl}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </ProductImage>

                  <ProductInfo>
                    <span>{product.name}</span>

                    <span>{formattedUnitPrice}</span>

                    <a onClick={handleRemoveItem}>Remover</a>
                  </ProductInfo>
                </div>
              </>
            );
          })}
        </ProductDetails>

        <ProductCheckout>
          <div>
            <span>Quantidade</span>
            <span>3 itens</span>
          </div>
          <div>
            <span>Valor total</span>
            <h2>{formattedUnitPrice}</h2>
          </div>

          <a onClick={handlePurchase}>Finalizar compra</a>
        </ProductCheckout>
      </div>
    </Container>
  );
}
