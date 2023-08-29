import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { stripe } from "../lib/stripe";
import Stripe from "stripe";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { useContext } from "react";
import { CartContext } from "./_app";

import { HomeContainer, Product } from "../styles/pages/home";
import CartButton from "@/components/cartButton";
import { HomeProps } from "@/interfaces";

export default function Home({ products }: HomeProps) {
  const { setProductData } = useContext(CartContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  setProductData(products);

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <>
              <Product className="keen-slider__slide">
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  prefetch={false}
                >
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                  />
                </Link>

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <CartButton
                    color="#00b37e"
                    svgColor="#fff"
                    product={product}
                  />
                </footer>
              </Product>
            </>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    const unitAmount = price.unit_amount ?? 0;
    const formattedUnitPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(unitAmount / 100);

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: formattedUnitPrice,
      priceNumber: unitAmount,
      defaultPriceId: price.id,
      description: product.description,
    };
  });

  return {
    props: {
      products,
    },
  };
};
