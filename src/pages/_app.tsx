import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

import CartButton from "@/components/cartButton";
import Sidepanel from "@/components/sidepanel";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Sidepanel />
      <Container>
        <Header>
          <Image src={logoImg} alt="" />

          <CartButton color="#202024" svgColor="#e1e1e6" />
        </Header>

        <Component {...pageProps} />
      </Container>
    </>
  );
}
