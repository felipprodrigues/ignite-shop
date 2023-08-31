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
import toNumber from "@/helpers/transformToNumber";

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

                    <span>{toNumber(product.price)}</span>

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
            <span>{cart.length} items</span>
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
