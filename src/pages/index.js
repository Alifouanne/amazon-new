import Head from "next/head";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { Banner, ProductFeed } from "../components";

const fetchProducts = async () =>
  await (await fetch("https://fakestoreapi.com/products")).json();

export default function Home() {
  const { data, isError, error } = useQuery("products", fetchProducts);

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="bg-deafult ">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Header */}
      {/* I used next js layot in _app.js for header component */}
      <main className="max-w-screen-xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={data} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = new QueryClient();
  await client.prefetchQuery("products", fetchProducts);

  return {
    props: { dehydratedState: dehydrate(client) },
  };
}
