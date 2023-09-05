import { SuccessProps } from "@/interfaces";
import { stripe } from "@/lib/stripe";
import { SuccessContainer, ImageContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Successful Purchase | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Success!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} alt={""} width={120} height={110} />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, your{" "}
          <strong>
            {product.name.length > 1
              ? `${product.name.length} items`
              : product.name}
          </strong>{" "}
          {product.name.length > 1 ? "are" : "is"} on the way.
        </p>

        <Link href="/">Back to catalog</Link>
      </SuccessContainer>
    </>
  );
}

// getServerSideProps
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const listItems = session?.line_items?.data.map(
    (product) => product?.description
  );

  const customerName = session.customer_details?.name;

  const product = session?.line_items?.data[0]?.price
    ?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: listItems,
        imageUrl: product.images[0],
      },
    },
  };
};
