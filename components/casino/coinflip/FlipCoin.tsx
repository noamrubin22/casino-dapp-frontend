import React, { useState } from "react";

interface FlipCoinProps {
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlipCoin: React.FC<FlipCoinProps> = ({
  isFlipped,
  setIsFlipped,
}) => {
  const flipCoin = async (coinSide: boolean) => {
    setIsFlipped(true);

    const response = await fetch("/api/contracts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const contracts = await response.json();

    if (contracts) {
      const res = await fetch("/api/contracts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contracts }),
      });
      return res;
    }

    // if (res?.status === 200) {
    //   console.log("successful coin-flip");
    // }
  };
  return (
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
  );
};
