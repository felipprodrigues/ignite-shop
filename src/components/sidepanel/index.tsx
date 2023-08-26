import {
  Container,
  ProductCheckout,
  ProductDetails,
  ProductImage,
  ProductInfo,
} from "./styles";
import { X } from "phosphor-react";
import Image from "next/image";
import { useContext, useEffect } from "react";
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
  const { productData, removeItemFromCart, cart, handleCartPrices } =
    useContext(CartContext);

  const formattedUnitPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(2700 / 100);

  // console.log(productData);

  function handlePurchase() {
    console.log("ok vc comprou");
  }

  const { isSidepanelOpen, toggleSidepanel } = useContext(CartContext);

  return (
    <Container
      css={{
        transform: isSidepanelOpen ? "translateX(0%)" : "translateX(100%)",
        display: isSidepanelOpen ? "flex" : "none",
      }}
    >
      <div>
        <X size={24} onClick={toggleSidepanel} />
      </div>

      <div>
        <ProductDetails>
          <h2>Sacola de compras</h2>
          {cart.map((product: any) => {
            // console.log(product, "aqui");
            return (
              <>
                <div key={product.id}>
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

                    <span>{product.price}</span>

                    <a onClick={() => removeItemFromCart(product.id)}>
                      Remover
                    </a>
                  </ProductInfo>
                </div>
              </>
            );
          })}
        </ProductDetails>

        <ProductCheckout>
          <div>
            <span>Quantidade</span>
            <span>{cart.length} itens</span>
          </div>
          <div>
            <span>Valor total</span>
            <h2>{productData.totalPrice}</h2>
          </div>

          <a onClick={handlePurchase}>Finalizar compra</a>
        </ProductCheckout>
      </div>
    </Container>
  );
}
