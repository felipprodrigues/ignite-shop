/* eslint-disable react-hooks/exhaustive-deps */
import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidepanel from "@/components/sidepanel";
import { createContext, useEffect, useState } from "react";

import { Handbag } from "phosphor-react";
import { CartProps, HomeProps } from "@/interfaces";
import axios from "axios";
import Link from "next/link";
import toNumber from "@/helpers/transformToNumber";

export const CartContext = createContext({} as CartProps);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const [productData, setProductData] = useState([]);
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const [cart, setCart] = useState<HomeProps[]>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const [retrieveStripeProduct, setRetrieveStripeProduct] = useState([]);

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
      console.log(err.response, "error");

      toast.error("Falha ao redirecionar ao checkout!");
    }
  }

  console.log(cart, "qui o cart");
  function toggleSidepanel() {
    setIsSidepanelOpen(() => !isSidepanelOpen);
  }

  function handleAddItemToCart(product: HomeProps) {
    const isInCart = cart.find((item) => item.id === product.id);

    console.log(product, "aqui o item");

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
        setRetrieveStripeProduct,
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
