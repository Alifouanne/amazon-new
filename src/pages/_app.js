import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Header } from "../components";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const client = React.useRef(new QueryClient());
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <link rel="shortcut icon" href="/favicon1.png" />
          </Head>
          <Header />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
//aa