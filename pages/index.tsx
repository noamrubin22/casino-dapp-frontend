import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Header } from "../components/Header";
import { Landing } from "../components/Landing";
import { Footer } from "../components/Footer";
import { FlipCoin } from "../components/FlipCoin";

const Home: NextPage = () => {
  const [isReadyToStart, setIsReadyToStart] = useState<boolean>(false);

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
      <Header setIsReadyToStart={setIsReadyToStart} />
      <div className="min-h-screen">
        {isReadyToStart ? (
          <FlipCoin />
        ) : (
          <Landing setIsReadyToStart={setIsReadyToStart} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
