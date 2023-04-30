import type { NextPage } from "next";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { Login } from "../components/casino/Login";
import { Footer } from "../components/layout/Footer";
import { Casino } from "../components/casino/Casino";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { address } = useAccount();

  useEffect(() => {
    setIsConnected(Boolean(address));
  }, [address]);

  return (
    <div className="bg-base-100">
      <Head>
        <title>lucky seven</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@200&family=Nabla&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header isConnected={isConnected} />

      <div className="min-h-screen">
        {isConnected ? <Casino /> : <Login isConnected={isConnected} />}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
