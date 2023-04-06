import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { BuyTokens } from "./BuyTokens";
import { useAccount } from "wagmi";
import CoinContainer from "./CoinContainer";
import { Stake } from "./Stake";

export const FlipCoin = () => {
  const walletAddress = useAccount().address;
  const [casinoContract, setCasinoContract] = useState<
    ethers.Contract | undefined
  >(undefined);
  const [tokenContract, setTokenContract] = useState<
    ethers.Contract | undefined
  >(undefined);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    setCasinoContract(getContract("casino"));
    setTokenContract(getContract("token"));
  }, []);

  const flipCoin = async (headsOrTail: boolean) => {
    console.log();
    // allow transaction & set spending cap
    console.log(walletAddress);
    console.log(tokenContract);
    setIsFlipped(true);
    tokenContract && tokenContract.approve(walletAddress, 1);
    casinoContract && casinoContract.flipCoin(headsOrTail);
  };

  return (
    <div className="hero min-h-full bg-base-100 flex flex-col">
      <div className="flex flex-col items-center">
        <p className="subtitle text-xl text-center">
          it is time to flip the coin, what do you choose?
        </p>
        <div className="flex flex-row justify-center items-center p-2">
          <button
            className="btn btn-outline btn-lg text-4xl glass mx-4 my-2"
            onClick={() => flipCoin(false)}
          >
            Heads
          </button>
          <p className="subtitle">or</p>
          <button
            className="btn btn-outline btn-lg text-4xl glass mx-4"
            onClick={() => flipCoin(true)}
          >
            Tails
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <BuyTokens
          casinoContract={casinoContract}
          tokenContract={tokenContract}
        />
        <div className="coin-container flex self-center ">
          <CoinContainer isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
        </div>
        <div className="">
          <Stake />
        </div>
      </div>
    </div>
  );
};
