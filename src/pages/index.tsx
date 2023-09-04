import { useContext, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// Lib
import { stripe } from "../lib/stripe";
import Stripe from "stripe";

// Component
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { CartContext } from "./_app";
import CartButton from "@/components/cartButton";
import DropdownFilter from "@/components/dropdownFilter";

// Interfaces
import { HomeProps } from "@/interfaces";

// Helpers
import toNumber from "@/helpers/transformToNumber";
import { Capitalize } from "@/helpers/capitalize";

// Styles
import {
  HomeContainer,
  HomeWrapper,
  MainHolder,
  Product,
} from "../styles/pages/home";

export default function Home({ products }: HomeProps) {
  const { setProductData } = useContext(CartContext);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  useEffect(() => {
    setProductData(products);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, setProductData]);

  const productTags = products.map((product) => product.nameId);
  const flattenedAndUniqueArray = [...new Set(productTags.flat())];

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <DropdownFilter
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />

      <MainHolder>
        {flattenedAndUniqueArray.map((nameId) => {
          const groupedProducts = products.filter((product) =>
            product.nameId.includes(nameId)
          );

          if (selectedFilter === "all" || nameId === selectedFilter) {
            return (
              <div key={nameId}>
                <HomeWrapper id="">
                  <h2>{Capitalize(nameId)}</h2>
                  <HomeContainer ref={sliderRef} className="keen-slider">
                    {groupedProducts.map((product) => (
                      <Product className="keen-slider__slide" key={product.id}>
                        <Link href={`/product/${product.id}`} prefetch={false}>
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
                            id={undefined}
                          />
                        </footer>
                      </Product>
                    ))}
                  </HomeContainer>
                </HomeWrapper>
              </div>
            );
          }
        })}
      </MainHolder>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const priceId = product.default_price as Stripe.Price;

    const nameId = product.features.map((item: any) => item?.name);

    return {
      id: product.id,
      name: product.name,
      nameId,
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
