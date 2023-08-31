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
import toNumber from "@/helpers/transformToNumber";

export default function Home({ products }: HomeProps) {
  const { setProductData, productData } = useContext(CartContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  setProductData(products);

  // console.log(products, "aqui");
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
        {products.map((product) => {
          return (
            <>
              <Product className="keen-slider__slide" key={product.id}>
                <Link
                  // key={product.id}
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
                    <span>{toNumber(product.price)}</span>
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

  console.log(response, "resposta da request");

  const products = response.data.map((product) => {
    const priceId = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      priceId: priceId.id,
      price: priceId.unit_amount,
    };
  });

  return {
    props: { products },
  };
};
