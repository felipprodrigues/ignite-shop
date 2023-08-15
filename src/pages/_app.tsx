import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

import CartButton from "@/components/cartButton";
import Sidepanel from "@/components/sidepanel";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface CartProps {
  setProductData: React.Dispatch<React.SetStateAction<string>>;
  productData: object[];
}

export const CartContext = createContext({} as CartProps);

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const [productData, setProductData] = useState([]);

  return (
    <CartContext.Provider
      value={{
        setProductData,
        productData,
      }}
    >
      <Sidepanel />
      <Container>
        <Header>
          <Image src={logoImg} alt="" />

          <CartButton color="#202024" svgColor="#e1e1e6" />
        </Header>

        <Component {...pageProps} setProductData={setProductData} />
      </Container>
    </CartContext.Provider>
  );
}
