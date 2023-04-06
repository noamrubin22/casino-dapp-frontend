import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import CheckNftOwnership from "./CheckNftOwnership"; // Import the CheckNftOwnership component
import { useAccount } from "wagmi";

interface LandingProps {
  isConnected: boolean;
}

export const Landing: React.FC<LandingProps> = ({ isConnected }) => {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md p-3 py-5">
          <h1 className="text-5xl font-bold welcome-title py-2">
            Welcome to the casino
          </h1>
          <div className="py-2">
            <h3 className="subtitle text-xl">
              Flip a coin, pay and earn in ETH.
            </h3>
            <p className="subtitle">
              Created for encode bootcamp, and can be solely used for
              educational purposes.
            </p>
          </div>
          {!isConnected && (
            <div className="flex justify-center py-2">
              <ConnectButton chainStatus="icon" />
            </div>
          )}
          <div className="py-4">
            <CheckNftOwnership />
          </div>
        </div>
      </div>
    </div>
  );
};
