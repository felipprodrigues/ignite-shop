import { useRouter } from "next/router";

export default function Product() {
  const { query }: any = useRouter();

  return <h1>Product: {JSON.stringify(query)}</h1>;
}
