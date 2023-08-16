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
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { HomeProps } from ".";
import { Handbag } from "phosphor-react";

interface CartProps {
  setProductData: Dispatch<SetStateAction<{}>>;
  productData: object[];
  isSidepanelOpen: boolean;
  toggleSidepanel: () => void;
  handleAddItemToCart: (product: HomeProps) => void;
  removeItemFromCart: (id: string) => void;
}

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
    }
  }

  function removeItemFromCart(id: any) {
    const updateCart = cart.filter((item) => item.id !== id);

    setCart(updateCart);
  }

  useEffect(() => {
    console.log(cart, "aqui");
  }, [cart]);

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
      }}
    >
      <ToastContainer />
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
