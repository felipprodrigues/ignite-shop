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

export const CartContext = createContext({} as CartProps);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const [productData, setProductData] = useState<HomeProps[]>([]);
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const [cart, setCart] = useState<HomeProps[]>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState("");

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const [retrieveStripeProduct, setRetrieveStripeProduct] = useState([]);

  useEffect(() => {
    handleCartTotal();
  }, [cart, handleCartTotal]);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceId: retrieveStripeProduct.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      console.log(err, "error");

      alert("Falha ao redirecionar ao checkout!");
    }
  }

  function toggleSidepanel() {
    setIsSidepanelOpen(() => !isSidepanelOpen);
  }

  function handleAddItemToCart(product: HomeProps) {
    console.log(product, "ta aqui");

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
      return acc + curr.priceNumber;
    }, 0);

    const formattedUnitPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cartTotal / 100);

    setCartTotalPrice(formattedUnitPrice);
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
          <Image src={logoImg} alt="" />

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
