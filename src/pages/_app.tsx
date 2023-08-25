import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CartButton from "@/components/cartButton";
import Sidepanel from "@/components/sidepanel";
import {
  Component,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { Handbag } from "phosphor-react";
import { CartProps, HomeProps } from "@/interfaces";
import { ProductDetails } from "@/components/sidepanel/styles";

export const CartContext = createContext({} as CartProps);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const [productData, setProductData] = useState<HomeProps[]>([]);
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const [cart, setCart] = useState<HomeProps[]>([]);

  function toggleSidepanel() {
    setIsSidepanelOpen(() => !isSidepanelOpen);
  }

  function handleAddItemToCart(product: HomeProps) {
    const isInCart = cart.find((item) => item.id === product.id);

    if (isInCart) {
      toast.warning("Item already added to cart");
    } else {
      setCart((prev) => [...prev, product]);
      toast.success("Item added to cart!");
    }
  }

  function handleCartTotal(product: any) {
    console.log(product, "aqui o producto ");

    const fetchPrice = productData.map((product) => product.price);
    // console.log(fetchPrice, "aqui");
  }

  console.log(handleCartTotal());

  function removeItemFromCart(id: any) {
    const updateCart = cart.filter((item) => item.id !== id);

    setCart(updateCart);
  }

  // useEffect(() => {
  //   console.log(cart, "aqui");
  // }, [cart]);

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
