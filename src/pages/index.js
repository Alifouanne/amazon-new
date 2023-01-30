import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import { QueryClient, dehydrate, useQuery } from "react-query";

import { Banner, Header, ProductFeed } from "../components";
import { authOptions } from "../pages/api/auth/[...nextauth]";
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
      <Header />
      <main className="max-w-screen-xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={data} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const client = new QueryClient();
  await client.prefetchQuery("products", fetchProducts);

  return {
    props: { dehydratedState: dehydrate(client), session },
  };
}
