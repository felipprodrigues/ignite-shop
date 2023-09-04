/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { createContext, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// Components
import Sidepanel from "../components/sidepanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";

// Interfaces
import { CartProps, HomeProps, ProductProps } from "../interfaces";

// Helpers
import toNumber from "../helpers/transformToNumber";

// Images
import logoImg from "../assets/logo.svg";
import { Handbag } from "phosphor-react";

export const CartContext = createContext({} as CartProps);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const [productData, setProductData] = useState<HomeProps[]>([]);
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const [cart, setCart] = useState<ProductProps[]>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState("");

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  useEffect(() => {
    handleCartTotal();
  }, [cart, handleCartTotal]);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const lineItems = cart.map((item) => ({
        priceId: item.priceId,
        quantity: 1,
      }));

      const productsPriceId = cart.map((product) => product.priceId);

      const response = await axios.post("/api/checkout", {
        priceId: productsPriceId, // Send default product's priceId
        line_items: lineItems, // Send line_items array for the rest of the cart
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      toast.error("Fail to redirect to checkout!");
    }
  }

  function handleAddItemToCart(product: ProductProps) {
    const isInCart = cart.find((item) => item.id === product.id);

    if (isInCart) {
      toast.warning("Item already added to cart");
    } else {
      setCart((prev) => [...prev, product]);
      toast.success("Item added to cart!");

      handleCartTotal();
    }
  }

  function handleCartTotal() {
    const cartTotal = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    const formattedPrice = toNumber(cartTotal);

    setCartTotalPrice(formattedPrice);
  }

  function removeItemFromCart(id: any) {
    const updateCart = cart.filter((item) => item.id !== id);

    setCart(updateCart);
  }

  function toggleSidepanel() {
    setIsSidepanelOpen(() => !isSidepanelOpen);
  }

  return (
    <CartContext.Provider
      value={{
        setProductData,
        productData,
        isSidepanelOpen,
        toggleSidepanel,
        handleAddItemToCart,
        cart,
        removeItemFromCart,
        handleCartTotal,
        cartTotalPrice,
        isCreatingCheckoutSession,
        handleBuyProduct,
      }}
    >
      <ToastContainer autoClose={2000} />
      <Sidepanel />
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>

          <div onClick={() => toggleSidepanel()}>
            {cart.length ? <div>{cart.length}</div> : null}
            <Handbag size={24} />
          </div>
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartContext.Provider>
  );
}
