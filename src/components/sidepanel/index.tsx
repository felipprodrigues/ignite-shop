import {
  Container,
  ProductCheckout,
  ProductDetails,
  ProductImage,
  ProductInfo,
} from "./styles";
import { X } from "phosphor-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/pages/_app";
import axios from "axios";
import toNumber from "@/helpers/transformToNumber";

interface ProductProps {
  productData: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}
export default function Sidepanel() {
  const {
    removeItemFromCart,
    cart,
    handleBuyProduct,
    isCreatingCheckoutSession,
    isSidepanelOpen,
    toggleSidepanel,
    cartTotalPrice,
  } = useContext(CartContext);

  // const formattedUnitPrice = new Intl.NumberFormat("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  // }).format(2700 / 100);

  // console.log(productData);

  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true);

  //     const response = await axios.post("/api/checkout", {
  //       priceId: product.defaultPriceId,
  //     });

  //     const { checkoutUrl } = response.data;

  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //     setIsCreatingCheckoutSession(false);

  //     alert("Falha ao redirecionar ao checkout!");
  //   }
  // }

  // function handlePurchase() {
  //   console.log("ok vc comprou");
  // }

  // const { isSidepanelOpen, toggleSidepanel, cartTotalPrice } =
  //   useContext(CartContext);

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

                    <span>
                      {product.price || toNumber(product.priceNumber)}
                    </span>

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
            <h2>{cartTotalPrice}</h2>
          </div>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Finalizar compra
          </button>
        </ProductCheckout>
      </div>
    </Container>
  );
}
