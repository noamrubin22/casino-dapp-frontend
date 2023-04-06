import React from "react";
import CheckNftOwnership from "./CheckNftOwnership"; // Import the CheckNftOwnership component

interface LandingProps {
  setIsReadyToStart: (isReadyToStart: boolean) => void;
}

export const Landing: React.FC<LandingProps> = ({ setIsReadyToStart }) => {
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
          <button
            className="btn btn-primary btn-lg text-2xl"
            onClick={() => setIsReadyToStart(true)}
          >
            get started
          </button>
          <div className="py-4">
            <CheckNftOwnership />
          </div>
        </div>
      </div>
    </div>
  );
};
