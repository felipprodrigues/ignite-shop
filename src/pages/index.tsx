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

// Interfaces
import { HomeProps } from "@/interfaces";

// Helpers
import toNumber from "@/helpers/transformToNumber";

// Styles
import {
  HomeContainer,
  HomeWrapper,
  MainHolder,
  Product,
} from "../styles/pages/home";
import DropdownFilter from "@/components/dropdownFilter";

export default function Home({ products }: HomeProps) {
  const { setProductData } = useContext(CartContext);

  const [shirts, setShirts] = useState([]);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  useEffect(() => {
    setProductData(products);

    console.log(shirts, "auqi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, setProductData]);

  const productTags = products.map((product) => product.nameId);
  const flattenedAndUniqueArray = [...new Set(productTags.flat())];

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <DropdownFilter />

      <MainHolder>
        {flattenedAndUniqueArray.map((nameId) => {
          // Filter products that match the current nameId
          const filteredProducts = products.filter(
            (product) => product.nameId === nameId
          );
          console.log(`Filtered products for ${nameId}: `, filteredProducts);

          return (
            <div key={nameId}>
              <HomeWrapper id="">
                <h2>{nameId}</h2>
                <HomeContainer ref={sliderRef} className="keen-slider">
                  {products.map((product) => {
                    return (
                      <>
                        <Product
                          className="keen-slider__slide"
                          key={product.id}
                        >
                          <Link
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
                              id={undefined}
                            />
                          </footer>
                        </Product>
                      </>
                    );
                  })}
                </HomeContainer>
              </HomeWrapper>
            </div>
          );
        })}
      </MainHolder>
      {/* <MainHolder>
        <HomeWrapper id="">
          {nameRow.includes("shirt") && (
            <>
              <h2>Shirts</h2>
              <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map((product) => {
                  return (
                    <>
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
                    </>
                  );
                })}
              </HomeContainer>
            </>
          )}
        </HomeWrapper>
      </MainHolder> */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const priceId = product.default_price as Stripe.Price;

    const nameId = product?.features.map((item: string) => item?.name);

    // features: [ { name: 'hoodie' } ],
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
