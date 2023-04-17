import type { NextPage } from "next";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Landing } from "../components/Landing";
import { Footer } from "../components/Footer";
import { FlipCoin } from "../components/FlipCoin";
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
        {isConnected ? <FlipCoin /> : <Landing isConnected={isConnected} />}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
