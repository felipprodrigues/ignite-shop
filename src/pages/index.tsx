import Image from "next/image";
import { HomeContainer, Product } from "./home";

import { useKeenSlider } from "keen-slider/react";

import camisa1 from "../assets/igniteAboardShirt.png";
import camisa2 from "../assets/igniteExplorerShirt.png";
import camisa3 from "../assets/igniteLabShirt.png";
import camisa4 from "../assets/igniteMarathonShirt.png";

import "keen-slider/keen-slider.min.css";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price.toFixed(2)}</span>
            </footer>
          </Product>
        );
      })}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  console.log(response.data);

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: price.unit_amount / 100,
    };
  });

  return {
    props: {
      products,
    },
  };
};
