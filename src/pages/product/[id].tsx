import { useContext } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

// Lib
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

// Styles
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";

// Components
import { CartContext } from "../_app";

// Helpers
import toNumber from "@/helpers/transformToNumber";

// Interfaces
import { ProductProps } from "@/interfaces";

export default function Product({ product }: ProductProps) {
  const { handleAddItemToCart, isCreatingCheckoutSession } =
    useContext(CartContext);

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{toNumber(product.price)}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={() => handleAddItemToCart(product)}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // find best sellers / most viewed ones
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  if (!productId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
