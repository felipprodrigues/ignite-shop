import React from "react";
import Image from "next/image";
import { useContext } from "react";

import {
  Container,
  ProductCheckout,
  ProductDetails,
  ProductImage,
  ProductInfo,
} from "./styles";

import { X } from "phosphor-react";

import { CartContext } from "../../pages/_app";

import toNumber from "../../helpers/transformToNumber";

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
          <h2>Shopping Cart</h2>
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

                    <a onClick={() => removeItemFromCart(product.id)}>Remove</a>
                  </ProductInfo>
                </div>
              </>
            );
          })}
        </ProductDetails>

        <ProductCheckout>
          <div>
            <span>Quantity</span>
            <span>{cart.length} items</span>
          </div>
          <div>
            <span>Total amount</span>
            <h2>{cartTotalPrice}</h2>
          </div>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Buy
          </button>
        </ProductCheckout>
      </div>
    </Container>
  );
}
