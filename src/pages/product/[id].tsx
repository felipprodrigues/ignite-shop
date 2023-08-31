import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

import { useContext } from "react";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { CartContext } from "../_app";

import toNumber from "@/helpers/transformToNumber";

interface ProductProps {
  product: {
    priceNumber: number;
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    priceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  const { handleAddItemToCart, setRetrieveStripeProduct } =
    useContext(CartContext);

  setRetrieveStripeProduct(product);

  if (isFallback) {
    return <p>Loading...</p>;
  }

  console.log(product.priceId);

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
            // disabled={isCreatingCheckoutSession}
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
  // buscar os produtos mais vendidos / mais acessados
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  // console.log(params, "aqui os params");

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

  // const unitAmount = price.unit_amount ?? 0;
  console.log(price.id, "aqui o price");

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
